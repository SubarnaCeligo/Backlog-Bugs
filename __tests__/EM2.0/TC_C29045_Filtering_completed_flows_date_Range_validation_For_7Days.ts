
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C29045_Filtering_completed_flows_date_Range_validation_For_7Days", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6442 TC_C29045_Filtering_completed_flows_date_Range_validation_For_7Days", async ({io,page}, testInfo) => {
    test.step("*** Clicking on production ***", async ()=>{});
    await io.homePage.click(
      await selectors.homePagePO.PRODUCTION_WDIO
    );
    test.step("*** Clicking on Dashboard ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    test.step("*** Clicking on Completed flows ***", async ()=>{});
    await io.homePage.click(
      "[data-test='account-dashboard-completed-flows']"
    );
    test.step("*** Clicking on completed date range  ***", async ()=>{});
    await io.homePage.click(
      await "//p[text()=' Completed date range:']/../button"
    );
await test.step(
      "*** Filtering the date range with 7 days  ***"
, async ()=>{});
    await io.homePage.click(
      await "//p[text()='Last 7 days']"
    );
    await io.homePage.click(
      await selectors.myAccountPagePO.APPLY_BUTTON
    );
    test.step("*** Validating the last 07 days flows  ***", async ()=>{});
    var data = (await io.homePage.getText("//p[text()=' Completed date range:']/../button")).toString();
    await io.assert.expectToContainValue("Last 7 days",data, "");
    test.step("*** Clearing the filter  ***", async ()=>{});
    await io.homePage.click(
      await "//p[text()=' Completed date range:']/../button"
    );
    await io.homePage.click(
      await selectors.myAccountPagePO.CLEAR_BUTTON
    );
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
