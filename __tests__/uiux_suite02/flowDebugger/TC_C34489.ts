import { expect, links, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C34489 from '@testData/FlowDebugger/C34489.json';

function isWithinPast10Minutes(dateTimeString) {
  const givenDate = new Date(dateTimeString);
  const currentTime = new Date();
  const tenMinutesAgo = new Date(currentTime.getTime() - 10 * 60000); // 10 minutes in milliseconds
  // Check if the given date is within the past 10 minutes
  return givenDate > tenMinutesAgo && givenDate <= currentTime;
}

test.describe("C34489 - Verify that admin/manage user is able to stop debug on listeners", () => {
  let id;
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("C34489 - Verify that admin/manage user is able to stop debug on listeners", async ({ io, page }) => {
    id = await io.createResourceFromAPI(C34489, "FLOWS");
    await io.importsPage.click(selectors.importPagePO.CLICKIMPORT);
    await io.importsPage.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
    await io.importsPage.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await io.importsPage.clickByText('Apply');

    await io.importsPage.click(selectors.flowBuilderPagePO.CLOSELOGS);
    await io.mappings.click(selectors.basePagePO.CLOSE);
    // await io.mappings.click(selectors.basePagePO.RUNFLOW);
    await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
    throw new Error("Test failed by Bhumesh");

    // wait for atleast 50 logs to be present
    await page.waitForFunction(
      () => {
          const element = document.querySelector("[data-test='view-job-error']");
          return element && parseInt(element.innerHTML) > 50;
      },
      { timeout: 120000 },
      
  );

    await io.importsPage.click(selectors.importPagePO.CLICKIMPORT);
    await io.importsPage.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
      // C34491 When paginate, first log should always be selected by default (request/response panel)
      await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.DEBUG_TABLE_FIRST_ROW, 'class', 'MuiTableRow-root Mui-selected MuiTableRow-hover css-1a1kujy');
      await io.flowBuilder.click(selectors.basePagePO.IDNEXTPAGE);
      await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.DEBUG_TABLE_FIRST_ROW, 'class', 'MuiTableRow-root Mui-selected MuiTableRow-hover css-1a1kujy');

    
    var dateFirst = await page.$(selectors.flowBuilderPagePO.DEBUG_TABLE_FIRST_ROW_CELL);
    const dateStringFirst = await dateFirst.textContent();
    
    var dateLast = await page.$(selectors.flowBuilderPagePO.DEBUG_TABLE_LAST_ROW_CELL);
    const dateStringLast = await dateLast.textContent();

    var dateObjectFirst = new Date(dateStringFirst);    
    var dateObjectLast = new Date(dateStringLast);

    // C34490 verify list displays the most recent 50 requests by default.
    var rowsLength = (await page.$$(selectors.flowBuilderPagePO.DEBUG_TABLE_ALL_ROWS)).length;
    await io.assert.expectToBeValue(String(rowsLength), "50", "50 rows not displayed  ");

    // C34489 verify the request logs in a list are sorted by timestamp in descending order
    expect(dateObjectLast < dateObjectFirst).toBe(true);

    // C34494 When Hover over timestamp should show exact time in user timezone
    await io.assert.expectToBeValue(isWithinPast10Minutes(dateStringFirst)?.toString(),'true', "timezone not matched")
  });
})