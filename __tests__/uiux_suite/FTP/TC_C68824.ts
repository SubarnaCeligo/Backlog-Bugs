import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/Flows/C68824.json"
 
 test.describe("C68824 verify user if user opened Multiple SFTP sessions simultaneously , each session can Access files and directories from the sevrer.", () => {
      test("C68824 verify user if user opened Multiple SFTP sessions simultaneously , each session can Access files and directories from the sevrer.", async ({io, page}) => {
        const id = await io.createResourceFromAPI(data, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C68824', id);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        
        await io.api.runBatchFlowViaAPI('TC_C68824', id);
        const lastRun2 = page.getByText('Last run');
        await lastRun2.waitFor({state: 'visible', timeout: 180000});
    
        await  page.getByRole('cell', { name: 'success Success' }).getByRole('button').click()
        const errorNumber = await io.flowBuilder.isVisible("text='0 errors in this run'")
        await io.assert.expectToBeTrue(errorNumber,"Error is found in the flow")  
      });
    });