// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch( {logger: {
    isEnabled: (name, severity) => name === 'browser',
    log: (name, severity, message, args) => console.log(`${name} ${message}`)}
  });
  const page = await browser.newPage();
  await page.goto('https://staging.integrator.io', {waitUntil: "domcontentloaded"});
  await page.getByPlaceholder('Email*').click();
  await page.waitForTimeout(2000);
  await page.getByPlaceholder('Email*').fill('shiva.potlapelli+2@celigo.com');
  await page.waitForTimeout(2000);
  await page.getByPlaceholder('Password*').click();
  await page.waitForTimeout(2000);
  await page.getByPlaceholder('Password*').fill('Shiva@454555');
  await page.waitForTimeout(2000);
  await page.locator('[data-test="submit"]').click();
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: 'storageState.json' });
}

export default globalSetup;