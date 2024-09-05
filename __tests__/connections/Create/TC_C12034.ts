import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C12034_Verify Import and load the export which has 4000+ audit records_`, () => {
  test(`@Env-All @Zephyr-IO-T3666 C12034_Verify Import and load the export which has 4000+ audit records UI_Backlog`, async ({ io, page }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C12034_Flow_DND');
    await io.homePage.clickByText("TC_C12034_Flow_DND");
    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.clickByText("Clone flow");
    //Input name
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT,'Clone - TC_C12034_Flow');

    await io.flowBuilder.clickByText("Please select");
    const intID = await io.api.loadIntegrations();
    await io.flowBuilder.selectTextfromDropDown(page, intID.get('Automation Flows'))
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    //Configure connection-1
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.CONFIGURE);
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.homePage.loadingTime();
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("S3 CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);
    //Save
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();

    //Configure connection-2
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.CONFIGURE);
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.homePage.loadingTime();
    let connMap2 = await io.api.loadConnections();
    var connId2 = connMap2.get("TC_C12034_Connection_DND");
    await io.connectionPage.selectTextfromDropDown(page, connId2);
    //Save
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();

    //Install
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.INSTALL);
    await io.homePage.click(selectors.basePagePO.INSTALL);
    
    await io.flowBuilder.clickByText("Last updated");
    await io.flowBuilder.loadingTime();
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - TC_C12034_Flow');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Clone - TC_C12034_Flow", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
    await waitForCompletionStatus(page, selectors);
    async function waitForCompletionStatus(page, selectors) {
      const completedStatusSelector = `${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`;
      const completedStatusElement = await page.waitForSelector(completedStatusSelector, { timeout: 60000 }).catch(() => null);
      if (completedStatusElement) {
        let completedStatusExport = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
        await test.step("C12034", async () => {
          if (completedStatusExport == 'Completed') {
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
            expect(successStatus).toEqual('Success');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(0).textContent();
            expect(successCount).toEqual('4000');
          }
        });
      } else {
        await waitForCompletionStatus(page, selectors);
      }
    }
    //verify success count and run status for import
    let completedStatusImport = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(1).textContent();
    expect(completedStatusImport).toEqual('Completed');
    if (completedStatusImport == 'Completed') {
      let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(1).textContent();
      expect(successStatus).toEqual('Success');
      let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(1).textContent();
      expect(successCount).toEqual('4000');
    }
    // });
  });
})
