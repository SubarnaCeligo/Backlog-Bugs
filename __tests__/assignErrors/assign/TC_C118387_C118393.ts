import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118388_C118394.json";

test.describe("C118387_C118393-Verify batch reassign feature when errors assigned to a single user are selected at once. ", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20087 @Zephyr-IO-T20093 C118387_C118393-Verify batch reassign feature when errors assigned to a single user are selected at once. ", async ({
    io,
    page
  }) => {
    //387- Verify clicking on 'Assign to me' during bulk action assigns all the selected errors to logged in user
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
    
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Assign two errors to a user
    await io.flowBuilder.addStep(
      "C118387	Verify clicking on 'Assign to me' during bulk action assigns all the selected errors to logged in user "
    );
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

    //Reassign both errors to another user
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.clickByText("Manage User");
    await io.flowBuilder.clickByText("Assign");
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );

    //Verify if errors are assigned
    const assigneePills = (
      await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)
    ).toString();
    await io.assert.expectToBeValue(
      "Manage User,Manage User",
      assigneePills,
      "Errors are not reassigned"
    );
  });
});
