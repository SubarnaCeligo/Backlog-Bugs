import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C113465 from '@testData/Exports/C113465.json'


test.describe("C113466, C113465, C113464, C113463, 113462, C113461, C113460 verify Prefix text box for S3 export", () => { 

    test("@Env-All @Zephyr-IO-T15192, C113466, C113465, C113464, C113463, 113462, C113461, C113460 verify Prefix text box for S3 export", async ({ io, page }) => {
      await io.createResourceFromAPI(C113465, "FLOWS");
      //verify if flow is enabled
      let flowToggle = await page.locator(selectors.flowBuilderPagePO.FLOW_ON_OFF).isChecked();
      expect(flowToggle).toBeTruthy();  
    
      //run the flow
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      // Wait for the status to change from 'Completing...' to 'Completed'
      await page.waitForSelector(`${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`);
       //verify success count and run status for export
       let completedStatusExport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
       expect(completedStatusExport).toEqual('Completed');
       await test.step("C113465, C113460, C113463", async () => {
        if(completedStatusExport == 'Completed'){
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
            expect(successStatus).toEqual('Success');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(0).textContent();
            expect(successCount).toEqual('1');
        }
        //verify success count and run status for import
        let completedStatusImport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(1).textContent();
        expect(completedStatusImport).toEqual('Completed');
        if(completedStatusImport == 'Completed'){
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(1).textContent();
            expect(successStatus).toEqual('Success');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(1).textContent();
            expect(successCount).toEqual('1');
        }
      });

      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,0);
      await test.step("C113464", async () => {
        await io.assert.verifyElementDisplayedByText("Prefix", "Prefix text box not displayed for S3 export");
        //await page.pause();
        await io.flowBuilder.click(selectors.exportsPagePO.HELP_TEXT);
        //await io.flowBuilder.click("#s3\\.keyPrefix >> .MuiIconButton-sizeSmall");
        await io.assert.verifyElementDisplayedByText(`Enter the prefix (similar to a folder structure within the Amazon S3 bucket) to transfer only the files contained in that location. For example, if the full path is "BucketName/Project/WordFiles/", then a prefix is "Project/WordFiles/". Partitions within the prefix support up to 3,500 PUT/COPY/POST/DELETE and 5,500 GET/HEAD requests per second. If left blank, all files will be picked for transfer. Refer to Amazon S3 documentation for more details.`,
          'prefix lookup text is incorrect');
        await io.flowBuilder.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);  
      });

      await test.step("C113462", async () => {
        await io.flowBuilder.clearTextValue(selectors.exportsPagePO.PREFIX_TEXT);
        await io.flowBuilder.fill(selectors.exportsPagePO.FILE_NAME_FILTER,"testt");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        //run the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        // Wait for the status to change from 'Completing...' to 'Completed'
        await io.flowBuilder.clickByText("Refresh");
        await page.waitForSelector(`${selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS}:has-text("In progress...")`);
        await page.waitForSelector(`${selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS}:has-text("Completed")`);
        //verify success count and run status for export
        completedStatusExport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
        if(completedStatusExport == 'Completed'){
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
            expect(successStatus).toEqual('Success');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(0).textContent();
            expect(successCount).toEqual('0');
        }
      });
      

      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,0);
      await test.step("C113461, C113466", async () => {
        await io.flowBuilder.fill('[id="text-s3.keyPrefix"]', "TestRandom");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        //run the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        // Wait for the status to change from 'Completing...' to 'Completed'
        await io.flowBuilder.clickByText("Refresh");
        await page.waitForSelector(`${selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS}:has-text("In progress...")`);
        await page.waitForSelector(`${selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS}:has-text("Completed")`);
        //verify success count and run status for export
        completedStatusExport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
        if(completedStatusExport == 'Completed'){
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
            expect(successStatus).toEqual('Success');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(0).textContent();
            expect(successCount).toEqual('0');
        }

      });
    })  
});       