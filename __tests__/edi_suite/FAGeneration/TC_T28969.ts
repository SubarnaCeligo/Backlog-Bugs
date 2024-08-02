import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S TC_T28969-Verify the FA listener dropdown when there are no FA listeners in the integration.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Epic-IO-36129 @Env-All @Priority-P2 @Zephyr-IO-T28969 Verify the FA listener dropdown when there are no FA listeners in the integration.", async ({ io, page }) => {
    //Go to Exports
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //search for the integration
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "EDI_FA_No_Listeners_DND");
    await io.homePage.clickByTextByIndex('EDI_FA_No_Listeners_DND', 0);
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.integrationPage.click(selectors.flowBuilderPagePO.CREATEFLOW);

    //Add Export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    //Search and select an application
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
    await io.exportsPage.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.FTP_IMPORT);

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.loadingTime();
    await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);

    //select EDI file
    await io.exportsPage.click(selectors.homePagePO.EDI_PROFILE);
    await io.exportsPage.loadingTime();
    await io.exportsPage.clickByTextByIndex('AA_EDI_AUTOMATION_DND', 0);

    //Select Parsing def
    await io.exportsPage.click(selectors.homePagePO.EDI_FORMAT);
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSING_DEF_DROPDOWN);
    await io.exportsPage.clickByIndex(selectors.exportsPagePO.PARSING_DEF_DROPDOWN, 0);
    await io.exportsPage.loadingTime();

    //Click the checkbox
    await io.exportsPage.click(selectors.exportsPagePO.FA_ACKNOWLEDGEMENT);
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.FA_LISTENER_DROPDOWN);
    let selectedListener = (await io.exportsPage.getText(selectors.exportsPagePO.FA_LISTENER_DROPDOWN)).toString();

    //Verify if a listener is selected by default
    await io.assert.expectToBeValue(selectedListener, 'Please select','Listener dropdown is not empty' );
    
  });
});