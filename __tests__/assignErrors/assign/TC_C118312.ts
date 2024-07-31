import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118312 - Verify Assign error flyout when the there are users in the account with long usernames", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20086 C118312 - Verify Assign error flyout when the there are users in the account with long usernames", async ({ io, page }) => {

   //Navigate to default integration
   await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

   // Search for a flow
   await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
   await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Filter_Automation01_DND');
   
   //Wait for search to complete
   await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

   //Open the flow
   await io.flowBuilder.clickByText('Filter_Automation01_DND');

   //Open errors dashborad
   await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

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

   //Verify if long user names are displayed.
   await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
   await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
   await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
   await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'User WithLongUserName');
   await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST);
   const userNames =  await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST);
   let userNameArray = []
   userNameArray.push(userNames.toString().trim());
   await io.assert.expectToBeValueInArray(userNameArray, 'User WithLongUserNameTestWithLongUserNameTest', 'Long user names not displyed.');
  });
});