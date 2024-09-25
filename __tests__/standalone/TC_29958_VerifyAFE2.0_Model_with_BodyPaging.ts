
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import Square from "@testData/STANDALONE/TC_29958_VerifyAFE2.0_Model_with_BodyPaging.json";

test.describe("TC_29958_VerifyAFE2.0_Model_with_BodyPaging", () => {

  var exportId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test.afterEach(async ({io,page}, testInfo) => {
    await io.api.deleteExportViaAPI(exportId);
    test.step("*** Deleting resources ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T9927 TC_29958_VerifyAFE2.0_Model_with_BodyPaging", async ({ io, page }, testInfo) => {

    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(Square);
    console.log("flows asdasdasdasd ", flows.get('exportId'));
    await test.step("*** Created Export :" + flows.get('exportId0'),async ()=>{});
    exportId = flows.get('exportId0');
    
    await io.exportsPage.navigateTo(`${io.data.links.EXPORTS_PAGE_URL}/edit/exports/${exportId}`)
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.isVisible(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.homePage.click(selectors.importPagePO.HTTP_RELATIVEURI);
    test.step("*** Clicking On Relative Url ***", async () => { });
    await io.homePage.loadingTime();
    var paste = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("previous_page", String(paste), "");
    await io.assert.expectToContainValue("full_response", String(paste), "");
    await io.assert.expectToContainValue("connection", String(paste), "");
    await io.assert.expectToContainValue("export", String(paste), "");
    await io.assert.expectToContainValue("settings", String(paste), "");
    test.step("***  Verified Model Format in AFE 2.0 For Body Paging in Relative URI  ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("***  Closing Relative URI Page  ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isVisible(selectors.exportsPagePO.HTTP_BODY);
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Clicking On Request Body ***", async () => { });
    await io.homePage.loadingTime();
    var paste1 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("previous_page", paste1, "");
    await io.assert.expectToContainValue("full_response", paste1, "");
    await io.assert.expectToContainValue("connection", paste1, "");
    await io.assert.expectToContainValue("export", paste1, "");
    await io.assert.expectToContainValue("settings", paste1, "");
    test.step("***  Verified Model Format in AFE 2.0 For Body Paging in Http Request Body   ***", async () => { });
  });
});
