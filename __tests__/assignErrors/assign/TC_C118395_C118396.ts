import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118388_C118394.json";

test.describe("C118395_C118396 - Verify batch unassignment for errors assigned to a single user ", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T20094 @Zephyr-IO-T20095 C118395_C118396 - Verify batch unassignment for errors assigned to a single user ", async ({
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
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      2
    );
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.clickByText("Assign to me");
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );

    //Verify if error is assigned
    const assigneePills = (
      await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)
    ).toString();
    await io.assert.expectToBeValue(
      "Assign Error Owner,Assign Error Owner",
      assigneePills,
      "Errors not assigned"
    );

    //Clear assignment
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      1
    );
    await io.flowBuilder.clickButtonByIndex(
      selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX,
      2
    );
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.clickByText("Clear assignment");
    await io.flowBuilder.reloadPage();

    const assigneePillVisible = await io.flowBuilder.isVisible(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );
    await io.assert.expectToBeFalse(
      assigneePillVisible,
      "Assignee pill is not removed after unassignment"
    );
  });
});
