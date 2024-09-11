import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C34941_Verify_AFE_toggles_REST_Import.json";

test.describe("TC_C34941_Verify_AFE_toggles_REST_Import", () => {
  let flowId: any;

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    io.api.deleteFlowViaAPI(flowId)

    // Delete the pp import
    await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'AutomationStandalone_');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

    // Delete the pg export
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'AutomationStandalone_');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5570 @Env-All TC_C34941_Verify_AFE_toggles_REST_Import", async ({io,page}, testInfo) => {
    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");

    test.step("*** Clicking on created Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    test.step("*** Clicking on Advance  ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on Concurrency ID handlebar  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CONCURRENCYHANDLEBAR);
    test.step("*** Verifying the AFE toggles in Concurrency ID  ***", async ()=>{});
    var conc1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(conc1, "");
    var conc2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(conc2, "");
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Clicking on Data URI handlebar  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.DATAURIHANDLEBAR);
    test.step("*** Verifying the AFE toggles in Data URI  ***", async ()=>{});
    var data = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(data, "");
    var data1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(data1, "");
    test.step("*** Closing the import  ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
