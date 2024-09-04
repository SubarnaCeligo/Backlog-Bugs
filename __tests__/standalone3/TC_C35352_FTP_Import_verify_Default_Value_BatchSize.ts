import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C35352_FTP_Verify_Default_BatchSize.json";

test.describe("TC_C35352 Validating Default Batch Size field in FTP", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    io.api.deleteFlowViaAPI(flowId)

    // Delete the  export
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

    // Delete the import
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

  });

  test("@Zephyr-IO-T11715 @Env-All TC_C35352_FTP_Verify_Default_BatchSize", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");

    test.step("*** Clicking FTP Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    await io.homePage.click(selectors.flowBuilderPagePO.BATCHSIZE);
    test.step("*** Clicked on batch size ***", async ()=>{});

    var ele = await page.locator(selectors.flowBuilderPagePO.BATCHSIZE);
    
    const batchSizeValidation = await ele.getAttribute("value");

    await expect(batchSizeValidation).toEqual("");
    test.step("*** Batch Size default value is blank ***", async ()=>{});
  });
});
