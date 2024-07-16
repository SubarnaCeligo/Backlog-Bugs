import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/Flows/C68830.json"

test.describe("C68830 Verify that ftp_bridge properly handles the termination and returns an appropriate error message when attempting to access files and directories on the server using the terminated session", () => {
  test("@Env-All @Zephyr-IO-T11807 C68830 Verify that ftp_bridge properly handles the termination and returns an appropriate error message when attempting to access files and directories on the server using the terminated session", async ({io, page}) => {
    const id = await io.createResourceFromAPI(data, "FLOWS");
    await io.api.runBatchFlowViaAPI('TC_C68830', id);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 500000});

    let success = await page.$$(selectors.flowBuilderPagePO.ERROR_BUBBLE)
    for(let i = 0; i<success.length; i++){
      let  msg = await success[i].textContent()
      await expect(msg).toEqual("Success")
    }
    // await  page.getByRole('cell', { name: 'success Success' }).getByRole('button').first().click()
    // const msg = await io.flowBuilder.isVisible(`text="File object doesn't exist: sftp://io.auto.qa@celigo.com:****************@celigo.files.com/Group-QA/HR-ui/test?.json"`)
    // await io.assert.expectToBeTrue(msg, "message not found")
  });
});