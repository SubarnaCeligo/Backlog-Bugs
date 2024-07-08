import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C111321 from '../../../testData/inputData/FlowDebugger/C111321.json';


test.describe("C111321, C110854, C110846, C111404 verify items populate under 'path to many' if there are array fields in the resource", () => {
    test("@Env-All @Zephyr-IO-T14352 @Zephyr-IO-T14361 @Zephyr-IO-T14362 @Zephyr-IO-T14368 C111321, C110854, C110846, C111404 verify items populate under 'path to many' if there are  array fields in the resource", async ({io, page},testInfo) => {

        //create a flow having json resource in export FTP
        await io.createResourceFromAPI(C111321, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER,1);
        await expect(page.getByText("Yes (advanced)")).toBeChecked();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ONE_TO_MANY);
        let pathToManyOptions;
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS);
        pathToManyOptions = (await page.$$(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS));
        //no. of array fields in export json resource matching in import
        await test.step("C110854 ", async () => {
            expect(pathToManyOptions.length).toEqual(2);
        });
        
        //verify the array fields populated
        await test.step("C111404 ", async () => {
            const elementsToVerify = ['user.items', 'user.items2'];
            const allElementsInOptions = elementsToVerify.every(async (element,index) =>
                (await pathToManyOptions[index].textContent()) === element      
            );
            expect(allElementsInOptions).toBeTruthy();
        });

        //select one array field from dropdown and verify if selected field taken for pathToMany 
        await test.step("C110846 ", async () => {
            const option = await page.waitForSelector(`${selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS}:has-text("user.items")`);
            await option.click(); 
            await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.ONE_TO_MANY, 'value', 'user.items');
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
        await page.waitForSelector(`${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`, {timeout: 360000});

        //verify success count and run status for export
        let completedStatusExport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
        if(completedStatusExport == 'Completed'){
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
            expect(successStatus).toEqual('Success');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(0).textContent();
            expect(successCount).toEqual('2');
        }
        //verify success count and run status for import
        let completedStatusImport =  await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(1).textContent();
        expect(completedStatusImport).toEqual('Completed');
        if(completedStatusImport == 'Completed'){
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(1).textContent();
            expect(successStatus).toEqual('Success');
            let successCount = await page.locator(selectors.flowBuilderPagePO.RUN_SUCCESS_COUNT).nth(1).textContent();
            expect(successCount).toEqual('2');
        }
        
    });
    
});