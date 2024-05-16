import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118299.json"

test.describe("C118300 - Verify the assignee pill when the user is disabled", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20074 C118300 - Verify the assignee pill when the user is disabled", async ({ io, page }) => {

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
    await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'Disabled User');
    await io.flowBuilder.clickByText('Disabled User');
    await io.homePage.clickByText("Assign");

    //Verify if error is assigned.
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
    const assignee = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToBeValue('Disabled User', assignee, 'Error not assigned - Pill is not showing user name');

    //Disable the user using API
    const response = await io.api.getCall("v1/ashares");
    JSON.stringify(response);
    const emailToFind = "io.auto.qa+assignuser10@celigo.com";
    const foundObject = response.find(obj => obj.sharedWithUser.email === emailToFind);
    const UserId = foundObject._id;

    //Disable the user
    const endPoint = "v1/ashares/" + UserId + "/disable";
    await io.api.putCall(endPoint, { enable: false });

    //Reload the error page to see the changes.
    const assigneeAfterDisable = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToBeValue('Disabled User', assigneeAfterDisable, 'Pill is not showing user name after disabling');

    //Enable the user back.
    await io.api.putCall(endPoint, { enable: true });

    //Clear all assignments
  //   await io.flowBuilder.reloadPage();
  //   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
  //   await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
  //   await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
  //   await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  //   await io.flowBuilder.clickByText('Clear assignment');
  });
});