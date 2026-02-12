import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv'
import path from 'path';

const env = process.env.ENV || 'staging'
dotenv.config({path: path.resolve(__dirname, `config/.env.${env}`), override: true,})

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,

    /* set http header */
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.ACCEPT_TOKEN}`
    },
    headless: false,
    launchOptions: {
      slowMo: 2_500
    },
    actionTimeout: 5_000,
    navigationTimeout: 20_000,
    
    trace: 'on',
    video: 'on',
    screenshot: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'auth-setup',
      testMatch: 'auth-ui.setup.ts'
    }, 
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['auth-setup']
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' },
    //   dependencies: ['auth-setup']
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
