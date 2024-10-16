import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C51401_C51402_C51403.json";

test.describe("TC_C51401_C51402_C51403", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T5630 @Zephyr-IO-T5631 @Zephyr-IO-T5632 @Env-All TC_C51401_C51402_C51403", async ({io,page}, testInfo) => {
    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");
    await io.homePage.loadingTime();

    //**** TC_C51401 ****//
    test.step("*** Clicking FTP Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "json");

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FTPDIRECTORYPATH, 1);
    test.step("*** Clicking Directory path Handlebar ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{batch_of_records.0.record.fileMeta.fileName}}");
    test.step("*** Entering data in Directory path ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    var AFE1Data = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("sampleFileName",String(AFE1Data), "");
    test.step("***Validating the AFE output data ***", async ()=>{});

    test.step("*** Changing input data ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('{"batch_of_records": [{"record": {"fileMeta": {"fileName": "newName"}}}]}');
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    var AFE1Data = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("newName",String(AFE1Data), "");
    test.step("***Validating the AFE output data ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing Directory path handlers  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});

    //**** TC_C51402 ****//
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILENAMEFIELD, 1);
    test.step("***Clicked on filename  Handlebars ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{batch_of_records.0.record.fileMeta.fileName}}");
    test.step("*** Entering data in Filename Handlebar ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var AFE1Datatwo = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("sampleFileName",String(AFE1Datatwo), "");
    test.step("***Validating the AFE output data ***", async ()=>{});

    test.step("*** Changing input data ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('{"batch_of_records": [{"record": {"fileMeta": {"fileName": "newName"}}}]}');
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    var AFE1Data = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("newName",String(AFE1Data), "");
    test.step("***Validating the AFE output data ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing Directory path handlers  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});

    //**** TC_C51403 ****//
    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** Clicking on Backup Files path handler ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.BACKUPFILESPATH, 1);
    test.step("***Clicked on Backupfiles  Handlebars ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{batch_of_records.0.record.fileMeta.fileName}}");
    test.step("*** Entering data in Backupfiles  Handlebars ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var AFE1Datathree = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("sampleFileName",String(AFE1Datathree), "");
    test.step("***Validating the AFE output data ***", async ()=>{});

    test.step("*** Changing input data ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('{"batch_of_records": [{"record": {"fileMeta": {"fileName": "newName"}}}]}');
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    var AFE1Data = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("newName",String(AFE1Data), "");
    test.step("***Validating the AFE output data ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing Directory path handlers  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});
  });
});
