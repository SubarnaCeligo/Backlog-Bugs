import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/Flows/C68822.json"

test.describe("C68822 Verify whether user is able to multiple file transfers simultaneously using different SFTP sessions.", () => {
  test("@Env-All @Zephyr-IO-T11804 C68822 Verify whether user is able to multiple file transfers simultaneously using different SFTP sessions", async ({io, page}) => {
    const id = await io.createResourceFromAPI(data, "FLOWS");
    await io.api.runBatchFlowViaAPI('TC_C68822', id);
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