import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import reqBodyPUT from "@testData/EM2.0/C118389.json";
import flow from "@testData/assignErrors/C118388_C118394.json";

test.describe("C118389 - Verify that admin/owner users with invitation feature enabled/disabled is able to assign errors to an existing user who does not have access to the integration(platform should auto assign monitor access", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20089 C118389 - Verify that admin/owner users with invitation feature enabled/disabled is able to assign errors to an existing user who does not have access to the integration(platform should auto assign monitor access", async ({
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

    await io.flowBuilder.clickByText("CustomUser NoAccess");
    //Valiadte the message
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGN_MESSAGE
    );
    let message = (
      await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGN_MESSAGE)
    ).toString();
    message = message.replace("\n", " ");
    await io.assert.expectToBeValue(
      "The user you selected does not have access to this integration. Assigning will grant them monitor access.",
      message,
      "Warning message not displayed"
    );
    await io.flowBuilder.clickByText("Assign");
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(
      selectors.em2DotOLineGraphPO.ASSIGNEE_PILL
    );

    //Verify if all errors are reassigned
    const assigneePills = (
      await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)
    ).toString();
    await io.assert.expectToBeValue(
      "CustomUser NoAccess",
      assigneePills,
      "Errors are not reassigned"
    );
  });

  test.afterEach(async ({ io }) => {
    //Get user ID
    const response = await io.api.getCall("v1/ashares");
    JSON.stringify(response);
    const emailToFind = "io.auto.qa+assignuser11@celigo.com";
    const foundObject = response.find(
      obj => obj.sharedWithUser.email === emailToFind
    );
    const UserId = foundObject._id;

    //Remove access from integration
    const integration_Id = await io.api.getIntegrationId("EM");
    reqBodyPUT.integrationAccessLevel[0]._integrationId = integration_Id;
    const endPoint = "v1/ashares/" + UserId;
    await io.api.putCall(endPoint, reqBodyPUT);
    await io.api.deleteFlowViaAPI(flowId);
  });
});
