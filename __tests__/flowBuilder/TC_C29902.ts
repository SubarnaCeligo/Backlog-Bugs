import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C29902.json"



test.describe("@Env-All @Zephyr-IO-T2889|Verify the Presave page stub is updated accordingly in the UI.", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io}, ) => { 
    await test.step("*** Deleting flow.***", async ()=>{})
      await io.api.deleteFlowViaAPI(flowId);
  })

  test("@Env-All @Zephyr-IO-T2889|Verify the Presave page stub is updated accordingly in the UI.", async ({io, page}) => {
    test.step("Creating the flow", async ()=>{});
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    test.step("Click on Export hook", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_HOOK
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SCRIPT
    );
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, 'preSaveScript');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(
      selectors.flowBuilderPagePO.SCRIPT_ID
    );
    await io.homePage.loadingTime();
    await page.keyboard.type('preSaveScript');
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByTextByIndex("preSaveScript",1);
    await io.homePage.loadingTime();
    test.step("Click on edit script for our hook", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.INSERT_STUB
    );
    await io.homePage.loadingTime();
    let obtained = (await io.homePage.getText(selectors.flowBuilderPagePO.SCRIPT_STUB)).toString();
await test.step(
      "verifying whether all the input parameters are present"
, async ()=>{});
    await io.assert.expectToContainValue("data",obtained, "");
    await io.assert.expectToContainValue("files",obtained, "");
    await io.assert.expectToContainValue("errors",obtained, "");
    await io.assert.expectToContainValue("retryData",obtained, "");
    await io.assert.expectToContainValue("_exportId",obtained, "");
    await io.assert.expectToContainValue("_connectionId",obtained, "");
    await io.assert.expectToContainValue("_flowId",obtained, "");
    await io.assert.expectToContainValue("_integrationId",obtained, "");
    await io.assert.expectToContainValue("lastExportDateTime",obtained, "");
    await io.assert.expectToContainValue("currentExportDateTime",obtained, "");
    await io.assert.expectToContainValue("pageIndex",obtained, "");
    await io.assert.expectToContainValue("settings",obtained, "");
  });
});
