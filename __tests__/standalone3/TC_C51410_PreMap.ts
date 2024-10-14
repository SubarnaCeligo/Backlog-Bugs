import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C51410_PreMap.json";

test.describe("TC_C51410", () => {
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

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5639 @Env-All TC_C51410", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");
    await io.homePage.loadingTime();

    test.step("***Clicking on the add data proccessor***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    test.step("***Clicking on the pageprocessorhooks ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);

    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPT_ID);
    await io.homePage.loadingTime();
    await io.homePage.clickByText("TC_C51410_DND");

    test.step("*** Clicking on Script edit ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowGroupingPagePO.PREMAPCREATESCRIPT, 1);
    await io.homePage.loadingTime();

    test.step("*** Entering premap Script ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.LOGS)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(FTP.Script);
    await io.homePage.loadingTime();
    
    test.step("*** Clicking on premap save and close butoon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("***Clicking on the pageprocessorhooks ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
    await io.homePage.clickButtonByIndex( selectors.flowGroupingPagePO.PREMAPCREATESCRIPT, 1);
    await io.homePage.loadingTime();

    test.step("*** Entering premap Script ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.LOGS)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(FTP.edit_Script);
    await io.homePage.loadingTime();
    test.step("*** Editing premap Script ***", async ()=>{});
 
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Click on preview ***", async ()=>{});
    var preMapResult = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("123",preMapResult, "");
    test.step("***Validating the AFE output data ***", async ()=>{});

    test.step("*** Clearing premap Script***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.LOGS)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');

    test.step("*** Clicking on premap save and close butoon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
  });
});
