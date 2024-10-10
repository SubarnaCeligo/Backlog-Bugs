import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C50875 from "@testData/STANDALONE/TC_C50875.json";

test.describe("TC_C50875", () => {
  let flowId: string;
  let pgExportId1: string;
  let pgExportId2: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId1);
    await io.api.deleteCall("v1/exports/" + pgExportId2);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T22258 @Env-All TC_C50875", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating DynamoDB PageGenerator ***", async ()=>{});
    flowId = await io.createResourceFromAPI(TC_C50875, "FLOWS");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT)

    test.step("*** Getting the export Doc***", async ()=>{});
    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    pgExportId1 = flowDoc?.pageGenerators?.[0]?._exportId;
    pgExportId2 = flowDoc?.pageGenerators?.[1]?._exportId;

    var exportJson1 = await io.api.getExportById(pgExportId1);
    var data1 = JSON.stringify(exportJson1);

    test.step("*** Validating doc without group by fields***", async ()=>{});
    expect(data1).not.toContain("groupByFields");

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.EXPORT, 0);
    test.step("*** Add the grouping in the export***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
    await io.homePage.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT);
    await io.homePage.click(selectors.flowBuilderPagePO.GROUPBYID);
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    exportJson1 = await io.api.getExportById(pgExportId1);
    data1 = JSON.stringify(exportJson1);
    test.step("*** Validating doc with group by fields***", async ()=>{});
    await io.assert.expectToContainValue("groupByFields",data1, "");

    test.step("*** Creating MONGODB PageGenerator ***", async ()=>{});
    test.step("*** Getting the export Doc***", async ()=>{});
    var exportJson2 = await io.api.getExportById(pgExportId2);
    var data2 = JSON.stringify(exportJson2);

    test.step("*** Validating doc without group by fields***", async ()=>{});
    expect(data2).not.toContain("groupByFields");

    await io.homePage.loadingTime();
    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.EXPORT, 1);
    test.step("*** Add the grouping in the export***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
    await io.homePage.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT);
    await io.homePage.click(selectors.flowBuilderPagePO.GROUPBYIDMONGO);
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    exportJson2 = await io.api.getExportById(pgExportId2);
    data2 = JSON.stringify(exportJson2);

    test.step("*** Validating doc with group by fields***", async ()=>{});
    await io.assert.expectToContainValue("groupByFields",data2, "");

    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
