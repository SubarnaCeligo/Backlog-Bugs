
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C29046_Filtering_completed_flows_date_Range_validation_for_36Hours", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6444 TC_C29046_Filtering_completed_flows_date_Range_validation_for_36Hours", async ({io,page}, testInfo) => {
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
      "*** Filtering the date range for 36 hours  ***"
, async ()=>{});
    await io.homePage.click(
      await "//p[text()='Last 36 hours']"
    );
    await io.homePage.click(
      await selectors.myAccountPagePO.APPLY_BUTTON
    );
    test.step("*** Validating the last 36 Hours flows  ***", async ()=>{});
    var data = (await io.homePage.getText("//p[text()=' Completed date range:']/../button")).toString();
    await io.assert.expectToContainValue("Last 36 hours",data, "");
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
