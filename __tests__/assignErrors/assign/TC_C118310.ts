import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation01.json";

test.describe("C118310 - [UI]Verify invite feature with an invalid email ID", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T20084 C118310 - Verify invite feature with an invalid email ID", async ({ io, page }) => {

    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "Filter_Automation01_DND"
    );

    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open the flow
    await io.flowBuilder.clickByText("Filter_Automation01_DND");

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Assign errors
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

     //Fill the email ID
   await io.flowBuilder.fill(selectors.em2DotOLineGraphPO.NEW_USER_EMAIL, "invalid@test");

   //Validate the warning message.
   const errorMessage = (await io.flowBuilder.getText(selectors.flowGroupingPagePO.FG_ERROR_MSG)).toString();
   await io.assert.expectToBeValue('Please enter a valid email address', errorMessage, 'Validation message not displayed');

  });
});