import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C34944_FTP_Export_DataURI_AFE_toggles_validation.json";

test.describe("TC_C33769_Verify_Sample_data_Transforms_with_UnsavedChanges", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5534 @Env-All TC_C33769_Verify_Sample_data_Transforms_with_UnsavedChanges", async ({io,page}, testInfo) => {
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.pageGenerator( "Alure",FTP);

    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    test.step("*** Verifying sample data in transfeorms ***", async ()=>{});
    var data = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("Drug @ Name",data, "");
    await io.assert.expectToContainValue("Naproxen and Esomeprazole Magnesium",data, "");
    await io.assert.expectToContainValue("#Number",data, "");
    await io.assert.expectToContainValue("6495195850",data, "");

    test.step("*** Closing the transform rules ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Clicking on created export***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    test.step("*** Changing the sample data***", async ()=>{});
    const map = new Map();
    const filepath3 = FTP.testData;
    map.set("uploadFile", filepath3);
    await io.homePage.fileUpload(map);
    await io.homePage.loadingTime()
    test.step("*** Discarding the changes***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    test.step("*** Verifying sample data in transfeorms ***", async ()=>{});
    var data1 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("Drug @ Name",data1, "");
    await io.assert.expectToContainValue("Naproxen and Esomeprazole Magnesium",data1, "");
    await io.assert.expectToContainValue("#Number",data1, "");
    await io.assert.expectToContainValue("6495195850",data1, "");
    test.step("*** Closing the transform rules ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
