import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118388_C118394.json";

test.describe("C119819", () => {
  let flowId;
  test("@Env-All @Zephyr-IO-T20106 C119819", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.homePage.waitForElementAttached(selectors.basePagePO.BREADCRUMB);
    let invite = selectors.homePagePO.INVITATION_TAB;
    await io.myAccountPage.click(invite);
    const isEnabled = await page.$eval(selectors.basePagePO.ENABLESSO, element =>
      element.hasAttribute("Mui-disable")
    );
    console.log("true or false " + isEnabled);
    if (isEnabled == false) {
      // enable is true
      await io.myAccountPage.click(selectors.basePagePO.ENABLESSO);
    }
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
    //Fill the email ID
    await io.flowBuilder.fill(
      selectors.em2DotOLineGraphPO.NEW_USER_EMAIL,
      "io.auto.qa+test5@celigo.com"
    );

    await io.homePage.clickByText("Assign");
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );

    const assigneePill = (
      await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)
    ).toString();
    await io.flowBuilder.hover(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL,
      0,
      false
    );
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL_HOVERTEXT
    );

    // await io.assert.expectToBeFalse(isEnabled, 'Element is not disabled');
  });
  test.afterEach(async ({ io }) => {
    //Get user ID
    const response = await io.api.getCall("v1/ashares");
    JSON.stringify(response);
    const emailToFind = "io.auto.qa+test5@celigo.com";
    const foundObject = response.find(
      obj => obj.sharedWithUser.email === emailToFind
    );
    const UserId = foundObject._id;

    //Delete user from the account
    const endPoint = "v1/ashares/" + UserId;
    await io.api.deleteCall(endPoint);
    await io.api.deleteFlowViaAPI(flowId);
  });
});
