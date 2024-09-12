import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C36726_Verify_DBImport_QueryBuilder_Sample_Data.json";

test.describe("TC_C36726_Verify_DBImport_QueryBuilder_Sample_Data", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5519 @Env-All TC_C36726_Verify_DBImport_QueryBuilder_Sample_Data", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");

    await io.homePage.loadingTime();
    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();

    test.step("*** Clicking on SQL Query handlebar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);

    await io.homePage.loadingTime();

    test.step("*** Verifying Sample data ***", async ()=>{});

    await io.homePage.loadingTime();
    var expectedData1: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("subject",expectedData1, "");
    await io.assert.expectToContainValue("description",expectedData1, "");

    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    test.step("*** Clicking on SQL Import close butoon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);

    test.step("*** Clicking on FTP export butoon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.FILE_JSON_RESOURCE_PATH);
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.FILE_JSON_RESOURCE_PATH, 'tickets[*].tags');

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);

    test.step("*** Clicking on FTP Export save and close butoon ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();

    test.step("*** Clicking on SQL Query handlebar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);
    await io.homePage.loadingTime();

    test.step("*** Verifying Sample data test.afterEach changing in export ***", async ()=>{});

    var expectedData2: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("tag1",expectedData2, "");
    await io.assert.expectToContainValue("tag2",expectedData2, "");

    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);

    await io.homePage.click(selectors.basePagePO.HOME);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
