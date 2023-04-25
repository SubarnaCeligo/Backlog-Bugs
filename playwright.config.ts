import { defineConfig, devices, PlaywrightTestConfig } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./src/tests",
  /* Maximum time one test can run for. */
  timeout: 1000 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  globalSetup: require.resolve("./global-setup"),

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    storageState: "./storageState.json",
    screenshot: "only-on-failure"
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: process.env.BASE_URL,
        headless: true,
        ignoreHTTPSErrors: true,
        trace: "on"
      }
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: process.env.BASE_URL,
        headless: true
      }
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], baseURL: process.env.BASE_URL }
    }

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"], baseURL: process.env.BASE_URL }
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"], baseURL: process.env.BASE_URL }
    // }

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ]

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});

const RPconfig = {
  token: "4739f53f-b46a-426f-88f8-c3785e33f26c",
  endpoint: "http://43.204.111.120:8080",
  project: "Playwright Project",
  launch: "Playwright test",
  attributes: [
    // {
    //   key: 'key',
    //   value: 'value',
    // },
    // {
    //   value: 'value',
    // },
  ],
  description: "Uploading reports to the portal..."
};

export const config: PlaywrightTestConfig = {
  reporter: [["@reportportal/agent-js-playwright", RPconfig]],
  testDir: "./tests"
};
