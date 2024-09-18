
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C100013.json";

test.describe("TC_C100013_C100015", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await io.api.deleteFlowsWithId([flowID]);
    await io.homePage.loadingTime();
    test.step("*** End of Test Suite ***", async () => { });
  });
  test("TC_C100013_C100015 @Env-All @Zephyr-IO-T25628 @Zephyr-IO-T25629", async ({ io, page }, testInfo) => {
    test.step("*** Creating Flow Branch ***", async ()=>{});
    flowID = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.homePage.loadingTime();
    test.step("*** Navigate to Flow Page ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(  flowID);
    test.step("*** Navigate to Flow ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT);

    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    test.step("***Clicking on the input Filter ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.INPUT_FILTER, 0);
    await io.homePage.loadingTime();
    var Resp = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    await expect(Resp).toContain('"id": 1');
    await expect(Resp).toContain('"name": "Records1"');
    test.step("*** Verified Data coming from the export side should show in the input filter ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async ()=>{});
    await io.homePage.loadingTime();

    //postResponseMapHook for response mapping
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    test.step("***Clicking on the postResponseMapHook ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK);
    await io.homePage.loadingTime();
    var Resp4 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    await expect(Resp4).toContain('"testId": "1234567890"');
    await expect(Resp4).toContain('"name": "Records1"');
    test.step("*** Verified mapped fields under response mapping should be  populated into postresponse hook***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async ()=>{});
    await io.homePage.loadingTime();

    //postResponseMapHook for result mapping
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 3);
    test.step("***Clicking on the postResponseMapHook ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK, 1);
    await io.homePage.loadingTime();
    var Resp5 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    await expect(Resp5).toContain('"Id": 22734706889233');
    await expect(Resp5).toContain('"Name": "The Customer"');
    test.step("*** Verified mapped fields under result mapping should be  populated into postresponse hook***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
