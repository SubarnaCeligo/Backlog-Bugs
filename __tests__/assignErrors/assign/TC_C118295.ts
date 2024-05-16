import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("C118295 - Verify the search feature on Assign error screen", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  
  test("@Env-All @Zephyr-IO-T20069 C118295 - Verify the search feature on Assign error screen", async ({ io, page }) => {
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
    await io.homePage.loadingTime();
    
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Click on Assign error button on top bar
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Verify Search
    await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'Admin User1');
    const isUserDisplayed = await io.flowBuilder.isVisible('text="Admin User1"');
    await io.assert.expectToBeTrue(isUserDisplayed, "Search failed");

    await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'Invalid user###');
    const isMessageDisplayed = await io.flowBuilder.isVisible('text="There are no users matching your search"');
    await io.assert.expectToBeTrue(isMessageDisplayed, "Search failed");

  });
});