import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118297 - Verify the assignee pill when the invited non-IO user has not accepted the invite yet", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20071 C118297 - Verify the assignee pill when the invited non-IO user has not accepted the invite yet", async ({ io, page }) => {

    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C118297_DND');
    
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open the flow
    await io.flowBuilder.clickByText('TC_C118297_DND');

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

    //io.auto.qa+assignpending@celigo.com
    //Search for pending user
    await io.flowBuilder.fill(selectors.filterErrorTag.ARIALABELSEARCHUSER, 'Pending');
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.ASSIGNEE_NAME_LIST, 0);
    await io.homePage.clickByText("Assign");

    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);
    const assigneePill = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL)).toString();
    await io.assert.expectToContainValue('Pending -', assigneePill, 'Pending pill is not displayed');

    //Clear all assignments
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 0);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Clear assignment');

  });
});