import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C12034_Verify Import and load the export which has 4000+ audit records.`, () => {
  test(`C12034_Verify Import and load the export which has 4000+ audit records`, async ({ io, page }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.clickByText("TC_C12034_Flow_DND");
    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.clickByText("Clone flow");
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText('Use existing connection');
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("FTP connection", 1);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText('Use existing connection');
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("TC_C12034_Connection_DND", 1);
    await io.flowBuilder.clickByText("Done");
    await io.flowBuilder.clickByText("Unassigned");
    await io.flowBuilder.clickByText("Last updated");
    await io.flowBuilder.clickByTextByIndex("Clone - TC_C12034_Flow_DND", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime()
    // Wait for the status to change from 'Completing...' to 'Completed'
    await page.waitForSelector(`${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`);
    //verify success count and run status for export
    let completedStatusExport = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
    expect(completedStatusExport).toEqual('Completed');
    await test.step("C12034", async () => {
      if (completedStatusExport == 'Completed') {
        let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
        expect(successStatus).toEqual('Success');
        let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(0).textContent();
        expect(successCount).toEqual('4000');
      }
      //verify success count and run status for import
      let completedStatusImport = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(1).textContent();
      expect(completedStatusImport).toEqual('Completed');
      if (completedStatusImport == 'Completed') {
        let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(1).textContent();
        expect(successStatus).toEqual('Success');
        let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(1).textContent();
        expect(successCount).toEqual('4000');
      }
    });
  });
})
