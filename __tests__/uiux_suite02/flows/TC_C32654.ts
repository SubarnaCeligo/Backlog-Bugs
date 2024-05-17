import { test, expect } from "@celigo/ui-core-automation";

test.describe(`C32654 Verify Drawer title ,mapping screen layout for Response mapper and Lookup results mapper`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
  });

  test(`C32654 Verify Drawer title for Lookup results mapper`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.clickByText("Branching2_Scheduling_DND");
    const inputDestinationSelector = `[data-test="pp-650993ee423b065da85c6475"] [data-test="addDataProcessor"]`;
    await io.flowBuilder.waitForElementAttached(inputDestinationSelector);
    await io.flowBuilder.click(inputDestinationSelector);
    await io.flowBuilder.click('[data-test="pp-650993ee423b065da85c6475"] [data-test="responseMapping"]');
    await expect(page.getByText('Edit results mapping')).toBeVisible();
  });

  test('C32654 Verify Drawer title for Response mapper', async ({ io, page }) => { 
    await io.flowBuilder.clickByText("C32362_DND");
    const inputDestinationSelector = `[data-test="pp-6553377445378803cf8c0c36"] [data-test="addDataProcessor"]`;
    await io.flowBuilder.waitForElementAttached(inputDestinationSelector);
    await io.flowBuilder.click(inputDestinationSelector);
    await io.flowBuilder.click('[data-test="pp-6553377445378803cf8c0c36"] [data-test="responseMapping"]');
    await expect(page.getByText('Edit response mapping')).toBeVisible();
  });
});
