import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118293 - Verify that 'Assign error' button is added on the top bar, error details section and is visible upon hovering on any row1", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20067 C118293 -Verify that 'Assign error' button is added on the top bar, error details section and is visible upon hovering on any row", async ({ io, page }) => {

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
   
    //Verify Assign error button is added on top bar
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.assert.verifyElementIsDisplayed(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS, 'Assign button not visible on top bar');

    //Verify Assign error button is added on error details section 
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORDETAIL);
    await io.assert.verifyElementIsDisplayed(selectors.em2DotOLineGraphPO.ASSIGN_ERRORDETAIL, 'Assign button not visible on Error Details section');

    //Hover on any error
    await io.flowBuilder.hover(selectors.em2DotOLineGraphPO.SELECTED_ERROR)

    //Click on Assign error button and verify if it opens assign error dialog
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.ASSIGN_BUTTON_HOVER, 1);
    await io.assert.verifyElementIsDisplayed(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'Assign error button did not appear upon hovering');


  });
});