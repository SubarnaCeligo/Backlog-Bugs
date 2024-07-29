import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C68478 Verify 'markExportedBatchSize' is not shown in the NS export step while cloning in the Review window`, () => {
    test.afterEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "IO-34630")
        await io.homePage.clickByText('IO-34630', { exact: true });
        await io.homePage.loadingTime()
        await io.homePage.clickByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1);
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
        await io.integrationPage.click(selectors.integrationPagePO.DELETE_FLOW);
        await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
    
        //Delete integration
        await io.homePage.loadingTime();
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.DELETE_INTEGRATION);
        await io.integrationPage.click(selectors.integrationPagePO.DELETE_INTEGRATION);
        await io.integrationPage.waitForElementAttached(selectors.basePagePO.DELETE_BUTTON);
        await io.integrationPage.click(selectors.basePagePO.DELETE_BUTTON);
        await io.homePage.loadingTime();
      });
  test(`@Zephyr-IO-T17382 @Env-All C68478 Verify 'markExportedBatchSize' is not shown in the NS export step while cloning in the Review window`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    await io.flowBuilder.loadingTime();
    // install integration
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/flowbranching/C68478.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap2 = await io.api.loadConnections();
    var connId2 = connMap2.get("NETSUITE CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId2);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.loadingTime();

    // clone integration
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap3 = await io.api.loadConnections();
    var connId3 = connMap3.get("FTP CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId3);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap4 = await io.api.loadConnections();
    var connId4 = connMap4.get("NETSUITE CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId4);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);

    // create pull
    await io.flowBuilder.clickByText("Revisions");
    await io.flowBuilder.click(selectors.integrationPagePO.CREATE_PULL);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.ILM_PULL_NAME);
    await io.integrationPage.fill(selectors.integrationPagePO.ILM_PULL_NAME, "Pull Listener Changes");
    await io.integrationPage.loadingTime();
    await io.integrationPage.clickByText('IO-34630'); 
    await io.integrationPage.click(selectors.integrationPagePO.NEXT);
    await io.integrationPage.loadingTime();
    const conflicts = await page.locator(selectors.basePagePO.NOTIFICATION_ID);
    await io.assert.expectToBeTrue(await conflicts.isVisible(), 'Conflicts present')
    await io.integrationPage.click(selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();

    // delete flow
    await io.flowBuilder.clickByText("Flows");
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
