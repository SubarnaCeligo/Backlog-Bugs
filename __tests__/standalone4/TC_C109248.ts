import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C109248.json";

test.describe("TC_C109248_C108707", () => {
  let script_id_post_response;
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await io.api.deleteScriptViaAPI(script_id_post_response);
    await io.api.deleteFlowsWithId([flowId]);
    test.step("*** Deleting the script files ***", async ()=>{});
  });
  test("TC_C109248_C108707 @Env-All @Zephyr-IO-T23767 @Zephyr-IO-T23764", async ({ io, page }, testInfo) => {
    script_id_post_response = await io.api.createScriptViaAPI( TC.script);
    TC.routers[0].branches[0].pageProcessors[0].hooks.postResponseMap._scriptId =
      script_id_post_response;
    TC.routers[0].branches[1].pageProcessors[0].hooks.postResponseMap._scriptId =
      script_id_post_response;

    test.step("*** Creating Flow Branch ***", async ()=>{});
    flowId = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.homePage.loadingTime();
    test.step("*** Navigate to Flow Page ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    const fitToScreen = await page.locator(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);
    await fitToScreen.waitFor({ state: "visible", timeout: 90000 });
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();

    //TC_C109248 Verify Preview issues when the user has postresponsemap and one-to-many enabled for IMPORT
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK, 0);
    await io.homePage.loadingTime();
    let InputData = JSON.parse(( await io.homePage.copyResourceData( selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE)
      ).toString()
    );
    var lengthdata = InputData.postResponseMapData[0].orderData.items;
    let jsonString = JSON.stringify(lengthdata);
    expect(jsonString).toEqual(JSON.stringify(TC.importdata));
    test.step("***  Verified For post response map hook, if oneToMany is configured and pathToMany is configured, the response mapping should apply to all child records. ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("***  Clicked On Close  ***", async ()=>{});
    await io.homePage.loadingTime();

    // TC_C108707 Verify For lookup, if we have a one-to-many set then data shows as one-to-many paths within the postresponsemap script.
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK, 1);
    await io.homePage.loadingTime();
    let InputData1 = JSON.parse(( await io.homePage.copyResourceData( selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE)
      ).toString()
    );
    var lengthdata1 = InputData1.postResponseMapData[0].orderData.items;
    let jsonString1 = JSON.stringify(lengthdata1);
    expect(jsonString1).toEqual(JSON.stringify(TC.lookupData));
    test.step("***  Verified For lookup, if we have a one-to-many set then data shows as one-to-many paths within the postresponsemap script.  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("***  Clicked On Close  ***", async ()=>{});
    await io.homePage.loadingTime();
  });
});
