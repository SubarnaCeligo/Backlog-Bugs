import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/HTTP2DOT0/TC_IO-T35107.json";

test.describe(`@Author_MaheshNivruttiSutar @Zephyr-T35105 @Zephyr-IO-T35101 @Zephyr-IO-T35106 @Zephyr-IO-T35107`, () => {
  test.afterEach(async ({ io, page }) => {
    let intId = await io.api.getIntegrationDetails("IO-T35096_NSAW_Delete", "_id");
    await io.api.deleteIntegration(intId);
  });
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test(`@Epic-IO-76800 @Priority-P2 @Env-All @Zephyr-IO-T35105 `, async ({ page, io }) => {
    await io.homePage.navigateTo(`${io.data.links.HOME_PAGE_URL}/installIntegration`);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.homePage.addStep(
      "Navigated to install integration page (/home/installIntegration)"
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/Templates/IO-T35096.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickByTextByIndex("NETSUITE ANALYTICS WAREHOUSE CONNECTION", 1);
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("IO-T35096 NSAW FLOW");
    await io.homePage.addStep(
      "*** Verified user should be able to install the flow with NSAW imports with `Use optimized bulk load` option selected ****"
    );

    //Clone flow
    await io.homePage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("Clone flow");
    await io.flowBuilder.click(selectors.integrationPagePO.SELECT_DESTINATION_INTEGRATION);
    await io.flowBuilder.selectTextfromDropDown(page, "none");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickByTextByIndex("NETSUITE ANALYTICS WAREHOUSE CONNECTION", 1);
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await io.homePage.addStep(
      "*** Verified user should be able to clone the flow with NSAW imports with `Use optimized bulk load` option selected ****"
    );
    await io.flowBuilder.clickByTextByIndex("Clone - IO-T35096 NSAW FLOW", 0);
    await io.assert.verifyElementDisplayedByText("Clone - IO-T35096 NSAW FLOW", "Flow is not clonned successfully");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.deleteFlow();
  });
  test(`@Epic-IO-76800 @Priority-P2 @Env-All @Zephyr-IO-T35101 @Zephyr-IO-T35106`, async ({ page, io }) => {
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.loadingTime();

    //ADD IMPORT
    await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'NSAW');
    await io.flowBuilder.click(selectors.connectionsPagePO.NSAW_CONNECTION);
    await io.myAccountPage.clickByText("Import records into destination application");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.importsPage.fill(selectors.importPagePO.NAME_INPUT, "NSAW IMPORT");
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE ANALYTICS WAREHOUSE CONNECTION');
    await io.flowBuilder.clickByText("NETSUITE ANALYTICS WAREHOUSE CONNECTION");
    await io.flowBuilder.loadingTime();


    ///IO-T35101 Verify the search for Destination table
    await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_INPUT, "ADMIN.ALLDATATYPES3");
    const text = await io.flowBuilder.isVisible('text="ALLDATATYPES3"');
    await io.assert.expectToBeTrue(text, "ALLDATATYPES3 is not displayed.");
    await io.connectionPage.addStep("**** Verified When user focuses on the search box the dropdown will be visible it will start showing results in desination table dropdown with search text highlighted  ****");
    await io.homePage.click(selectors.importPagePO.MARIADB_INSERT_BULK);
    await io.flowBuilder.loadingTime();

    //IO-T35106 Verify if user is able to navigate to AFE editor if clicks handle bar expression besides destination table refresh icon
    await io.homePage.click(selectors.importPagePO.DESTINATION_TABLE_EDITOR);
    const text1 = await io.flowBuilder.isVisible('text="Build destination table"');
    await io.assert.expectToBeTrue(text1, "Build destination table is not displayed.");
    await io.connectionPage.addStep("**** Verified user should be able to navigate to AFE editor when clicks on handlebar expression icon besides refresh icon in Destination table field  ****");
  });
  test(`@Epic-IO-76800 @Priority-P2 @Env-All @Zephyr-IO-T35107`, async ({ page, io }) => {
    //IO-T35107 Verify the handlebar expressions are working as expected in destination table field
    await io.createResourceFromAPI(TC, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 180000 });
    let success = await page.$$(selectors.flowBuilderPagePO.ERROR_BUBBLE)
    for (let i = 0; i < success.length; i++) {
      let msg = await success[i].textContent()
      await expect(msg).toEqual("Success")
    }
  });
});