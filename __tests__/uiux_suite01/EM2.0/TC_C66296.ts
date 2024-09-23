import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C66296 from "@testData/EM2.0/C66296.json"

test.describe("C66296 Verify the status of flow runs is color-coded", () => {
  let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
  test("@Zephyr-IO-T20424 @Env-All C66296 Verify the status of flow runs is color-coded", async ({io, page}) => {
      errorFlowId = await io.createResourceFromAPI(C66296, "FLOWS");
      await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
      const lastRun = page.getByText('Last run')
      await lastRun.waitFor({state: 'visible', timeout: 360000});
      const runConsoleRows = await page.locator(selectors.flowBuilderPagePO.COLUMNS).all();
      runConsoleRows.forEach(async row =>{
        const status = row.locator('td div').nth(0);
        const color = await status.evaluate(el => getComputedStyle(el).backgroundColor);
        await io.assert.expectToBeValue(color, "rgb(92, 184, 92)", "The status is not correctly colored");
      })
  });
});
