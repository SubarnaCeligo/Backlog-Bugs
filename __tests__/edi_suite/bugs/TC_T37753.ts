import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Zephyr-IO-T37753 Verify an E2E flow with new Generator definition dropdown changes for Generic connectors(FTP,AS2,VAN)", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Priority-P2 @Zephyr-IO-T37753 Verify an E2E flow with new Generator definition dropdown changes for Generic connectors(FTP IMPORT)", async ({ io, page }) => {
    // Go to Flow Builder
    await io.homePage.goToMenu("Tools", "Flow builder");

    // Add Import
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    // Search and select an application
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.FTP_IMPORT);
    await io.flowBuilder.click(selectors.importPagePO.FTP_IMPORT);
   

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    // Enter name and select connection
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
    await io.exportsPage.fill(selectors.importPagePO.NAME, 'FA Save test');
    await io.exportsPage.loadingTime();

    await io.exportsPage.waitForElementAttached(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.exportsPage.fill(selectors.basePagePO.CONNECTION_DROPDOWN, "FTP CONNECTION");
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.loadingTime();

    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);

    // select EDI file
    await io.exportsPage.click(selectors.homePagePO.EDI_PROFILE);
    await io.exportsPage.clickByTextByIndex('AA_EDI_AUTOMATION_DND', 0);

    await io.exportsPage.click(selectors.homePagePO.EDI_FORMAT);
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS);

    await io.homePage.loadingTime();

    let isLabelDisplayed = await io.exportsPage.isVisible("text='Generic'");
    await io.assert.expectToBeTrue(isLabelDisplayed, "Parsing Definition label is not displayed");
    
    let options = (await io.importsPage.getText(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS)).toString();
    await io.assert.expectToContainValue('Generic-', options, 'Parsing Definition optiond are not displayed');
  });

  test("@Env-All @Priority-P2 @Zephyr-IO-T37753 Verify an E2E flow with new Generator definition dropdown changes for Generic connectors(FTP EXPORT)", async ({ io, page }) => {
    //Go to Flow Builder
    await io.homePage.goToMenu("Tools", "Flow builder");

    //Add Export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ftp');
    await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    await io.flowBuilder.clickByTextByIndex('FTP CONNECTION', 0);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.loadingTime();

    await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
    await io.exportsPage.click(selectors.connectionsPagePO.FILE_DEFINITION);

    // select EDI file
    await io.exportsPage.click(selectors.homePagePO.EDI_PROFILE);
    await io.exportsPage.clickByTextByIndex('AA_EDI_AUTOMATION_DND', 0);

    await io.exportsPage.click(selectors.homePagePO.EDI_FORMAT);
    await io.exportsPage.loadingTime();
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS);

    await io.homePage.loadingTime();
    
    let isLabelDisplayed = await io.importsPage.isVisible("text='Generic'");
    await io.assert.expectToBeTrue(isLabelDisplayed, "Parsing Definition label is not displayed");

    let options = (await io.importsPage.getText(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS)).toString();
    await io.assert.expectToContainValue('Generic-', options, 'Parsing Definition optiond are not displayed');


  });
});