#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const fm = require('front-matter');

// ──────────────────────────────────────────────
// Configuration
// ──────────────────────────────────────────────
const ROOT = __dirname;
const ARTICLES_DIR = path.join(ROOT, 'articles');
const POSTS_DIR = path.join(ROOT, 'posts');
const TEMPLATES_DIR = path.join(ROOT, 'templates');
const MANIFEST_PATH = path.join(ARTICLES_DIR, 'articles.json');

const SITE_URL = 'https://nadiiamelnyk-bc.github.io';
const GITHUB_REPO = 'https://github.com/NadiiaMelnyk-BC/NadiiaMelnyk-BC.github.io';

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function getCodeFiles(slug) {
  const codeDir = path.join(ARTICLES_DIR, slug, 'code');
  if (!fs.existsSync(codeDir)) return [];
  return fs
    .readdirSync(codeDir)
    .filter((f) => f !== 'README.md' && !f.startsWith('.'))
    .sort();
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function replaceSection(content, startMarker, endMarker, replacement) {
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) return content;
  return (
    content.substring(0, startIdx + startMarker.length) +
    '\n' +
    replacement +
    '\n' +
    content.substring(endIdx)
  );
}

// ──────────────────────────────────────────────
// Configure marked
// ──────────────────────────────────────────────
marked.setOptions({
  gfm: true,
  breaks: false,
});

// Custom renderer for image paths (rewrite relative to posts/)
const renderer = new marked.Renderer();
const originalImage = renderer.image.bind(renderer);
let currentSlug = '';

renderer.image = function ({ href, title, text }) {
  // Rewrite relative image paths from article source to post output
  if (href && href.startsWith('./images/')) {
    href = href.replace('./images/', currentSlug + '/images/');
  }
  const titleAttr = title ? ` title="${title}"` : '';
  const alt = text || '';
  return `<img src="${href}" alt="${alt}"${titleAttr} loading="lazy">`;
};

renderer.code = function ({ text, lang }) {
  const langClass = lang ? ` class="language-${lang}"` : '';
  const dataLang = lang ? ` data-lang="${lang}"` : '';
  return `<pre${dataLang}><code${langClass}>${escapeHtml(text)}</code></pre>`;
};

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

marked.use({ renderer });

// ──────────────────────────────────────────────
// Main Build
// ──────────────────────────────────────────────
function build() {
  console.log('🔨 Starting build...\n');

  // Read manifest
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ articles/articles.json not found');
    process.exit(1);
  }

  const manifest = JSON.parse(readFile(MANIFEST_PATH));
  const articles = manifest.articles || [];

  console.log(`📄 Found ${articles.length} article(s) in manifest\n`);

  // Sort articles by date (newest first)
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Load templates
  const postTemplate = readFile(path.join(TEMPLATES_DIR, 'post-template.html'));
  const cardTemplate = readFile(path.join(TEMPLATES_DIR, 'article-card.html'));
  const featuredCardTemplate = readFile(
    path.join(TEMPLATES_DIR, 'index-featured-card.html')
  );

  // Ensure posts/ directory exists
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  // Collect all tags
  const allTags = new Set();
  const builtArticles = [];

  // ── Build each article ──
  for (const article of articles) {
    const { slug, title, date, tags, excerpt, readTime, featured } = article;
    const mdPath = path.join(ARTICLES_DIR, slug, 'index.md');

    if (!fs.existsSync(mdPath)) {
      console.warn(`⚠️  Skipping "${slug}" — articles/${slug}/index.md not found`);
      continue;
    }

    console.log(`  📝 Building: ${title} (${slug})`);

    // Read and parse markdown
    const mdContent = readFile(mdPath);
    const parsed = fm(mdContent);
    currentSlug = slug;
    const htmlContent = marked.parse(parsed.body);

    // Copy images if they exist
    const imagesDir = path.join(ARTICLES_DIR, slug, 'images');
    if (fs.existsSync(imagesDir)) {
      copyDirSync(imagesDir, path.join(POSTS_DIR, slug, 'images'));
      console.log(`     📷 Copied images for ${slug}`);
    }

    // Collect tags
    (tags || []).forEach((t) => allTags.add(t));

    // Get code files
    const codeFiles = getCodeFiles(slug);

    // Build tag badges HTML
    const tagBadgesHtml = (tags || [])
      .map((t) => `<span class="tag">${t}</span>`)
      .join('\n        ');

    // Build OG tag meta tags
    const ogTagsHtml = (tags || [])
      .map((t) => `<meta property="article:tag" content="${t}">`)
      .join('\n  ');

    // Build code examples section
    let codeExamplesHtml = '';
    if (codeFiles.length > 0) {
      const items = codeFiles
        .map(
          (f) =>
            `      <li class="code-examples__item">
        <span class="code-examples__icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </span>
        <a href="${GITHUB_REPO}/blob/main/articles/${slug}/code/${f}" class="code-examples__link" target="_blank" rel="noopener noreferrer">${f}</a>
      </li>`
        )
        .join('\n');

      codeExamplesHtml = `
    <div class="container container--narrow">
      <div class="code-examples">
        <h2>Code Examples</h2>
        <p style="color: var(--text-muted); font-size: 0.9375rem; margin-bottom: 1rem;">View the working code on GitHub:</p>
        <ul class="code-examples__list">
${items}
        </ul>
      </div>
    </div>`;
    }

    // Build related articles (latest 3 excluding current)
    const related = articles.filter((a) => a.slug !== slug).slice(0, 3);
    let relatedHtml = '';
    if (related.length > 0) {
      const relatedCards = related
        .map(
          (r) =>
            `      <div class="card">
        <article class="article-card">
          <time class="article-card__date" datetime="${r.date}">${formatDate(r.date)}</time>
          <h3 class="article-card__title"><a href="${r.slug}.html">${r.title}</a></h3>
          <p class="article-card__excerpt">${r.excerpt}</p>
          <div class="article-card__footer">
            <a href="${r.slug}.html" class="article-card__read-more">Read more &rarr;</a>
            <span class="article-card__meta">${r.readTime} read</span>
          </div>
        </article>
      </div>`
        )
        .join('\n');

      relatedHtml = `
    <div class="container container--narrow related-articles">
      <h2>Related Articles</h2>
      <div class="related-articles__grid">
${relatedCards}
      </div>
    </div>`;
    }

    // Fill post template
    let postHtml = postTemplate
      .replace(/\{\{title\}\}/g, title)
      .replace(/\{\{date\}\}/g, date)
      .replace(/\{\{slug\}\}/g, slug)
      .replace(/\{\{excerpt\}\}/g, excerpt || '')
      .replace(/\{\{readTime\}\}/g, readTime || '5 min')
      .replace('{{tags}}', tagBadgesHtml)
      .replace('{{ogTags}}', ogTagsHtml)
      .replace('{{content}}', htmlContent)
      .replace('{{codeExamples}}', codeExamplesHtml)
      .replace('{{relatedArticles}}', relatedHtml);

    // Write post HTML
    writeFile(path.join(POSTS_DIR, `${slug}.html`), postHtml);
    console.log(`     ✅ Written: posts/${slug}.html`);

    builtArticles.push({
      ...article,
      codeFiles,
    });
  }

  // ── Update articles.html ──
  console.log('\n📋 Updating articles.html...');
  let articlesPage = readFile(path.join(ROOT, 'articles.html'));

  if (builtArticles.length > 0) {
    // Generate tag filter buttons
    const sortedTags = [...allTags].sort();
    let tagButtonsHtml =
      '      <div class="tag-filter" role="toolbar" aria-label="Filter articles by tag">\n';
    tagButtonsHtml +=
      '        <button class="tag-filter__btn tag-filter__btn--active" data-tag="all">All</button>\n';
    for (const tag of sortedTags) {
      tagButtonsHtml += `        <button class="tag-filter__btn" data-tag="${tag}">${tag}</button>\n`;
    }
    tagButtonsHtml += '      </div>';

    articlesPage = replaceSection(
      articlesPage,
      '<!-- TAGS-START -->',
      '<!-- TAGS-END -->',
      tagButtonsHtml
    );

    // Generate article cards
    let cardsHtml = '      <div class="articles-grid">\n';
    for (const article of builtArticles) {
      let card = cardTemplate
        .replace('{{title}}', article.title)
        .replace(/\{\{slug\}\}/g, article.slug)
        .replace('{{date}}', article.date)
        .replace('{{date_formatted}}', formatDate(article.date))
        .replace('{{excerpt}}', article.excerpt || '')
        .replace('{{readTime}}', article.readTime || '5 min')
        .replace(
          '{{tags_data}}',
          (article.tags || []).join(',')
        )
        .replace(
          '{{tags_badges}}',
          (article.tags || [])
            .map((t) => `<span class="tag">${t}</span>`)
            .join(' ')
        );

      // Code link
      if (article.codeFiles && article.codeFiles.length > 0) {
        card = card.replace(
          '{{code_link}}',
          `<a href="${GITHUB_REPO}/tree/main/articles/${article.slug}/code" class="article-card__code-link" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            View code
          </a>`
        );
      } else {
        card = card.replace('{{code_link}}', '');
      }

      cardsHtml += '        ' + card.trim() + '\n';
    }
    cardsHtml += '      </div>';

    articlesPage = replaceSection(
      articlesPage,
      '<!-- ARTICLES-START -->',
      '<!-- ARTICLES-END -->',
      cardsHtml
    );
  }

  writeFile(path.join(ROOT, 'articles.html'), articlesPage);
  console.log('  ✅ articles.html updated');

  // ── Update index.html (latest 3 articles) ──
  console.log('\n🏠 Updating index.html...');
  let indexPage = readFile(path.join(ROOT, 'index.html'));

  if (builtArticles.length > 0) {
    // Get featured or latest 3
    let featured = builtArticles.filter((a) => a.featured);
    if (featured.length === 0) featured = builtArticles;
    const latest = featured.slice(0, 3);

    let latestHtml = '        <div class="articles-grid">\n';
    for (const article of latest) {
      let card = featuredCardTemplate
        .replace('{{title}}', article.title)
        .replace(/\{\{slug\}\}/g, article.slug)
        .replace('{{date}}', article.date)
        .replace('{{date_formatted}}', formatDate(article.date))
        .replace('{{excerpt}}', article.excerpt || '')
        .replace('{{readTime}}', article.readTime || '5 min')
        .replace(
          '{{tags_badges}}',
          (article.tags || [])
            .map((t) => `<span class="tag">${t}</span>`)
            .join(' ')
        );
      latestHtml += '          ' + card.trim() + '\n';
    }
    latestHtml += '        </div>';

    indexPage = replaceSection(
      indexPage,
      '<!-- LATEST-START -->',
      '<!-- LATEST-END -->',
      latestHtml
    );
  }

  writeFile(path.join(ROOT, 'index.html'), indexPage);
  console.log('  ✅ index.html updated');

  // ── Update README.md ──
  console.log('\n📖 Updating README.md...');
  let readme = readFile(path.join(ROOT, 'README.md'));

  // Latest articles table
  if (builtArticles.length > 0) {
    let articleTable =
      '| Article | Date | Tags |\n|---------|------|------|\n';
    for (const a of builtArticles.slice(0, 10)) {
      const tags = (a.tags || []).map((t) => `\`${t}\``).join(', ');
      articleTable += `| [${a.title}](${SITE_URL}/posts/${a.slug}.html) | ${a.date} | ${tags} |\n`;
    }
    readme = replaceSection(
      readme,
      '<!-- LATEST-ARTICLES-START -->',
      '<!-- LATEST-ARTICLES-END -->',
      articleTable
    );
  } else {
    readme = replaceSection(
      readme,
      '<!-- LATEST-ARTICLES-START -->',
      '<!-- LATEST-ARTICLES-END -->',
      '*No articles published yet. Stay tuned!*\n'
    );
  }

  // Code examples table
  if (builtArticles.some((a) => a.codeFiles && a.codeFiles.length > 0)) {
    let codeTable =
      '| Article | Code Examples |\n|---------|---------------|\n';
    for (const a of builtArticles) {
      if (a.codeFiles && a.codeFiles.length > 0) {
        codeTable += `| [${a.title}](articles/${a.slug}/code/) | ${a.codeFiles.join(', ')} |\n`;
      }
    }
    readme = replaceSection(
      readme,
      '<!-- CODE-EXAMPLES-START -->',
      '<!-- CODE-EXAMPLES-END -->',
      codeTable
    );
  } else {
    readme = replaceSection(
      readme,
      '<!-- CODE-EXAMPLES-START -->',
      '<!-- CODE-EXAMPLES-END -->',
      '*Code examples will appear here as articles are published.*\n'
    );
  }

  writeFile(path.join(ROOT, 'README.md'), readme);
  console.log('  ✅ README.md updated');

  // ── Summary ──
  console.log('\n────────────────────────────────────');
  console.log(`✅ Build complete!`);
  console.log(`   Articles built: ${builtArticles.length}`);
  console.log(`   Tags found: ${allTags.size}`);
  console.log('────────────────────────────────────\n');
}

// ──────────────────────────────────────────────
// Run
// ──────────────────────────────────────────────
try {
  build();
} catch (err) {
  console.error('\n❌ Build failed:', err.message);
  console.error(err.stack);
  process.exit(1);
}
