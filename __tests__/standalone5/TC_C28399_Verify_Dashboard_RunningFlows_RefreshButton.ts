import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C28399_Verify_Dashboard_RunningFlows_RefreshButton", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6337 TC_C28399_Verify_Dashboard_RunningFlows_RefreshButton", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    test.step("*** Clicked on Dashboard ***", async ()=>{});

    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.REFRESHBUTTON, 17);
    test.step("*** Clicking on the refresh button ***", async ()=>{});

    await io.homePage.loadingTime();
  });
});
