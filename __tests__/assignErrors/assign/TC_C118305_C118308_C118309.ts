import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118305_C118308_C118309-Verify Assign error flyout when errors assigned to single user are selected ", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20079 @Zephyr-IO-T20082 @Zephyr-IO-T20083 Verify Assign error flyout when errors assigned to single user are selected ", async ({ io, page }) => {

   //Navigate to default integration
   await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

   // Search for a flow
   await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
   await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,"TC_C118305_DND");

   //Wait for search to complete
   await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

   //Open the flow
   await io.flowBuilder.clickByText("TC_C118305_DND");
   await io.flowBuilder.loadingTime();

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

   //Assign two errors to a user
   await io.flowBuilder.addStep("C118309-Verify clicking on 'Assign to me' during single error action assigns the error to logged in user"); 
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
   await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 2);
   await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
   await io.flowBuilder.clickByText('Assign to me');
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

   //Reopen assign error flyout
   await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

   //Get the scrolled user
   const selectedUser = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.AUTO_SELECTED_USER)).toString();
  
   //Get logged in user
   const response = await io.api.getCall('api/profile');
   const loggenInUser = response.name;

   await io.flowBuilder.addStep("C118308-Verify the behavior when assign error flyout is reopened for an already assigned error");
   await io.assert.expectToBeValue(loggenInUser, selectedUser, 'Assigned user is not auto selected.')

   //Clear all assignments
   await io.flowBuilder.reloadPage();
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
   await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
   await io.flowBuilder.clickByText('Clear assignment');

  
  });
});