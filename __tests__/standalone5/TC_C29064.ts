
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C29064", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T6484 @Env-All TC_C29064", async ({io,page}, testInfo) => {
    test.step("*** Changing the type back to production ***", async ()=>{});
    await io.homePage.click(await selectors.homePagePO.PRODUCTION_WDIO);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicked on Dashboard ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicked on completed flows ***", async ()=>{});

    test.step("*** Clicking on Integration filter ***", async ()=>{});
    await io.homePage.click(selectors.dashboardPagePO.FILTER_INTEGRATION);

    const dropdownElement1 = ["Automation Flows"];
    const loc = await selectors.flowBuilderPagePO.FLOWDROPDOWNOPTIONS;
    let matching1 = await io.homePage.getDropDownValue(loc, dropdownElement1[0]);
    await io.assert.expectToBeTrue(matching1, "");
    test.step("*** Verified Only the production tiles are shown ***", async ()=>{});
  });
});
