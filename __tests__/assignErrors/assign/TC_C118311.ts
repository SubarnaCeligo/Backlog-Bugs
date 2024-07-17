import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118311 - Verify that error assignment is retained when a user removes the step and then adds it again in the same flow", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.skip("@Env-All @Zephyr-IO-T20085 C118311 - Verify that error assignment is retained when a user removes the step and then adds it again in the same flow", async ({ io, page }) => {

    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "TC_C118311_DND");

    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open the flow
    await io.flowBuilder.clickByText("TC_C118311_DND");

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

    //Assign errors
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Assign to me');
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX);

    //Go to flowbuilder page
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "TC_C118311_DND");
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.flowBuilder.clickByText("TC_C118311_DND");

    //Remove and re-add a step
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.REMOVE_CONFIRM);
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'Shopify');
    await io.flowBuilder.click(selectors.connectionsPagePO.SHOPIFY_CONNECTION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.flowBuilder.clickByText("SHOPIFY CONNECTION");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.USEEXISTEXPORT);
    //'[name="checkExistingExport"]'
    await io.flowBuilder.clickByTextByIndex("shopify_order", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.reloadPage();

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Get logged in user
    const response = await io.api.getCall('api/profile');
    const loggenInUser = response.name;

    //Verify if assignee is retained
    const assignee = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToBeValue(loggenInUser, assignee, 'Assignment not retained after removing and readding a step');

    //Clear all assignments
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Clear assignment');

  });
});