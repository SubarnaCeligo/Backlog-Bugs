import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author - Shriti S T29671 - Verify that Clear assignment button is not shown when an unassigned error is selected", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Priority-P3 @Zephyr-IO-T29671 - Verify that Clear assignment button is not shown when an unassigned error is selected.", async ({ io, page }) => {

    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();

    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Filter_Automation01_DND');
    
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
 
    //Open the flow
    await io.flowBuilder.clickByText('Filter_Automation01_DND');
    await io.homePage.loadingTime();

    let accountErrorsDashBoardIsDisplayed = await page.locator(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    if (accountErrorsDashBoardIsDisplayed.isHidden()) {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.flowBuilder.delay(1000 * 60 * 4);
      await accountErrorsDashBoardIsDisplayed.waitFor({
        state: "visible",
        timeout: 180000
      });
    }

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);

    //Hover on any error
    await io.flowBuilder.hover(selectors.em2DotOLineGraphPO.SELECTED_ERROR)

    //Click on Assign error button and verify if it opens assign error dialog
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.ASSIGN_BUTTON_HOVER, 1);
    await io.flowBuilder.waitForElementAttached(selectors.filterErrorTag.ARIALABELSEARCHUSER);

    //Verify only Cancel button is shown.
    let buttons = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.CLEAR_CANCEL_BUTTONS)).toString();
    await io.assert.expectToBeValue('Cancel', buttons, 'Clear assignment button is showing when unassigned error is selcted.')

  });
});