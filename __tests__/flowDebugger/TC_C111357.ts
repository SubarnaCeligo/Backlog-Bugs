import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111357 from '../../testData/inputData/FlowDebugger/C111357.json';


test.describe("C111357, C111406, C110859, C110837, C112229, C111403, C111405, C111323, C110859 verify items populate under 'path to many' if there are no json array fields in the resource - lookup", () => {
    test("@Env-All @Zephyr-IO-T14354 @Zephyr-IO-T14370 @Zephyr-IO-T14359 @Zephyr-IO-T14363 C111357, C111406, C110859, C110837 verify items populate under 'path to many' if there are no json array fields in the resource - lookup", async ({io, page}) => {

        //create a flow having json resource in export FTP
        await io.createResourceFromAPI(C111357, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,1);
        await expect(page.getByText("Yes (advanced)")).toBeChecked();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ONE_TO_MANY);
        let pathToManyOptions;
        pathToManyOptions = (await page.$$(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS));
        //no. of array fields in export json resource matching in import
        await test.step("C111406 ", async () => {
            expect(pathToManyOptions.length).toEqual(0);
        });

        //enter any text and verify if selected field taken for pathToMany 
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ONE_TO_MANY);
        await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.ONE_TO_MANY);
        await test.step("C110859, C110837 ", async () => {
            await io.flowBuilder.fill(selectors.flowBuilderPagePO.ONE_TO_MANY, 'user.items');
            await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.ONE_TO_MANY, 'value', 'user.items');
        });

        // save and close the import changes
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

        //verify if flow is enabled
        let flowToggle = await page.locator(selectors.flowBuilderPagePO.FLOW_ON_OFF).isChecked();
        expect(flowToggle).toBeTruthy();

        //run the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.homePage.loadingTime()
        await io.homePage.isPageLoaded()
        await io.homePage.isPageReady()
        // Wait for the status to change from 'Completing...' to 'Completed'
        await page.waitForSelector(`${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`, {timeout:160000});

        //verify success count and run status for export
        let completedStatusExport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
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
            //success but skipping the record as it is random text
            expect(successCount).toEqual('0');
        }
        
    });
    
    test("@Env-All @Zephyr-IO-T14371 C112229, C111403, C111405 verify items populate under 'path to many' if there are no json array fields in the resource", async ({io, page}) => {

        //create a flow having json resource in export FTP
        await io.createResourceFromAPI(C111357, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,1);
        await expect(page.getByText("Yes (advanced)")).toBeChecked();

        //enter any text and verify if selected field taken for pathToMany
        await test.step("C111403, C111405 ", async () => {
            await io.flowBuilder.click(selectors.flowBuilderPagePO.ONE_TO_MANY);
            await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.ONE_TO_MANY);
        });

        //save and close the import changes
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

        //verify if flow is enabled
        let flowToggle = await page.locator(selectors.flowBuilderPagePO.FLOW_ON_OFF).isChecked();
        expect(flowToggle).toBeTruthy();

        //run the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        // Wait for the status to change from 'Completing...' to 'Completed'
        await page.waitForSelector(`${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`, {timeout: 360000});

        //verify success count and run status for export
        let completedStatusExport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
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
            expect(successStatus).toEqual('1 error');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(1).textContent();
            //success but skipping the record as it is random text
            expect(successCount).toEqual('0');
        }
        
    });

    test("@Env-All @Zephyr-IO-T14353 C111323, C110859  verify items populate under 'path to many' if there are no json array fields in the resource", async ({io, page}) => {

        //create a flow having json resource in export FTP
        await io.createResourceFromAPI(C111357, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,1);
        await expect(page.getByText("Yes (advanced)")).toBeChecked();

        //enter any text and verify if selected field taken for pathToMany
        await test.step("C110859 ", async () => {
            await io.flowBuilder.click(selectors.flowBuilderPagePO.ONE_TO_MANY);
            await io.flowBuilder.clearTextValue(selectors.flowBuilderPagePO.ONE_TO_MANY);
            await io.flowBuilder.fill(selectors.flowBuilderPagePO.ONE_TO_MANY, 'user.objItems.testing');
        });

        //save and close the import changes
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

        //verify if flow is enabled
        let flowToggle = await page.locator(selectors.flowBuilderPagePO.FLOW_ON_OFF).isChecked();
        expect(flowToggle).toBeTruthy();

        //run the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.homePage.loadingTime()
        await io.homePage.isPageLoaded()
        await io.homePage.isPageReady()
        // Wait for the status to change from 'Completing...' to 'Completed'
        await page.waitForSelector(`${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`);

        //verify success count and run status for export
        let completedStatusExport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
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
            expect(successStatus).toEqual('1 error');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(1).textContent();
            //success but skipping the record as it is random text
            expect(successCount).toEqual('0');
        }
        
    });
});