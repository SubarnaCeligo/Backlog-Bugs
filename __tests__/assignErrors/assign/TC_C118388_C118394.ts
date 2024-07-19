import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118388_C118394 -Verify batch reassign feature when errors assigned to multiple users are selected at once.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20088 @Zephyr-IO-T20097 C118388_C118394 - Verify batch reassign feature when errors assigned to multiple users are selected at once.", async ({ io, page }) => {

    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow 
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C118388_C118394_DND');
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open the flow
    await io.flowBuilder.clickByText('TC_C118388_C118394_DND');

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

    //Assign one error to a user
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Assign to me');
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    
    //Assign one error to a another user who has access to integration
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 2);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Admin User1');
    await io.homePage.clickByText("Assign");
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

    //Select both errors
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 2);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    const message = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue(message, 
    'The selected errors are not assigned to the same user. ,Assigning a user here will replace the existing assigned user on all selected errors.',
    'Warning message is not displayed');

    await io.flowBuilder.clickByText('Manage User');
    await io.flowBuilder.clickByText("Assign");
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

    //Verify if all errors are reassigned
    const assigneePills = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToBeValue("Manage User,Manage User", assigneePills,'Errors are mot reassigned');

    //Clear all assignments
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Clear assignment');
  });
});