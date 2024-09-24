import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51620 Verify the tooltip for the 'Actions' icon in the Current View", () => {
  test("@Zephyr-IO-T19772 @Env-All C51620 Verify the tooltip for the 'Actions' icon in the Current View", async ({
    io
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("TC_C51620_Flow_DND");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("1 error", 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TOGGLE_VIEW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PANELICON1);
    await io.flowBuilder.click(selectors.myAccountPagePO.SCRIPTACTIONMENU);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER,
      "Tool Tip Option is not displayed"
    );
  });
});
