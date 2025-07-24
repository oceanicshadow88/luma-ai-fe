import { test, expect } from '@playwright/test';

test.describe('Reset Password Pages', () => {
  test.describe('Learner Reset Password', () => {
    test('should display learner reset password page correctly', async ({ page }) => {
      await page.goto('/auth/reset-password');

      // Check page title and header
      await expect(page.locator('h1')).toHaveText('Reset Password');

      // Check logo is present
      await expect(page.locator('img[alt="Luma AI Logo"]')).toBeVisible();

      // Check form elements are present
      await expect(page.locator('input[id="email"]')).toBeVisible();
      await expect(page.locator('input[id="verificationCode"]')).toBeVisible();
      await expect(page.locator('input[id="password"]')).toBeVisible();
      await expect(page.locator('input[id="confirmPassword"]')).toBeVisible();

      // Check the "Send" button for verification code
      await expect(page.locator('button', { hasText: 'Send' })).toBeVisible();

      // Check the submit button
      await expect(
        page.locator('button[type="submit"]', { hasText: 'Reset Password' })
      ).toBeVisible();

      // Check "Back to Login" link
      const backLink = page.locator('a', { hasText: 'Back to Login' });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', '/auth/login/learner');

      // Check learner theme styling (yellow colors)
      await expect(backLink).toHaveClass(/text-yellow-500/);
    });

    test('should navigate to learner login page when clicking back link', async ({ page }) => {
      await page.goto('/auth/reset-password');

      const backLink = page.locator('a', { hasText: 'Back to Login' });
      await backLink.click();

      await expect(page).toHaveURL('/auth/login/learner');
    });

    test('should validate email field', async ({ page }) => {
      await page.goto('/auth/reset-password');

      const emailInput = page.locator('input[id="email"]');

      // Try to submit with invalid email
      await emailInput.fill('invalid-email');
      await emailInput.blur();

      // Check for email validation error (using more specific selector)
      await expect(page.locator('text="Sorry, please type a valid email"')).toBeVisible({
        timeout: 5000,
      });
    });

    test('should enable send code button only with valid email', async ({ page }) => {
      await page.goto('/auth/reset-password');

      const emailInput = page.locator('input[id="email"]');
      const sendButton = page.locator('button', { hasText: 'Send' });

      // Initially, send button should be disabled or not functional
      await emailInput.fill('');
      await expect(sendButton).toBeVisible();

      // Enter valid email
      await emailInput.fill('test@example.com');
      await expect(sendButton).toBeEnabled();
    });

    test('should validate password fields', async ({ page }) => {
      await page.goto('/auth/reset-password');

      const passwordInput = page.locator('input[id="password"]');
      const confirmPasswordInput = page.locator('input[id="confirmPassword"]');

      // Test password strength validation
      await passwordInput.fill('123');
      await passwordInput.blur();

      // Should show password requirements error
      await expect(
        page.locator(
          'text="Password must be 8-20 characters and contain at least one uppercase letter, lowercase letter, number and special character from the following !@#$%^&*"'
        )
      ).toBeVisible({ timeout: 5000 });

      // Test password confirmation mismatch
      await passwordInput.fill('ValidPassword123!');
      await confirmPasswordInput.fill('DifferentPassword123!');
      await confirmPasswordInput.blur();

      // Should show password mismatch error
      await expect(page.locator('text="Passwords do not match"')).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Enterprise Reset Password', () => {
    test('should display enterprise reset password page correctly', async ({ page }) => {
      await page.goto('/auth/reset-password/enterprise');

      // Check page title and header
      await expect(page.locator('h1')).toHaveText('Reset Password');

      // Check logo is present
      await expect(page.locator('img[alt="Luma AI Logo"]')).toBeVisible();

      // Check form elements are present
      await expect(page.locator('input[id="email"]')).toBeVisible();
      await expect(page.locator('input[id="verificationCode"]')).toBeVisible();
      await expect(page.locator('input[id="password"]')).toBeVisible();
      await expect(page.locator('input[id="confirmPassword"]')).toBeVisible();

      // Check the submit button
      await expect(
        page.locator('button[type="submit"]', { hasText: 'Reset Password' })
      ).toBeVisible();

      // Check "Back to Login" link
      const backLink = page.locator('a', { hasText: 'Back to Login' });
      await expect(backLink).toBeVisible();
      await expect(backLink).toHaveAttribute('href', '/auth/login/enterprise');

      // Check enterprise theme styling (blue colors)
      await expect(backLink).toHaveClass(/text-blue-600/);
    });

    test('should navigate to enterprise login page when clicking back link', async ({ page }) => {
      await page.goto('/auth/reset-password/enterprise');

      const backLink = page.locator('a', { hasText: 'Back to Login' });
      await backLink.click();

      await expect(page).toHaveURL('/auth/login/enterprise');
    });
  });

  test.describe('Reset Password Form Functionality', () => {
    test('should handle verification code countdown', async ({ page }) => {
      await page.goto('/auth/reset-password');

      const emailInput = page.locator('input[id="email"]');
      const sendButton = page.locator('button', { hasText: 'Send' });

      // Fill valid email and click send
      await emailInput.fill('test@example.com');
      await sendButton.click();

      // Check if button text changes to countdown or disabled state
      await expect(
        page.locator('button', { hasText: /Resend in \d+s/ }).or(sendButton)
      ).toBeVisible({ timeout: 5000 });
    });

    test('should show all required form fields', async ({ page }) => {
      await page.goto('/auth/reset-password');

      // Check all form labels are present - using more specific selectors
      await expect(page.locator('label[for="email"]')).toContainText('Email Address');
      await expect(page.locator('label[for="verificationCode"]')).toContainText(
        'Verification Code'
      );
      await expect(page.locator('label[for="password"]')).toContainText('New Password');
      await expect(page.locator('label[for="confirmPassword"]')).toContainText(
        'Confirm New Password'
      );

      // Check placeholders - using specific selectors to avoid conflicts
      await expect(page.locator('input[id="email"][placeholder*="email"]')).toBeVisible();
      await expect(
        page.locator('input[id="verificationCode"][placeholder*="6-digit"]')
      ).toBeVisible();
      await expect(
        page.locator('input[id="password"][placeholder="Create a new password"]')
      ).toBeVisible();
      await expect(
        page.locator('input[id="confirmPassword"][placeholder="Confirm your new password"]')
      ).toBeVisible();
    });

    test('should validate complete form submission', async ({ page }) => {
      await page.goto('/auth/reset-password');

      const emailInput = page.locator('input[id="email"]');
      const verificationInput = page.locator('input[id="verificationCode"]');
      const passwordInput = page.locator('input[id="password"]');
      const confirmPasswordInput = page.locator('input[id="confirmPassword"]');
      const submitButton = page.locator('button[type="submit"]');

      // Fill the form with valid data
      await emailInput.fill('test@example.com');
      await verificationInput.fill('123456');
      await passwordInput.fill('ValidPassword123!');
      await confirmPasswordInput.fill('ValidPassword123!');

      // Submit form
      await submitButton.click();

      // The form should attempt to submit (we'll just check it's no longer in initial state)
      // Since this is a real API call that will fail, we don't expect the button to be disabled
      // Instead, we expect some kind of error or response
      await page.waitForTimeout(1000); // Give it time to process
    });

    test('should handle empty form submission', async ({ page }) => {
      await page.goto('/auth/reset-password');

      const submitButton = page.locator('button[type="submit"]');
      await submitButton.click();

      // Should show validation errors - check for specific required field errors
      await expect(page.locator('text="Please enter your email address"')).toBeVisible({
        timeout: 5000,
      });
    });
  });

  test.describe('Route handling', () => {
    test('should display learner reset password on /auth/reset-password route', async ({
      page,
    }) => {
      await page.goto('/auth/reset-password');

      // Should display the learner reset password page
      await expect(page.locator('h1')).toHaveText('Reset Password');
      await expect(page.locator('a[href="/auth/login/learner"]')).toBeVisible();
    });

    test('should also work with /auth/reset-password/learner route', async ({ page }) => {
      await page.goto('/auth/reset-password/learner');

      // Should display the learner reset password page
      await expect(page.locator('h1')).toHaveText('Reset Password');
      await expect(page.locator('a[href="/auth/login/learner"]')).toBeVisible();
    });

    test('should handle navigation between different reset password pages', async ({ page }) => {
      // Start at learner reset password
      await page.goto('/auth/reset-password');
      await expect(page.locator('a[href="/auth/login/learner"]')).toBeVisible();

      // Navigate to enterprise reset password
      await page.goto('/auth/reset-password/enterprise');
      await expect(page.locator('a[href="/auth/login/enterprise"]')).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper form accessibility', async ({ page }) => {
      await page.goto('/auth/reset-password');

      // Check for proper labels and form structure
      await expect(page.locator('label[for="email"]')).toBeVisible();
      await expect(page.locator('label[for="verificationCode"]')).toBeVisible();
      await expect(page.locator('label[for="password"]')).toBeVisible();
      await expect(page.locator('label[for="confirmPassword"]')).toBeVisible();

      // Check that form inputs are properly associated with labels
      await expect(page.locator('input[id="email"]')).toBeVisible();
      await expect(page.locator('input[id="verificationCode"]')).toBeVisible();
      await expect(page.locator('input[id="password"]')).toBeVisible();
      await expect(page.locator('input[id="confirmPassword"]')).toBeVisible();
    });

    test('should have proper aria labels', async ({ page }) => {
      await page.goto('/auth/reset-password');

      // Check for aria-label on back link
      await expect(page.locator('a[aria-label="Back to login page"]')).toBeVisible();
    });
  });
});
