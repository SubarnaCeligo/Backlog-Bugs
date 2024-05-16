import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118388_C118394.json";

test.describe("C118397 - Verify batch unassign feature when errors assigned to multiple users are selected at once.", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T20096 C118397 - Verify batch unassign feature when errors assigned to multiple users are selected at once.", async ({
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

    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGN_ERRORS
    );
    //Assign one error to a user
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      1
    );
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.clickByText("Assign to me");
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );

    //Assign one error to a another user
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      2
    );
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.clickByText("Admin User1");
    await io.homePage.clickByText("Assign");
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );

    //Select both errors
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      1
    );
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      2
    );

    //Clear assignment
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.clickByText("Clear assignment");
    await io.flowBuilder.reloadPage();

    //Verify if assignee is removed
    const assigneePillVisible = await io.flowBuilder.isVisible(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );
    await io.assert.expectToBeFalse(
      assigneePillVisible,
      "Assignee pill is not removed after unassignment"
    );
  });
});
