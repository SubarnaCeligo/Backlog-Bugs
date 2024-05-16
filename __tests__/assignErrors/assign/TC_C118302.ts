import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import reqBody from "@testData/EM2.0/C118301.json";
import flow from "@testData/assignErrors/C118299.json";

test.describe("C118302 - Verify the assignee pill when the user is removed from the account", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test.beforeEach(async ({ io }) => {
    flowId = await io.createResourceFromAPI(flow, "FLOWS");
    // Get default integration ID
    reqBody.integrationAccessLevel[0]._integrationId = process.env["IO_Integration_ID"];

    //Invite user with 2 integration access
    const id = await io.api.inviteUserThruApi(reqBody);

  });
  test("@Env-All @Zephyr-IO-T20076 C118302 - Verify the assignee pill when the user is removed from the account", async ({ io, page }) => {

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
   await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'io.auto.qa+remacctaccess@celigo.com');
   await io.flowBuilder.clickByText('Pending - io.auto.qa+remacctaccess@celigo.com');
   await io.homePage.clickByText("Assign");

   //Verify if error is assigned.
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
   const assignee = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
   await io.assert.expectToContainValue('Pending - io.auto.qa+remac', assignee, 'Error not assigned - Pill is not showing user email');

   //Get user ID
   const response = await io.api.getCall("v1/ashares");
   JSON.stringify(response);
   const emailToFind = "io.auto.qa+remacctaccess@celigo.com";
   const foundObject = response.find(obj => obj.sharedWithUser.email === emailToFind);
   const UserId = foundObject._id;

   //Remove the user from account
   const endPoint = "v1/ashares/" + UserId
   await io.api.deleteCall(endPoint);

   //Reload the page and check if the user email pill is still visible.
   await io.flowBuilder.addStep("Validating pill after removing user from account");
   await io.flowBuilder.reloadPage();
   const assigneePillVisible = await io.flowBuilder.isVisible(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
   await io.assert.expectToBeFalse(assigneePillVisible, 'Assignee pill is not removed after user is removed from account');

 });
});