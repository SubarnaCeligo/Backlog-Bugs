import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C108690 Verify the save and close buttons once we edit any flow", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  // Validate the Notification Error Text
  test("@Env-All @Zephyr-IO-T23949 C108690 Verify the Notifications Error Text Message", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("TC_C108690_Flow_DND");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "TC_C108690 Export1"
    );
    
    await io.assert.verifyElementText(
      selectors.flowBuilderPagePO.EXPORT_NOTIFICATION_ERROR_MESSAGE,
      "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results.Run a new test after making edits to see accurate results."
    );
    await io.assert.checkElementState(
      selectors.basePagePO.SAVE_AND_CLOSE,
      "isEnabled"
    );
  });
});
