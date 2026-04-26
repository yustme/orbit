import { test, expect } from '@playwright/test';

test.describe('gallery.html mobile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/gallery.html');
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
});
