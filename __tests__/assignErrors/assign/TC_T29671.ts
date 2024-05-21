import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("@Author - Shriti S T29671 - Verify that Clear assignment button is not shown when an unassigned error is selected", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Priority-P3 @Zephyr-IO-T29671 - Verify that Clear assignment button is not shown when an unassigned error is selected.", async ({ io, page }) => {

    flowId = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.delay(1000 * 60 * 4);
    await page
      .locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS)
      .waitFor({
        state: "visible",
        timeout: 180000
      });
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );    
    //Hover on any error
    await io.flowBuilder.hover(selectors.em2DotOLineGraphPO.SELECTED_ERROR)

    //Click on Assign error button and verify if it opens assign error dialog
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.ASSIGN_BUTTON_HOVER, 1);
    await io.flowBuilder.waitForElementAttached(selectors.filterErrorTag.ARIALABELSEARCHUSER);

    //Verify only Cancel button is shown.
    let buttons = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.CLEAR_CANCEL_BUTTONS)).toString();
    await io.assert.expectToBeValue('Cancel', buttons, 'Clear assignment button is showing when unassigned error is selcted.')

  });
});