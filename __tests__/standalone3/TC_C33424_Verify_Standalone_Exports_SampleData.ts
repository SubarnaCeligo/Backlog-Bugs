import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as FTP from "@testData/STANDALONE/TC_C23103_FTPImport_InvalidPlaceholders.json";
import { Validations } from "@celigo/aut-validations";

test.describe("TC_C33424_Verify_Standalone_Exports_SampleData", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
    
  });
  test("@Zephyr-IO-T5530 @Env-All TC_C33424_Verify_Standalone_Exports_SampleData", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FTP);
    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    var conn = FTP.Connections[0].FTP["connectionId"];
    // if(process.env["ENVIRONMENT"] == "QA" || process.env["ENVIRONMENT"] == "qaprod") {
    //   conn = FTP.Connections[0].FTP["qa__connectionId"];
    // }

    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Entering testcase name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C33424_Verify_Standalone_Exports_SampleData");

    test.step("*** Clicking on next button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime()
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FTPDIRECTORYPATH, 1);

    test.step("*** Verifying the Sample data as expected ***", async ()=>{});

    await io.homePage.loadingTime();
    var expectedData1: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    expectedData1 = expectedData1.replace(/[\r\n ]+/g, "");
    let expectedJsonData = JSON.parse(expectedData1)
    let Validation1 = new Validations();
    var response1 = await Validation1.validateJSONData(FTP.ExpectedData, expectedJsonData);

    await io.assert.expectToContainValue("passed",response1["overallStatus"], "");

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
/*
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILENAMESTARTSWITH, 1);

    test.step("*** Verifying the Sample data as expected ***", async ()=>{});

    await io.homePage.loadingTime();
    var expectedData2: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    expectedData2 = expectedData2.replace(/[\r\n ]+/g, "");
    let Validation2 = new Validations();
    var response2 = await Validation2.validateJSONData(FTP.ExpectedData, JSON.parse(expectedData2)
    );

    await io.assert.expectToContainValue("passed",response2["overallStatus"], "");

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Clicked on close ***", async ()=>{});

    
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILENAMEENDSWITH, 1);

    test.step("*** Verifying the Sample data as expected ***", async ()=>{});

    await io.homePage.loadingTime();
    var expectedData3: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    expectedData3 = expectedData3.replace(/[\r\n ]+/g, "");
    let Validation3 = new Validations();
    var response3 = await Validation3.validateJSONData(FTP.ExpectedData, JSON.parse(expectedData3)
    );

    await io.assert.expectToContainValue("passed",response3["overallStatus"], "");
   
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Clicked on close ***", async ()=>{});
    */

    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicked on Advanced dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.BACKUPFILESPATH, 1);

    test.step("*** Verifying the Sample data as expected ***", async ()=>{});

    await io.homePage.loadingTime();
    var expectedData4: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    expectedData4 = expectedData4.replace(/[\r\n ]+/g, "");
    let Validation4 = new Validations();
    var response4 = await Validation4.validateJSONData(FTP.ExpectedData, JSON.parse(expectedData4)
    );

    await io.assert.expectToContainValue("passed",response4["overallStatus"], "");

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
