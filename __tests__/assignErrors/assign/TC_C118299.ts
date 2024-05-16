import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118299.json"

test.describe("C118299 - Verify the assignee pill when the invited non-IO user has accepted the invite", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  
  test("@Env-All @Zephyr-IO-T20073 C118299 - Verify the assignee pill when the invited non-IO user has accepted the invite", async ({ io, page }) => {
    
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

   //Assign one error to a user
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
   await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
   await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'Manage User');

   await io.flowBuilder.clickByText('Manage User');
   await io.homePage.clickByText("Assign");
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

   const assignee = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
   await io.assert.expectToBeValue('Manage User', assignee, 'Error not assigned - Pill is not showing user name');
  });
});