import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C9776 from "@testData/FlowBuilder/TC_C9776.json";
test.describe("TC_C9776, TC_C9764", () => {
  let flowId;
  test("@Env-All @Zephyr-IO-T2759|Verify a flow with non delta PG, but has a PP delta export. Then delta dates needs to be calculated at that point and passed downstream|@Env-All @Zephyr-IO-T2756|Verify if the PG is a delta export, then calculated delta dates needs to be passed downstream via the SQS message.", async ({ io, page }, testInfo) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C9776);
    flowId = await io.api.getFlowId(TC_C9776.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CONNECTIONS_TAB);
    await io.homePage.loadingTime();
    test.step("Clicked on Connections.", async () => { });
    const row = await page.locator('tr', { hasText: 'ZENDESK CONNECTION' });
    const actionsMenu = row.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await actionsMenu.click();

    test.step("Clicked on action menu.", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.homePage.loadingTime();
    await io.myAccountPage.waitForElementAttached('[data-test="clearLogs"]');
    await io.homePage.click('[data-test="clearLogs"]');
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    var date = await page.locator(
      '[data-test="date"]>div>div>input'
    );
    var time = await page.locator(
      '[data-test="time"]>div>div>input'
    );
    var dateAutomaticDelta = await date.getAttribute('value');
    var timeAutomaticDelta = await time.getAttribute('value');
    console.log(dateAutomaticDelta + " " + timeAutomaticDelta);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN
    );
    //Make sure flow started running
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });
    await io.homePage.loadingTime();
    //Refresh
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE, 1);
    await io.homePage.loadingTime();
    var automaticLogs = (await io.homePage.getText('[id="code"] .ace_content')).toString();
    // Replace all spaces
    dateAutomaticDelta = dateAutomaticDelta.replace(/\s+/g, '').toString();
    let dateExtracted = automaticLogs.slice(0, 10);
    // Function to clean the string by removing invisible Unicode characters
    const cleanString = (str: string) => str.replace(/[\u2000-\u206F\uFEFF]/g, '').trim();

    // Clean both expected and received strings
    const expected = cleanString(dateExtracted);
    const received = cleanString(dateAutomaticDelta);
    await io.assert.expectToBeValue(expected, received, "");
    await io.api.deleteFlowsWithId([flowId]);
  });
});

