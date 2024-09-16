import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40405_C32436.json";

test.describe("TC_C40405_C32436", () => {
  let flowId: string;
  let exportId: string;
  let importId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + exportId);
    await io.api.deleteCall("v1/imports/" + importId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5929 @Zephyr-IO-T5850 @Env-All TC_C40405_C32436", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime()
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"],async ()=>{});

    flowId = flows.get(HTTP.name)["flowId"];
    exportId = flows.get(HTTP.name)["exportId"];
    importId = flows.get(HTTP.name)["importId"];

    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async ()=>{});


    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    test.step("*** Clicking on more actions ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Clicking on Preview ***", async ()=>{});

    var result = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue('"name": "Smith Inc"', result, "");
    await io.assert.expectToContainValue('"Fax": "(312) 225-5431"', result, "");
    await io.assert.expectToContainValue('"Phone Number": "(800) 670-2231"', result, "");
    test.step("*** Verified Import preview panel should show data as per the import mapping applied ***", async ()=>{});

    var preMapData = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue('"ID": "Smith Inc"', preMapData, "");
    await io.assert.expectToContainValue('"Email": "customer@smith-inc.com"', preMapData, "");
    await io.assert.expectToContainValue('"Phone": "(800) 670-2231"', preMapData, "");
    await io.assert.expectToContainValue('"Fax": "(312) 225-5431"', preMapData, "");
    test.step("*** Verified pre-map sample data shown should also be available as fields in the corresponding pre-map dropdowns ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step(" Clicked on Close ", async ()=>{});
  });
});
