import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
});

test('landing page loads', async ({ page }) => {
  await page.goto('/');

  // Expect the page to have a heading or main content
  await expect(page.locator('body')).toBeVisible();
});
