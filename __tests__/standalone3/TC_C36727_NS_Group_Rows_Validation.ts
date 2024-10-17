import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/TC_C36727_NS_Group_Rows_Validation.json";

test.describe("TC_C36727_NS_Group_Rows_Validation", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const ppExportId = flowDoc?.pageGenerators?.[0]?._exportId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/exports/" + ppExportId);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });

  test("@Zephyr-IO-T5520 @Env-All TC_C36727_NS_Group_Rows_Validation", async ({io,page}, testInfo) => {
    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(NS, "FLOWS");
    await io.homePage.loadingTime();

    test.step("*** Clicking on output filters ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.homePage.loadingTime();

    test.step("*** Validating the data without group rows checked ***", async ()=>{});
    var dataRecords: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("record",dataRecords, "");

    test.step("*** Clicking on cancel button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Clicking on export button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();

    test.step("*** Clicking on group rows checkbox ***", async ()=>{});
    await io.homePage.click(selectors.mappings.GROUP_ROWS_CHECKBOX);

    test.step("*** Clicking on Save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Clicking on output filters ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.homePage.loadingTime();

    test.step("*** Validating the data with group rows checked ***", async ()=>{});
    var dataRows: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("rows",dataRows, "");

    test.step("*** Clicking on close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
