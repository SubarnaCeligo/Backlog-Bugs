import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118294 - Verify the elements of 'Assign error' flyout", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20068 C118294 - Verify the elements of 'Assign error' flyout", async ({ io, page }) => {

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

    //Click on Assign error button on top bar
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Verify if assign error label is visible
    const label = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGN_ERROR_LABEL)).toString();
    await io.assert.expectToBeValue("Assign error", label, 'Assign error label is not visible');

    //Verify error selected text
    const message = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ERROR_SELECTED_TEXT)).toString();
    await io.assert.expectToBeValue("1 errors selected", message, 'Message is not visible');

    //Verify search box is visible
    await io.assert.verifyElementIsDisplayed(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'Search box is not visible')

    //Verify 'Assign to me' is visible.
    const isAssignToMeDisplayed = await io.flowBuilder.isVisible('text="Assign to me"');
    await io.assert.expectToBeTrue(isAssignToMeDisplayed, "Assign to me is not displayed");

    //Verify Assgn to new user label is displayed.
    const label02 = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGN_NEWUSER_LABEL)).toString();
    await io.assert.expectToBeValue('Assign to new user', label02, 'Assign to new users is not displayed.');

    //Verify email box is displayed.
    await io.assert.verifyElementIsDisplayed(selectors.em2DotOLineGraphPO.NEW_USER_EMAIL, 'Email box is not displayed');

    //Help text for assign error.
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.ASSIGN_HELPTEXT, 0);
    await io.flowBuilder.loadingTime();
    const helpText1 = await io.flowBuilder.isVisible("text='Only users with access to the integration are shown in the assignee list. Assignees will be notified via email.'");
    await io.assert.expectToBeTrue(
      helpText1,
      'Helptext not displayed'
    );
    
    //Help text for assign error.
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.ASSIGN_HELPTEXT, 1);
    await io.flowBuilder.loadingTime();
    const helpText2 = await io.flowBuilder.isVisible("text='Assigning to new users (non-IO, different account or users of this account without integration access) will invite and grant monitor access.'");
    await io.assert.expectToBeTrue(
      helpText2,
      'Helptext not displayed'
    );

    //Verify Assign button is visible
    await io.assert.verifyElementIsDisplayed(selectors.em2DotOLineGraphPO.ASSIGN_BUTTON, 'Assign button is not displayed');

    //Verify Cancel button is displayed
    await io.assert.verifyElementIsDisplayed(selectors.em2DotOLineGraphPO.CANCEL_BUTTON, 'Cancel button is not displayed');
  });
});