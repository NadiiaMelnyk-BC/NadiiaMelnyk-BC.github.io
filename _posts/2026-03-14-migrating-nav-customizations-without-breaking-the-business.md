---
title: "Migrating 14 years of NAV customizations without breaking the business"
date: 2026-03-14 09:00:00 +0000
tags: [migration, field-report, nav, al-dev]
lead: >-
  A field report from a 14-month NAV 2016 → BC SaaS project for a 220-user
  manufacturer in Northern Europe — what we kept, what we cut, and the script
  that ran for 38 hours straight.
featured: true
---

ACME Manufacturing had been on Microsoft Dynamics NAV since 2010. Three full
versions, two partner changes, and roughly 14 years of accumulated
customizations later, they were running a system nobody quite understood. The
CFO wanted Business Central SaaS within twelve months. The IT director thought
eighteen was tight. They were both, in different ways, right.

What follows is a field report — not a generic "how to migrate to BC" article.
The choices we made were specific to ACME, but the shape of the problem is one
I've now seen on a dozen migrations.

## 1. The brief

The CFO wanted out of the on-prem NAV box. Hardware was end-of-life, the
Microsoft Gold Partner who'd installed it had been acquired twice since
go-live, and the IT director had been quietly pricing replacement servers for
two years. Cloud BC was the obvious answer. The harder question was *which*
14 years of customizations came along.

## 2. Auditing 14 years of code

We began by exporting every customized object from the live system and running
them through a static analysis pass. The numbers were sobering: 412 modified
standard objects, 184 custom objects, and 9,200 lines of code whose original
author was no longer reachable.

```al
codeunit 50100 "NAV Customization Migrator"
{
    procedure AuditCustomizations()
    var
        ObjectMetadata: Record "Object Metadata";
    begin
        ObjectMetadata.SetRange(Modified, true);
        if ObjectMetadata.FindSet() then
            repeat
                ClassifyForMigration(ObjectMetadata);
            until ObjectMetadata.Next() = 0;
    end;
}
```

Every modified object was tagged with one of four dispositions: keep as
extension, rewrite as standard, retire entirely, or "ask the business owner."
About 38% of the customizations turned out to be retire-able — features added
years ago for processes nobody runs anymore.

> Every legacy system is a museum of decisions nobody can defend anymore.
> The job is to figure out which exhibits still earn their wall space.

## 3. The migration plan

The plan that survived contact with reality looked nothing like the one we
presented in month one. We sequenced the migration into four waves — finance
first, because the CFO was the sponsor and finance has the cleanest data;
then sales and inventory; then production; then the long tail of integrations
and reporting.

## 4. What broke (and what didn't)

Cutover weekend ran 38 hours. The longest single step was a posting-routine
rebuild that we had — twice — declared "ready" and then found edge cases on.
Nothing the business cared about broke. Several things we'd worried about
(custom warehouse logic, a dimension-rewrite report) worked on the first try.

## 5. Lessons

The system has been live for fourteen months now, with zero unplanned
downtime since cutover weekend. If I had the project over, I'd start the
"ask the business owner" conversations earlier — not because the audit
output was wrong, but because those conversations *themselves* changed the
scope of the migration. People rediscover their own processes when forced
to explain them.

The migration was the easy part. The conversations were the work.
