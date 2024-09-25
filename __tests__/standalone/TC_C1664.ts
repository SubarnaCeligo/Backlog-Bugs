import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C1664.json";

test.describe("TC_C1664", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T4812 TC_C1664_Verify_Able_to_Edit_Dataloader", async ({ io, page }, testInfo) => {
    
    await io.homePage.goToMenu("Tools", "Data loader");
    await io.flowBuilder.loadingTime();
    //Add Source
    await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.DATA_LOADER,1);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
    await io.flowBuilder.clickByText("XLSX");
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/dataloader/C69768.xlsx");
    await io.homePage.addStep("Uploaded xlsx file");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE); 
    await io.homePage.loadingTime();
    await io.flowBuilder.click('[data-test="Add destination"]');
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST, 0);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'TC_C1664 import');
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.DATA_LOADER,1);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
    await io.flowBuilder.clickByText("JSON");    
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE); 
    await io.flowBuilder.loadingTime();

    const exportEl = await page.getByText("Data Loader").first();
    await expect(exportEl).toBeVisible();
    test.step("*** Verified Export Should Save Successfully ***", async () => { });
    // *Saving and Running the flow
    test.step("*** Saving Flow ***", async () => { });
    await io.flowBuilder.saveFlow('TC_C1664');

    const flowEl = await page.getByText('TC_C1664').first();
    await expect(flowEl).toBeVisible();
    test.step("*** Verified Flow Should Work Fine ***", async () => { });

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    test.step("*** Selecting the Run  ***", async ()=>{});

    const waitingInQueueEl = await page.getByText("Waiting in queue").first();
    await waitingInQueueEl.waitFor({ state: 'visible', timeout: 30000 });
    await expect(waitingInQueueEl).toBeVisible();
    test.step("*** verified the status Waiting in queue  ***", async ()=>{});
    
  });
});
