import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("C118293 - Verify that 'Assign error' button is added on the top bar, error details section and is visible upon hovering on any row", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20067 C118293 -Verify that 'Assign error' button is added on the top bar, error details section and is visible upon hovering on any row", async ({
    io,
    page
  }) => {
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
    //Verify Assign error button is added on top bar
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGN_ERRORS
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.em2DotOLineGraphPO.ASSIGN_ERRORS,
      "Assign button not visible on top bar"
    );

    //Verify Assign error button is added on error details section
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGN_ERRORDETAIL
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.em2DotOLineGraphPO.ASSIGN_ERRORDETAIL,
      "Assign button not visible on Error Details section"
    );

    //Hover on any error
    await io.flowBuilder.hover(selectors.em2DotOLineGraphPO.SELECTED_ERROR);

    //Click on Assign error button and verify if it opens assign error dialog
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.ASSIGN_BUTTON_HOVER,
      1
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.filterErrorTag.ARIALABELSEARCHUSER,
      "Assign error button did not appear upon hovering"
    );
  });
});
