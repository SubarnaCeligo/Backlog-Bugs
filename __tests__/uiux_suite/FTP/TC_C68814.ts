import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/Flows/C68814.json"

test.describe("C68814 Verify ftp_bridge properly encodes the spaces and access the Correct file from the Directory if the relative path Include Non-ASCII characters in file name.", () => {
  test("C68814 Verify ftp_bridge properly encodes the spaces and access the Correct file from the Directory if the relative path Include Non-ASCII characters in file name.", async ({io, page}) => {
    const id = await io.fillFormUI(data, "FLOWS");
    await io.api.runBatchFlowViaAPI('TC_C68814', id);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});

    await  page.getByRole('cell', { name: 'success Success' }).getByRole('button').click()
    const errorNumber = await io.flowBuilder.isVisible("text='0 errors in this run'")
    await io.assert.expectToBeTrue(errorNumber,"Error is found in the flow")  
  });
})