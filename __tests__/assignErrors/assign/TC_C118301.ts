import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import reqBodyPOST from "@testData/EM2.0/C118300_POST.json"
import reqBodyPUT from "@testData/EM2.0/C118300_PUT.json"
import flow from "@testData/assignErrors/C118299.json";

test.describe("C118301 - Verify the assignee pill when the user is removed from the integration", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    flowId = await io.createResourceFromAPI(flow, "FLOWS");
    // Get default integration ID
    reqBodyPOST.integrationAccessLevel[0]._integrationId = process.env["IO_Integration_ID"];

    //Get integration ID
    const integration_Id = await io.api.getIntegrationId("EM");
    reqBodyPOST.integrationAccessLevel[1]._integrationId = integration_Id;

    //Invite user with 2 integration access
    const id = await io.api.inviteUserThruApi(reqBodyPOST);
  });
  test("@Env-All @Zephyr-IO-T20075 C118301 - Verify the assignee pill when the user is removed from the integration", async ({ io, page }) => {

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
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'io.auto.qa+remintaccess@celigo.com');
    await io.flowBuilder.clickByText('Pending - io.auto.qa+remintaccess@celigo.com');
    await io.homePage.clickByText("Assign");

    //Verify if error is assigned.
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
    const assignee = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToContainValue('Pending - io.auto.qa+remint', assignee, 'Error not assigned - Pill is not showing user email');

    //Get user ID
    const response = await io.api.getCall("v1/ashares");
    JSON.stringify(response);
    const emailToFind = "io.auto.qa+remintaccess@celigo.com";
    const foundObject = response.find(obj => obj.sharedWithUser.email === emailToFind);
    const UserId = foundObject._id;

    //Remove access from integration
    const integration_Id = await io.api.getIntegrationId("EM");
    reqBodyPUT.integrationAccessLevel[0]._integrationId = integration_Id;
    const endPoint = "v1/ashares/" + UserId
    await io.api.putCall(endPoint, reqBodyPUT);

    //Reload the page and check if the user email pill is still visible.
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
    const assigneePostUpdate = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToContainValue('Pending - io.auto.qa+remint', assigneePostUpdate, 'Error not assigned - Pill is not showing user email');

    //Clear all assignments
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Clear assignment');
  });

  test.afterEach(async ({ io }) => {
    //Get user ID
    const response = await io.api.getCall("v1/ashares");
    JSON.stringify(response);
    const emailToFind = "io.auto.qa+remintaccess@celigo.com";
    const foundObject = response.find(obj => obj.sharedWithUser.email === emailToFind);
    const UserId = foundObject._id;

    //Delete user from the account
    const endPoint = "v1/ashares/" + UserId
    await io.api.deleteCall(endPoint);

  });
});