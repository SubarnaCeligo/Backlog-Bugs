import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/Flows/C68822.json"

test.describe("C68822 Verify whether user is able to multiple file transfers simultaneously using different SFTP sessions.", () => {
  test("C68822 Verify whether user is able to multiple file transfers simultaneously using different SFTP sessions", async ({io, page}) => {
    const id = await io.fillFormUI(data, "FLOWS");
    await io.api.runBatchFlowViaAPI('TC_C68822', id);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});

    await  page.getByRole('cell', { name: 'success Success' }).getByRole('button').click()
    const errorNumber = await io.flowBuilder.isVisible("text='0 errors in this run'")
    await io.assert.expectToBeTrue(errorNumber,"Error is found in the flow")  
  });
});