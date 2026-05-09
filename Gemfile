source "https://rubygems.org"

# GitHub Pages — pin to the gem so local builds match what GitHub Pages renders.
# See https://pages.github.com/versions/ for the current list of supported plugins.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
end

# Windows + JRuby need this for time-zone data.
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "wdm", "~> 0.1.1", platforms: [:mingw, :mswin, :x64_mingw]

# faster file watching on Windows
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]
