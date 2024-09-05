
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_36434_Verify_Preview_inDeltaLookUP.json";
import Shoify from "@testData/STANDALONE/TC_C2588_HTTP_Shopify_Delta.json";

test.describe("TC_36434_Verify_Preview_inDeltaLookUP", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T9915 TC_36434_Verify_Preview_inDeltaLookUP", async ({io,page}, testInfo) => {
    // *Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    var exportValidation = await io.pageGenerator("Allure", HTTP);
    await io.homePage.loadingTime();
    
    var conn = Shoify["shopify_connectionId"];

    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Lookup");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    test.step("*** writing the Relative URL ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/orders.json?updated_at={{lastExportDateTime}}");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "delta");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired Shopify connection ***", async ()=>{});
    
    test.step("*** Verifying whether the proper drop-down selected or not ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Preview button ***", async ()=>{});

    var PreviewRecord = await io.homePage.getTextFromElement(selectors.importPagePO.PREVIEWDATA, "orders");

    await io.assert.expectToBeTrue(PreviewRecord, "");
    test.step("*** Verifying Preview should be working fine & Not showing any error msg ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Export Saved and closed", async ()=>{});
  });
});
