import { expect, links, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C34489 from "@testData/FlowDebugger/C34489.json";

function isWithinPast10Minutes(dateTimeString, browserTime) {
  const givenDate = new Date(dateTimeString);
  const currentTime = new Date();
  const tenMinutesAgo = new Date(currentTime.getTime() - 10 * 60000); // 10 minutes in milliseconds

  console.log(JSON.stringify({
    givenDate,
    currentTime,
    tenMinutesAgo,
    a: givenDate > tenMinutesAgo
  }))
  // Check if the given date is within the past 10 minutes
  return givenDate > tenMinutesAgo && givenDate <= currentTime;
}

test.describe("C34489 - verify the request logs in a list are sorted by timestamp in descending order", () => {
  let id;
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("C34489 - verify the request logs in a list are sorted by timestamp in descending order", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(C34489, "FLOWS");
    await io.importsPage.click(selectors.importPagePO.CLICKIMPORT);
    await io.importsPage.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
    await io.importsPage.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await io.importsPage.clickByText("Apply");

    await io.importsPage.click(selectors.flowBuilderPagePO.CLOSELOGS);
    await io.mappings.click(selectors.basePagePO.CLOSE);
    await io.mappings.click(selectors.basePagePO.RUNFLOW);

    // wait for atleast 50 logs to be present
    await page.waitForFunction(
      () => {
        const element: HTMLDivElement = document.querySelector(
          '#tabpanel-0 table tbody tr:nth-child(2) button'
        );
        return element && parseInt(element.innerText) > 50;
      },
      { timeout: 1200000 },
      { polling: 1000 }
    );

    await io.importsPage.click(selectors.importPagePO.CLICKIMPORT);
    await io.importsPage.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
    await io.importsPage.loadingTime();

      // C34477
      await io.homePage.click(`tbody > tr > th > ${selectors.myAccountPagePO.RELATIVE_DATE_TIME}`);
      await page.waitForTimeout(500);
  
      const tooltipText = await (await page.$(selectors.mappings.TOOLTIP)).evaluate(el => el.textContent);
      expect(tooltipText.length).toBeGreaterThan(0);

   // C34491 When paginate, first log should always be selected by default (request/response panel)
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.DEBUG_TABLE_FIRST_ROW,
      "class",
      "Mui-selected"
    );
    await io.flowBuilder.click(selectors.basePagePO.IDNEXTPAGE);
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.DEBUG_TABLE_FIRST_ROW,
      "class",
      "Mui-selected"
    );

    var dateFirst = await page.$(
      selectors.flowBuilderPagePO.DEBUG_TABLE_FIRST_ROW_CELL
    );
    const dateStringFirst = await dateFirst.textContent();

    var dateLast = await page.$(
      selectors.flowBuilderPagePO.DEBUG_TABLE_LAST_ROW_CELL
    );
    const dateStringLast = await dateLast.textContent();

    var dateObjectFirst = new Date(dateStringFirst);
    var dateObjectLast = new Date(dateStringLast);

    // C34490 verify list displays the most recent 50 requests by default.
    var rowsLength = (
      await page.$$(selectors.flowBuilderPagePO.DEBUG_TABLE_ALL_ROWS)
    ).length;
    await io.assert.expectToBeValue(
      String(rowsLength),
      "50",
      "50 rows not displayed  "
    );

    // C34489 verify the request logs in a list are sorted by timestamp in descending order
    expect(dateObjectLast < dateObjectFirst).toBe(true);

    const browserTime = await page.evaluate(() => {
      return new Date().toISOString();
    });

    const dateNow1 = await page.evaluate(() => {
      return Date.now();
    });

    // C34494 When Hover over timestamp should show exact time in user timezone
    await io.assert.expectToBeValue(
      isWithinPast10Minutes(dateStringFirst, Date.now())?.toString(),
      "true",
      "timezone not matched"
    );
  });
});
