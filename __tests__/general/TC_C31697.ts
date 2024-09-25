import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C31697 from "@testData/GENERAL/TC_C31697.json";

test.describe("TC_C31697", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2288 @Env-All  TC_C31697 Verify Hyperlinks are inaccessible which doesn't belongs to the whitelisted domains", async ({io,page}, testInfo) => {
    var createExport1,
      createExport2,
      createExport3,
      createExport4,
      createExport5,
      createExport6,
      createExport7;
    
      createExport1 = await io.createExportViaApi(TC_C31697[0].qaexportDoc1);
      createExport2 = await io.createExportViaApi(TC_C31697[0].qaexportDoc2);
      createExport3 = await io.createExportViaApi(TC_C31697[0].qaexportDoc3);
      createExport4 = await io.createExportViaApi(TC_C31697[0].qaexportDoc4);
      createExport5 = await io.createExportViaApi(TC_C31697[0].qaexportDoc5);
      createExport6 = await io.createExportViaApi(TC_C31697[0].qaexportDoc6);
      createExport7 = await io.createExportViaApi(TC_C31697[0].qaexportDoc7);
 
    await io.homePage.navigateTo(io.connectorUrl + "exports");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
     
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON)
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, TC_C31697[0].qaexportDoc1.name);
    await io.homePage.clickByTextByIndex(TC_C31697[0].qaexportDoc1.name,0);
    var hrefexist1 = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    await await io.assert.expectToBeTrue(hrefexist1, "");

  await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.connectorUrl + "exports");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON)
    await io.homePage.fillWebPage(  selectors.flowBuilderPagePO.SEARCHBUTTON,  TC_C31697[0].qaexportDoc2.name);
    await io.homePage.clickByTextByIndex(TC_C31697[0].qaexportDoc2.name,0);
    var hrefexist2 = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    await await io.assert.expectToBeTrue(hrefexist2, "");

    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.connectorUrl + "exports");
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON)
    await io.homePage.fillWebPage(  selectors.flowBuilderPagePO.SEARCHBUTTON, TC_C31697[0].qaexportDoc3.name);
    await io.homePage.clickByTextByIndex(TC_C31697[0].qaexportDoc3.name,0);
    var hrefexist3 = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    await await io.assert.expectToBeTrue(hrefexist3, "");

    await io.homePage.navigateTo(io.connectorUrl + "exports");
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON)
    await io.homePage.fillWebPage(  selectors.flowBuilderPagePO.SEARCHBUTTON, TC_C31697[0].qaexportDoc4.name);
    await io.homePage.clickByTextByIndex(TC_C31697[0].qaexportDoc4.name,0);
    var hrefexist4 = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    await await io.assert.expectToBeTrue(hrefexist4, "");

    await io.homePage.navigateTo(io.connectorUrl + "exports");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON)
    await io.homePage.fillWebPage(  selectors.flowBuilderPagePO.SEARCHBUTTON, TC_C31697[0].qaexportDoc5.name);
    await io.homePage.clickByTextByIndex(TC_C31697[0].qaexportDoc5.name,0);
    var hrefexist5 = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    await await io.assert.expectToBeTrue(hrefexist5, "");

    await io.homePage.navigateTo(io.connectorUrl + "exports");
    await io.homePage.isPageLoaded();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON)
    await io.homePage.fillWebPage(  selectors.flowBuilderPagePO.SEARCHBUTTON, TC_C31697[0].qaexportDoc6.name);
    await io.homePage.clickByTextByIndex(TC_C31697[0].qaexportDoc6.name,0);
    var hrefexist6 = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    await await io.assert.expectToBeTrue(hrefexist6, "");

    await io.homePage.navigateTo(io.connectorUrl + "exports");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON)
    await io.homePage.fillWebPage(  selectors.flowBuilderPagePO.SEARCHBUTTON, TC_C31697[0].qaexportDoc7.name);
    await io.homePage.clickByTextByIndex(TC_C31697[0].qaexportDoc7.name,0);
    var hrefexist7 = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    await await io.assert.expectToBeTrue(hrefexist7, "");

    await io.api.deleteExportViaAPI(createExport1._id);
    await io.api.deleteExportViaAPI(createExport2._id);
    await io.api.deleteExportViaAPI(createExport3._id);
    await io.api.deleteExportViaAPI(createExport4._id);
    await io.api.deleteExportViaAPI(createExport5._id);
    await io.api.deleteExportViaAPI(createExport6._id);
    await io.api.deleteExportViaAPI(createExport7._id);
  });
});
