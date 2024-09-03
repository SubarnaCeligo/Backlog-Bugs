import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34942_Verify_Http_Standalone_Import_AFE_DataURI_Concurrency", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5571 @Env-All TC_C34942_Verify_Http_Standalone_Import_AFE_DataURI_Concurrency", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Creating an Import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

    test.step("*** Selecting Http adapter ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);

    test.step("*** Choosing the desired Http connection ***", async ()=>{});
    await io.homePage.loadingTime()
     
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    test.step("*** Entering the Import Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "C34942 Import");
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on Advance  ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on Concurrency ID handlebar  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CONCURRENCYHANDLEBAR);
    test.step("*** Verifying the AFE toggles in Concurrency ID  ***", async ()=>{});
    var conc1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(conc1).toBeFalsy();
    var conc2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(conc2).toBeFalsy();
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    test.step("*** Clicking on Data URI handlebar  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.DATAURIHANDLEBAR);
    test.step("*** Verifying the AFE toggles in Data URI  ***", async ()=>{});
    var data = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await expect(data).toBeFalsy();
    var data1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await expect(data1).toBeFalsy();
    test.step("*** Closing the import  ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE,1);
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
