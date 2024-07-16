import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118304 - Verify the assign error feature when user tries invite a user who already exists in the account ", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20078 C118304 - Verify the assign error feature when user tries invite a user who already exists in the account ", async ({ io, page }) => {

   //Navigate to default integration
   await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

   // Search for a flow
   await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
   await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Filter_Automation02_DND');
  
   //Wait for search to complete
   await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

   //Open the flow
   await io.flowBuilder.clickByText('Filter_Automation02_DND');

   //Open errors dashborad
   await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);

   //Clear existing assignments
   await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.FA_FILTER_CHECKBOX);
   await io.flowBuilder.click(selectors.dashboardPagePO.FA_FILTER_CHECKBOX);
   
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   
   await io.flowBuilder.loadingTime();
   let isClearButtonVisible = await io.flowBuilder.isVisible("text='Clear assignment'");
   if (isClearButtonVisible){
     await io.flowBuilder.clickByText('Clear assignment');
     await io.flowBuilder.loadingTime();
   }
   await io.flowBuilder.waitForElementAttached(selectors.dashboardPagePO.FA_FILTER_CHECKBOX);
   await io.flowBuilder.click(selectors.dashboardPagePO.FA_FILTER_CHECKBOX);

   //Assign one error to a user
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
   await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

   //Fill the email ID
   await io.flowBuilder.fill(selectors.em2DotOLineGraphPO.NEW_USER_EMAIL, "io.auto.qa+assignuser2@celigo.com");

   //Validate the warning message.
   const warningMessage = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
   await io.assert.expectToBeValue(
    "A user with this email address already exists in this account. Select them from the list of users above.",
    warningMessage,
    "Warning message is not displayed."
   );


  });
});