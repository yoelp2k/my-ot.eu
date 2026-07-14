const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const english = JSON.parse(fs.readFileSync(path.join(root, 'en.json'), 'utf8'));
const hebrew = JSON.parse(fs.readFileSync(path.join(root, 'he.json'), 'utf8'));
const englishPage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const hebrewPage = fs.readFileSync(path.join(root, 'he', 'index.html'), 'utf8');
const stylesheet = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const workflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'pages.yml'), 'utf8');

function idsIn(html) {
  return [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
}

function assertUniqueIds(html) {
  const ids = idsIn(html);
  assert.equal(new Set(ids).size, ids.length);
}

function assertCoreTranslationIsRendered(html, translation) {
  for (const key of ['title', 'heading', 'subheading', 'description', 'contact', 'email']) {
    assert.ok(html.includes(translation[key]), `Missing translated ${key}`);
  }
}

test('both languages are complete static pages', () => {
  assert.match(englishPage, /<html lang="en" dir="ltr">/);
  assert.match(hebrewPage, /<html lang="he" dir="rtl">/);
  assertCoreTranslationIsRendered(englishPage, english);
  assertCoreTranslationIsRendered(hebrewPage, hebrew);
});

test('language navigation uses stable locale URLs and marks the current page', () => {
  assert.match(englishPage, /<a href="he\/" lang="he" hreflang="he">עברית<\/a>/);
  assert.match(hebrewPage, /<a href="\.\.\/" lang="en" hreflang="en">EN<\/a>/);
  assert.equal((englishPage.match(/aria-current="page"/g) || []).length, 1);
  assert.equal((hebrewPage.match(/aria-current="page"/g) || []).length, 1);
});

test('pages have valid structural invariants', () => {
  for (const html of [englishPage, hebrewPage]) {
    assertUniqueIds(html);
    assert.equal((html.match(/<img\b/g) || []).length, 1);
    assert.match(html, /maly-portrait\.webp/);
    assert.doesNotMatch(html, /<script\b/i);
    assert.doesNotMatch(html, /<script[^>]+src="https?:/i);
    assert.doesNotMatch(html, /<link[^>]+rel="stylesheet"[^>]+href="https?:/i);
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hreflang="en"/);
    assert.match(html, /hreflang="he"/);
  }

  assert.equal(fs.existsSync(path.join(root, 'maly-portrait.jpg')), false);
  assert.equal(fs.existsSync(path.join(root, 'maly-portrait.webp')), true);
});

test('the design includes responsive and reduced-motion styles', () => {
  assert.match(stylesheet, /@media \(max-width: 760px\)/);
  assert.match(stylesheet, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(stylesheet, /:focus-visible/);
});

test('deployment targets GitHub Pages and runs tests first', () => {
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /needs: test/);
  assert.doesNotMatch(workflow, /azure/i);
  assert.equal(fs.existsSync(path.join(root, '.github', 'workflows', 'increment-version.yml')), false);
  assert.equal(fs.existsSync(path.join(root, '.github', 'workflows', 'azure-static-web-apps-calm-glacier-064dd4503.yml')), false);
});
