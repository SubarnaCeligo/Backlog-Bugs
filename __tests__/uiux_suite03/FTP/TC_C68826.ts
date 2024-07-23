import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/Flows/C68826.json"

test.describe("C68826 Verify that ftp_bridge properly handles the termination and returns an appropriate error message when attempting to access files and directories on the server using the terminated session", () => {
  test("@Env-All @Zephyr-IO-T11806 C68826 Verify that ftp_bridge properly handles the termination and returns an appropriate error message when attempting to access files and directories on the server using the terminated session", async ({io, page}) => {
    const id = await io.createResourceFromAPI(data, "FLOWS");
    await io.api.runBatchFlowViaAPI('TC_C68826', id);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.flowBuilder.clickByTextByIndex("1 error", 1);
    const rowSelector =  selectors.basePagePO.ROW_SELECTED;
    const locator = await page.$(`${rowSelector} td`)
    await io.assert.verifyElementText(`${rowSelector} td`, "File object doesn't exist: sftp://io.auto.qa@celigo.com:****************@celigo.files.com/Group-QA/HRR-ui")
  });
});