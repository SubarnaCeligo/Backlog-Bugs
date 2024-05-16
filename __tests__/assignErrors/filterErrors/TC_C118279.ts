import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118299.json";

test.describe("C118279 Verify the filter feature on open errors section by applying both user and tag filter", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20061 C118279 Verify the filter feature on open errors section by applying both user and tag filter", async ({
    io,
    page,
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
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Assign errors
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Assign to me');
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX);
 
    //Assign tags
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.TAG_ERRORS);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SELECT_TAG,0);
    await io.flowBuilder.clickByText('Apply');
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.reloadPage();

    //Click on Filter Icon
    await io.flowBuilder.waitForElementAttached(selectors.filterErrorTag.ARIALABELFILTERERROR);
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Apply filter involving user and tag
    await io.flowBuilder.clickByText("Myself");
    await io.flowBuilder.clickByIndex(selectors.em2DotOLineGraphPO.TAGS_FILTERBOX,0);
    await io.flowBuilder.clickByText("Apply");
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

    const isTagDisplayed = await io.flowBuilder.isVisible('text="Admin_Tag"');
    await io.assert.expectToBeTrue(isTagDisplayed, "Admin_Tag not found");
    const isUserDisplayed = await io.flowBuilder.isVisible('text="Assign Error Owner"');
    await io.assert.expectToBeTrue(isUserDisplayed, "Assign Error Owner not found");

    //Clear all assignments
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Clear assignment');

    //Clear all tags
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.TAG_ERRORS);
    await io.flowBuilder.click(selectors.filterErrorTag.CLEARTAGSSELECTOR);

  });
});