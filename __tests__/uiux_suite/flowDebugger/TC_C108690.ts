import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C108690 from "@testData/FlowDebugger/C108690.json";

test.describe("C108690 Verify the save and close buttons once we edit any flow", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  // Validate the Notification Error Text
  test("C108690 Verify the Notifications Error Text Message", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText(C108690.createFlow.name);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await io.flowBuilder.click("[data-test='Transfer']");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill('input[name="/name"]', "TC_C108690 Export1");
    const notificationErrorMessage = await page.locator("#notification");
    const notificationErrorText = await notificationErrorMessage.innerText();
    await expect(notificationErrorText).toBe(
      "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results.\nRun a new test after making edits to see accurate results."
    );
    const saveCloseButton = await page.locator(
      'button[data-test="saveAndClose"]'
    );
    await expect(saveCloseButton).toBeEnabled();
  });
});
