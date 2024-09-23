
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import constants from "@testData/EM2.0/constants.json";

test.describe("TC_C29029_Dashboard_RunHistory_Columns_Validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6409 TC_C29029_Dashboard_RunHistory_Columns_Validation", async ({io,page}, testInfo) => {
    test.step("*** Clicking on the Dashboard tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    test.step("*** Clicking on the Completed flows ***", async ()=>{});
    await io.homePage.click(
      await selectors.flowBuilderPagePO.COMPLETED_FLOWS
    );
    test.step("*** Clicking on the Run History value ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.locator(selectors.myAccountPagePO.RUNHISTORY).nth(1).click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

await test.step(
      "*** Validating the Run history column names ***"
, async ()=>{});
    var data = constants.runHistory.columns;
    var expec = await page.$$eval('table:nth-child(2) > thead > tr > th', items => items.map(item => item.textContent?.trim()));

    await expect(expec).toEqual(data);

    test.step("*** Closing Run history page***", async ()=>{});
    await io.homePage.click(
      await selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
