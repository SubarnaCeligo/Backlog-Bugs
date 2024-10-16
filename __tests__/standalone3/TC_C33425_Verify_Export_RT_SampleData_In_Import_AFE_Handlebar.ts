import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C33425_Verify_Export_RT_SampleData_In_Import_AFE_Handlebar.json";

test.describe("TC_C33425_Verify_Export_RT_SampleData_In_Import_AFE_Handlebar", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T5531 @Env-All TC_C33425_Verify_Export_RT_SampleData_In_Import_AFE_Handlebar", async ({io,page}, testInfo) => {
    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");
    await io.homePage.loadingTime();

    test.step("*** Clicking on FTP Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    test.step("*** Clicking on FTP file name handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.FILENAMEFIELD, 1);
    await io.homePage.loadingTime();
    test.step("*** Entering data in handlebar template ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{batch");

    test.step("*** Verifying Handlebar Suggestions Displayed ***", async ()=>{});
    var ele1 = page.locator(`${selectors.mappings.MAPPER2DOT0PO.TREE_ITEM} div>div>p>span`).nth(1);
    var valid1 = await ele1.textContent();
    await io.assert.expectToContainValue("batch_of_records",String(valid1), "");
    await io.homePage.loadingTime();
    var data: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("Id",data, "");
    await io.assert.expectToContainValue("IsDeleted",data, "");
    await io.assert.expectToContainValue("Title",data, "");
    await io.assert.expectToContainValue("IsPrivate",data, "");
    await io.assert.expectToContainValue("Body",data, "");
    await io.assert.expectToContainValue("CreatedDate",data, "");
    await io.assert.expectToContainValue("LastModifiedDate",data, "");
    await io.assert.expectToContainValue("SystemModstamp",data, "");

    test.step("*** Clicking on Bucket name Handlebar close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
