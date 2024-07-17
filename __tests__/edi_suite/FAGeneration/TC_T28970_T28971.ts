import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S TC_T28965-Verify that user is able to save an export after configuring FA", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-36129 @Env-All @Priority-P2 @Zephyr-IO-T28970 @Zephyr-IO-T28971 Verify that user is able to save an export after configuring FA", async ({ io, page }) => {
    //Go to Exports
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "EDI_FA_DND");
    await io.homePage.clickByTextByIndex('EDI_FA_DND', 0);
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.integrationPage.click(selectors.flowBuilderPagePO.CREATEFLOW);

    //Add Export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    //Search and select an application
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
    await io.flowBuilder.click(selectors.importPagePO.FTP_IMPORT);

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    //Enter name and select connection
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
    await io.exportsPage.fill(selectors.importPagePO.NAME, 'FA Save test');

    await io.exportsPage.waitForElementAttached(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "FTP CONNECTION");
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);

    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);
    await io.exportsPage.loadingTime();

    //select EDI file
    await io.exportsPage.loadingTime();
    await io.exportsPage.click(selectors.homePagePO.EDI_PROFILE);
    await io.exportsPage.clickByTextByIndex('AA_EDI_AUTOMATION_DND', 0);

    //Select Parsing def
    await io.exportsPage.loadingTime();
    await io.exportsPage.click(selectors.homePagePO.EDI_FORMAT);
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSING_DEF_DROPDOWN);
    await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSING_DEF_DROPDOWN, 2);

    //Click the checkbox
    await io.exportsPage.click(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT);


    // Parser helper
    await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSER_HELPER, 1);
    await io.exportsPage.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

    await io.exportsPage.waitForElementAttached(selectors.basePagePO.FTP_DIRECTORY_PATH);
    await io.exportsPage.fill(selectors.basePagePO.FTP_DIRECTORY_PATH, '/test');

    //Save
    await io.exportsPage.loadingTime();
    await io.exportsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.exportsPage.loadingTime();
    await io.exportsPage.loadingTime();

    await io.flowBuilder.addStep("T28971 - Verify that FA configuration is retained after saving and reopening.")
    //reopen in edit mode data-test="Transfer"
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);

    //Verify FA checkbox is checked
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT);
    await io.assert.verifyElementAttributeContainsText(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT, 'class', 'Mui-checked');
    let selectedListener = (await io.exportsPage.getText(selectors.exportsPagePO.FA_LISTENER_DROPDOWN)).toString();

    //Verify if a listener is selected by default
    await io.assert.expectNotToBeNull(selectedListener, 'Listener is not saved');
    await io.assert.expectNotToBeValue(selectedListener, 'Please select', 'Listener is not saved');

  });
});