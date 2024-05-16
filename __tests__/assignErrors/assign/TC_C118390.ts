import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118388_C118394.json";

test.describe("C118390 - Verify that admin/owner users with invitation feature enabled/disabled is able to assign errors to new/non-IO user ", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilderDashboard.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20090 C118390 - Verify that admin/owner users with invitation feature enabled/disabled is able to assign errors to new/non-IO user ", async ({ io, page }) => {
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
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    //Fill the email ID
    await io.flowBuilder.fill(selectors.em2DotOLineGraphPO.NEW_USER_EMAIL, "io.auto.qa+newnoniouser@celigo.com");

    await io.homePage.clickByText("Assign");
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

    const assigneePill = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToContainValue('Pending - io.auto.qa+newno', assigneePill, 'Error is not assigned');
    await io.flowBuilder.hover(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL, 0, false);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT);
    const hoverText = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT)).toString();
    await io.assert.expectToContainValue(
      'The assigned user has not yet accepted their invitation to this account.',
      hoverText,
      'Hovertext did not appear'
    );


  });
  test.afterEach(async ({ io }) => {
    //Get user ID
    const response = await io.api.getCall("v1/ashares");
    JSON.stringify(response);
    const emailToFind = "io.auto.qa+newnoniouser@celigo.com";
    const foundObject = response.find(obj => obj.sharedWithUser.email === emailToFind);
    const UserId = foundObject._id;

    //Delete user from the account
    const endPoint = "v1/ashares/" + UserId
    await io.api.deleteCall(endPoint);
    await io.api.deleteFlowViaAPI(flowId);
  });
});