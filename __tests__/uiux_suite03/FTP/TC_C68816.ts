import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/Flows/C68816.json"


test.describe("C68816 Verify ftp_bridge properly encodes the spaces and access the correct file from the Correct Directory if the relative path Include Non-ASCII characters in file name and directory name.", () => {
  test("@Env-All @Zephyr-IO-T11798 C68816 Verify ftp_bridge properly encodes the spaces and access the correct file from the Correct Directory if the relative path Include Non-ASCII characters in file name and directory name.", async ({io, page}) => {
    const id = await io.createResourceFromAPI(data, "FLOWS");
    await io.api.runBatchFlowViaAPI('TC_C68816', id);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 500000});

    let success = await page.$$(selectors.flowBuilderPagePO.ERROR_BUBBLE)
    for(let i = 0; i<success.length; i++){
      let  msg = await success[i].textContent()
      await expect(msg).toEqual("Success")
    }

    // await  page.getByRole('cell', { name: 'success Success' }).getByRole('button').click()
    // const errorNumber = await io.flowBuilder.isVisible("text='0 errors in this run'")
    // await io.assert.expectToBeTrue(errorNumber,"Error is found in the flow")  
  });
});
