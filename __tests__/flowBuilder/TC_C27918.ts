import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C27918", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2849|", async ({ io, page }) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    test.step("Clicked on Connecions inside resource.", async () => { });
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await io.homePage.loadingTime();
    test.step("Clicked on Create connecion.", async () => { });
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await test.step(
      "Selected FTP as application and connection page opened."
      , async () => { });
    await io.homePage.loadingTime();
    var connectionCustom = await io.homePage.isVisible(
      selectors.basePagePO.CUSTOM_SETTING
    );
    expect(connectionCustom).toBeFalsy();
    await test.step(
      "While creating a new connection Custom settings secton is not present."
      , async () => { });
    await io.homePage.click(
      selectors.importPagePO.IMPORT_CLOSE_DRAWER
    );
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    test.step("Clicked on Exports inside resource.", async () => { });
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("Clicked on Create export.", async () => { });
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    test.step("Searched for FTP.", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FTP);
    await io.homePage.loadingTime();
    test.step("Selected FTP from the list.", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "FTP CONNECTION");
    test.step("Selected the FTP connection from dropdown.", async () => { });
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "sample export"
    );
    test.step("Fill the name.", async () => { });
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await io.homePage.loadingTime();
    await test.step(
      "Click on next button and open the export page."
      , async () => { });
    var exportCustom = await io.homePage.isVisible(
      selectors.basePagePO.CUSTOM_SETTING
    );
    expect(exportCustom).toBeFalsy();
    await test.step(
      "While creating a new Export Custom settings secton is not present."
      , async () => { });
    await io.homePage.click(
      selectors.importPagePO.IMPORT_CLOSE_DRAWER
    );
    //Imports
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Imports");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("Clicked on Create import.", async () => { });

    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "FTP CONNECTION");
    test.step("Selected the FTP connection from dropdown.", async () => { });
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "sample import"
    );
    test.step("Fill the name.", async () => { });
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await test.step(
      "Click on next button and open the import page."
      , async () => { });
    await io.homePage.loadingTime();
    var importCustom = await io.homePage.isVisible(
      selectors.basePagePO.CUSTOM_SETTING
    );
    expect(importCustom).toBeFalsy();
    await test.step(
      "While creating a new Import Custom settings secton is not present."
      , async () => { });
    await io.homePage.click(
      selectors.importPagePO.IMPORT_CLOSE_DRAWER
    );

    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("Go to Home page.", async () => { });
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    test.step("Click on Create integration.", async () => { });
    var integrationCustom = await io.homePage.isVisible(
      selectors.basePagePO.CUSTOM_SETTING
    );
    expect(integrationCustom).toBeFalsy();
    await test.step(
      "While creating a new Integration Custom settings secton is not present."
      , async () => { });
    await io.homePage.click(
      selectors.importPagePO.IMPORT_CLOSE_DRAWER
    );

    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    test.step("Go inside Integration page.", async () => { });
    await io.flowBuilder.clickCreateFlowButton();
    test.step("Click on create Flow.", async () => { });
    await io.homePage.loadingTime();
    var flowCustom = await io.homePage.isVisible(
      selectors.basePagePO.CUSTOM_SETTING
    );
    expect(flowCustom).toBeFalsy();
    await test.step(
      "While creating a new Flow Custom settings secton is not present."
      , async () => { });
  });
});
