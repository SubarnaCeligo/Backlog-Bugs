import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118299.json";

test.describe("C118118_C118284 Verify filtering by 'Myself' returns only errors assigned to the logged in user and Verify filter persistence when the user navigates to other tabs and returns to open errors tab", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T20058 @Zephyr-IO-T20066 C118118_C118284	Verify filtering by 'Myself' returns only errors assigned to the logged in user ", async ({
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
    //Assign two errors to a user
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 2);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Assign to me');
    await io.flowBuilder.reloadPage();

    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Check Myself
    await io.flowBuilder.clickByText("Myself");

    //Click Apply
    await io.flowBuilder.click(selectors.filterErrorTag.APPLYYAGSSELECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
    const assigneePills = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToBeValue(assigneePills, 'Assign Error Owner,Assign Error Owner', 'Myself filter did not work');

    //Verify filter persistence
    await io.flowBuilder.addStep("Verify filter persistence when the user navigates to other tabs and returns to open errors tab");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
    await io.flowBuilder.click(selectors.integrationPagePO.OPENERRORS);

    //Check if filter is retained.
    const assigneePillsRetained = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToBeValue(assigneePillsRetained, 'Assign Error Owner,Assign Error Owner', 'Myself filter did not work');

    //Clear all assignments
    // await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
    // await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    // await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    // await io.flowBuilder.clickByText('Clear assignment');

  });
});