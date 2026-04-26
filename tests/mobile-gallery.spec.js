import { test, expect } from '@playwright/test';

test.describe('gallery.html mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gallery.html');
    await page.waitForTimeout(800);
  });

  test('viewport meta tag exists', async ({ page }) => {
    const viewport = await page.$('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    const content = await viewport.getAttribute('content');
    expect(content).toContain('width=device-width');
  });

  test('page loads without JS errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto('/gallery.html');
    await page.waitForTimeout(1000);
    expect(errors).toHaveLength(0);
  });

  test('gallery cards are visible', async ({ page }) => {
    const cards = await page.$$('.photo-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  test('gallery card does not overflow viewport', async ({ page }) => {
    const card = await page.$('.photo-card');
    if (card) {
      const box = await card.boundingBox();
      if (box) {
        expect(box.width).toBeLessThanOrEqual(380);
      }
    }
  });

  test('lightbox opens on card click', async ({ page }) => {
    const card = await page.$('.photo-card');
    if (card) {
      await card.click();
      await page.waitForTimeout(500);
      const lightbox = await page.$('#lightbox');
      expect(lightbox).not.toBeNull();
      const visible = await lightbox.isVisible();
      expect(visible).toBe(true);
    }
  });

  test('lightbox contains an image', async ({ page }) => {
    const card = await page.$('.photo-card');
    if (card) {
      await card.click();
      await page.waitForTimeout(500);
      const img = await page.$('#lb-img');
      expect(img).not.toBeNull();
      const visible = await img.isVisible();
      expect(visible).toBe(true);
    }
  });

  test('lightbox closes on Escape key', async ({ page }) => {
    const card = await page.$('.photo-card');
    if (card) {
      await card.click();
      await page.waitForTimeout(500);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      const lightbox = await page.$('#lightbox');
      if (lightbox) {
        const visible = await lightbox.isVisible();
        expect(visible).toBe(false);
      }
    }
  });

  test('lightbox closes on backdrop click', async ({ page }) => {
    const card = await page.$('.photo-card');
    if (card) {
      await card.click();
      await page.waitForTimeout(500);
      await page.click('#lightbox', { position: { x: 10, y: 10 } });
      await page.waitForTimeout(300);
      const lightbox = await page.$('#lightbox');
      if (lightbox) {
        const visible = await lightbox.isVisible();
        expect(visible).toBe(false);
      }
    }
  });

  test('back link navigates to index', async ({ page }) => {
    const link = await page.$('header a');
    expect(link).not.toBeNull();
    const href = await link.getAttribute('href');
    expect(href).toContain('index.html');
  });
});
