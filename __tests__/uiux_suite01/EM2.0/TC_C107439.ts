import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107439 from '../../../testData/EM2.0/C107439.json';
import playload from "@testData/profile/updatePreference.json"

test.describe("C107439_C106998 Verify the Sort Errors in new error view in Ascending and Descending Timestamp", () => {
  let errorFlowId
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    playload.showRelativeDateTime = false;
    const resp = await io.api.putCall('v1/preferences', playload);
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(errorFlowId)
  });
  test("@Zephyr-IO-T1657 @Zephyr-IO-T1653 @Env-All C107439_C106998 Verify user can able to toggle sorting arrow and view changes", async ({ io, page }) => {
    errorFlowId = await io.createResourceFromAPI(C107439, "FLOWS");
    await io.api.runBatchFlowViaAPI('TC_C107439', errorFlowId);
    const lastRun = page.getByText('Last run')
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });
    await io.flowBuilder.clickByTextByIndex("5 errors", 1);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.TIMESTAMP_TABLE)
    const timeStamp = page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.TIMESTAMP_TABLE);
    await timeStamp.nth(2).waitFor();
    const descendingList = await timeStamp.all();
    for (let i = 1; i < descendingList.length - 1; i++) {
      let firstTimeStamp = new Date(`${await descendingList[i].innerText()}`);
      let lastTimeStamp = new Date(`${await descendingList[i + 1].innerText()}`);
      await io.assert.expectToBeTrue(firstTimeStamp >= lastTimeStamp, 'The list is not sorted according to Descending timestamp');
    }
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.DOWN_ARROW
    );
    const ascendingList = await timeStamp.all();
    for (let i = 2; i < ascendingList.length - 1; i++) {
      let curDate = new Date(`${await ascendingList[i].innerText()}`);
      let nextDate = new Date(`${await ascendingList[i + 1].innerText()}`);
      await io.assert.expectToBeTrue(curDate <= nextDate, 'The list is not sorted according to Ascending timestamp');
    }
  });
});