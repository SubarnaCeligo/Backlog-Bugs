import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Zephyr-IO-T37752 Verify an E2E flow with new Generator definition dropdown changes for Generic connectors(FTP,AS2,VAN)", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Priority-P2 @Zephyr-IO-T37752 Verify an E2E flow with new Generator definition dropdown changes for Generic connectors(AS2 EXPORT)", async ({ io, page }) => {
    // Go to Flow Builder
    await io.homePage.goToMenu("Tools", "Flow builder");

    // Add Export
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'AS2');
    await io.homePage.click(selectors.connectionsPagePO.AS2_CONNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText('AS2 CONNECTION');
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'AS2_Export');

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
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSING_DEF_DROPDOWN);

    await io.homePage.loadingTime();

    let isLabelDisplayed = await io.exportsPage.isVisible("text='Generic'");
    await io.assert.expectToBeTrue(isLabelDisplayed, "Parsing Definition label is not displayed");

    let options = (await io.importsPage.getText(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS)).toString();
    await io.assert.expectToContainValue('Generic-', options, 'Parsing Definition options are not displayed');

  });


  test("@Env-All @Priority-P2 @Zephyr-IO-T37752 Verify an E2E flow with new Generator definition dropdown changes for Generic connectors(AS2 IMPORT)", async ({ io, page }) => {
    // Go to Flow Builder
    await io.homePage.goToMenu("Tools", "Flow builder");

    // Add Import
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL)
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'AS2');
    await io.homePage.click(selectors.connectionsPagePO.AS2_CONNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText('AS2 CONNECTION');
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'AS2_Import');

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
    await io.exportsPage.waitForElementAttached(selectors.exportsPagePO.PARSING_DEF_DROPDOWN);

    await io.homePage.loadingTime();
    
    let isLabelDisplayed = await io.importsPage.isVisible("text='Generic'");
    await io.assert.expectToBeTrue(isLabelDisplayed, "Parsing Definition label is not displayed");

    let options = (await io.importsPage.getText(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS)).toString();
    await io.assert.expectToContainValue('Generic-', options, 'Parsing Definition optiond are not displayed');

  });
});