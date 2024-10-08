import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C52000 from "@testData/STANDALONE/TC_C52000.json";

test.describe("TC_C52000", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId1 = flowDoc?.pageProcessors?.[0]?._importId;
    const ppImportId2 = flowDoc?.pageProcessors?.[1]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId1);
    await io.api.deleteCall("v1/imports/" + ppImportId2);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T26383 @Env-All TC_C52000", async ({io,page}, testInfo) => {
    test.step("*** Go to flows page ***", async ()=>{});
    await io.goToFlowsPage();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C52000);
    await test.step("Created Flow " + flows.get(TC_C52000.name)["flowName"],async ()=>{});
    flowId = flows.get(TC_C52000.name).flowId;
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    test.step("*** Clicking on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets/FTP_uploads/TC_C51221.json`);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Click on created import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();

    test.step("*** click on advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** click on data URI template ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.DATAURIHANDLEBAR);
    await io.homePage.loadingTime();
    test.step("*** click on data URI template ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    await page.keyboard.type('{{record._i');

    test.step("*** Verifying Handlebar Suggestions Displayed ***", async ()=>{});
    var ele = page.locator(`${selectors.mappings.MAPPER2DOT0PO.TREE_ITEM} div>div>p>span`).nth(2);
    var valid = await ele.textContent();
    await io.assert.expectToContainValue("_id",String(valid), "");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Verifying data in the input panel ***", async ()=>{});
    var data: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("_id",data, "");
    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
