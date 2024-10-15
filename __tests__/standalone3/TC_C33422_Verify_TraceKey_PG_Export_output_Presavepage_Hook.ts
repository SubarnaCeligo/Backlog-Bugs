import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C33422_Verify_TraceKey_PG_Export_output_Presavepage_Hook.json";

test.describe("TC_C33422_Verify_TraceKey_PG_Export_output_Presavepage_Hook", () => {
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
  });
  test("@Zephyr-IO-T5529 @Env-All TC_C33422_Verify_TraceKey_PG_Export_output_Presavepage_Hook", async ({io,page}, testInfo) => {
    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");
    await io.homePage.loadingTime();

    test.step("***Clicking on the add data proccessor***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    test.step("***Clicking on the Hooks ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_HOOK);

    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPT_ID);
    await io.homePage.loadingTime();
    await io.homePage.clickByText("TC_C33422_DND");

    test.step("*** Clicking on Script edit ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ADD_SCRIPT, 1);
    await io.homePage.loadingTime();

    test.step("*** Entering preSavePage Script ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.LOGS)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(FTP.Script);
    await io.homePage.loadingTime();

    test.step("*** Clicking on presave save and close butoon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    
    test.step("*** Clicking on FTP Export button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    
    test.step("*** Clicking on Advance Section ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicking on Trace Key template handler ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER, 1);
    await io.homePage.loadingTime();
    
    test.step("*** Verifying Filename Input data is Output of PresavePage applied", async ()=>{});
    var data = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("preSavePage",data, "");
    await io.assert.expectToContainValue("23",data, "");

    test.step("*** Clicking on Trace Key Teamplate close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);

    test.step("*** Clearing presavepage Script for next run***", async ()=>{});
    test.step("***Clicking on the add data proccessor***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    test.step("***Clicking on the Hooks ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_HOOK);

    test.step("*** Clicking on Script edit ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ADD_SCRIPT, 1);
    await io.homePage.loadingTime();

    test.step("*** Entering preSavePage Script ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.LOGS)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await io.homePage.loadingTime();

    test.step("*** Clicking on presave save and close butoon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
  });
});
