import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify that clicking on error hyperlink on flows dashboard opens error console.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-31713 @Priority-P2 @Zephyr-IO-T29023 Verify that clicking on error hyperlink on flows dashboard opens error console.", async ({ io, page }) => {

     //Go to Dashboard
    await io.myAccountPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "dashboard");
    await io.homePage.loadingTime();

    //Verify if EDI activity tab is visible
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    
    //Click on EDI Activity
    await io.homePage.click(selectors.dashboardPagePO.EDI_ACTIVITY_TAB);
    await io.assert.verifyElementIsDisplayed(selectors.dashboardPagePO.DOCUMENTS_AUTO_SELECTED, 'EDI dashboard did not load')

    //Open flows dashboard
    await io.homePage.clickByTextByIndex('Documents', 0);
    await io.homePage.waitForElementAttached(selectors.dashboardPagePO.FLOWS);
    await io.homePage.click(selectors.dashboardPagePO.FLOWS);
    await io.homePage.loadingTime();

    //data-test="cancelFlowRunIcon"
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.homePage.clickByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 0);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.RUN_FLOW);

    //Verify Action menu options
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.RUN_FLOW, 'Run flow option is not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.EDIT_RUN, 'Edit flow option is not displayed');
   
    //Click on Run flow
    await io.homePage.click(selectors.myAccountPagePO.RUN_FLOW);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.CANCEL_FLOW_RUN);
    await io.assert.verifyElementIsDisplayed(selectors.integrationPagePO.CANCEL_FLOW_RUN, 'Flow run is not triggered');
    await io.homePage.click(selectors.integrationPagePO.CANCEL_FLOW_RUN);
    await io.homePage.waitForElementAttached(selectors.myAccountPagePO.DIALOG_BOX);
    await io.homePage.clickByText('Cancel run');

    //Click on Edit flow
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.homePage.clickByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 0);
    await io.homePage.click(selectors.myAccountPagePO.EDIT_RUN);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.FLOW_TOGGLE, 'Edit flow page did not open');

  });
});