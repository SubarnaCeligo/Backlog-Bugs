import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118306 - Verify Assign error flyout when errors assigned to multiple users are selected ", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20080 C118306 - Verify Assign error flyout when errors assigned to multiple users are selected ", async ({ io, page }) => {

  //Navigate to default integration
  await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

  // Search for a flow
  await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
  await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,"TC_C118306_DND");

  //Wait for search to complete
  await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

  //Open the flow
  await io.flowBuilder.clickByText("TC_C118306_DND");

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
  await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
  await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
  await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  await io.flowBuilder.clickByText('Assign to me');
  await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
  await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);

  //Assign 2nd error to another user
  await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 2);
  await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  await io.flowBuilder.clickByTextByIndex('Manage User', 0);
  await io.homePage.clickByText("Assign");
  await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
  await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 2);

  //Select both errors
  await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
  await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 2);

  //Reopen assign error flyout
  await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  
  const message = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
  await io.assert.expectToContainValue(message, 
  'The selected errors are not assigned to the same user. ,Assigning a user here will replace the existing assigned user on all selected errors.',
  'Warning message is not displayed');

  //Clear all assignments
  await io.flowBuilder.reloadPage();
  await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
  await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
  await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
  await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
  await io.flowBuilder.clickByText('Clear assignment');

  });
});