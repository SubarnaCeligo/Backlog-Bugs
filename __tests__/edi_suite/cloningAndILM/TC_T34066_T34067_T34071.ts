import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FDR from "@testData/edi_suite/FDR.json"

test.describe("@Author-Shriti S Verify proper error message is shown when trying to update the export with random fileDefinitions", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("@Env-All @Epic-IO-59196 @Priority-P2 @Zephyr-IO-T34066 @Zephyr-IO-T34067 @Zephyr-IO-T34071 Verify proper error message is shown when trying to update the export with random fileDefinitions", async ({ io, page }) => {
    //Go to Home Page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);


    await io.homePage.addStep("@Zephyr-IO-T34067 - Verify able to clone an integration containing FA listener flow and FTP/AS2 EDI flow in Production")
    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FA_CloneTest_DND");
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);

    //Clone the integration
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.loadingTime();

    //Input name
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT,'FACloneTest_ToBeDeleted');

    //Clone
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON);
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON);

    //Configure connection
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.CONFIGURE);
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.homePage.loadingTime();
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);

    //Save
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.INSTALL);
    await io.homePage.click(selectors.basePagePO.INSTALL);

    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);

    //Open cloned flow
    await io.flowBuilder.clickByText('MainFlow_DND');

    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_GENERATORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_GENERATORS);

    //Open parser helper
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSER_HELPER);
    await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSER_HELPER, 1);
    await io.homePage.loadingTime();
    
     // Locate the textarea
    const textarea = await page.$(selectors.flowBuilderPagePO.RULE);

    if (textarea) {
    // Click the textarea to focus on it
    await textarea.click();

    // Select all text and delete it
    await io.homePage.loadingTime();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    }
    //Add new FDR
    await io.homePage.loadingTime();
    await io.exportsPage.fill(selectors.flowBuilderPagePO.FDR_TEXTAREA, JSON.stringify(FDR));
    await io.exportsPage.clickByText('Save & close');

    //wait for export main page:
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
    await io.exportsPage.clickByText('Save & close');

    await io.exportsPage.waitForElementAttached(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    let errorMessage = (await io.exportsPage.getText(selectors.flowGroupingPagePO.ALERT_MESSAGE)).toString();
    await io.assert.expectToContainValue('Please provide a valid _id.', errorMessage, "Error message not displayed for invalid FDR ID");

    await io.homePage.loadingTime();

    await io.homePage.addStep("@Zephyr-IO-T34067 - Verify that multiple attempts to save the EDI export with random FDR is unsuccessful");

    //Save multiple times and verify that error is thrown every time
    // #2
    await io.exportsPage.clickByText('Save & close');

    await io.exportsPage.waitForElementAttached(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    errorMessage = (await io.exportsPage.getText(selectors.flowGroupingPagePO.ALERT_MESSAGE)).toString();
    await io.assert.expectToContainValue('Please provide a valid _id.', errorMessage, "Error message not displayed for invalid FDR ID");

    await io.homePage.loadingTime();
    //#3
    await io.exportsPage.clickByText('Save & close');

    await io.exportsPage.waitForElementAttached(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    errorMessage = (await io.exportsPage.getText(selectors.flowGroupingPagePO.ALERT_MESSAGE)).toString();
    await io.assert.expectToContainValue('Please provide a valid _id.', errorMessage, "Error message not displayed for invalid FDR ID");

    await io.homePage.loadingTime();
    
  });

  test.afterEach(async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "FACloneTest_ToBeDeleted");
    await io.homePage.loadingTime();

    await io.homePage.clickByTextByIndex('FACloneTest_ToBeDeleted', 0);
    await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);
    await io.homePage.loadingTime();

    //Delete the flows inside the integration
    await io.integrationPage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 2);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    
    await io.homePage.loadingTime();
    await io.integrationPage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);

    //Delete cloned integration
    await io.homePage.loadingTime();
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.integrationPage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
    await io.integrationPage.waitForElementAttached(selectors.basePagePO.DELETE_BUTTON);
    await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

  });

});