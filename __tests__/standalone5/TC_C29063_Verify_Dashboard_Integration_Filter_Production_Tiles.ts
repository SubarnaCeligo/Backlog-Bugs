
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C29063_Verify_Dashboard_Integration_Filter_Sandbox_Tiles", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T6482 @Env-All TC_C29063_Verify_Dashboard_Integration_Filter_Sandbox_Tiles", async ({io,page}, testInfo) => {
    test.step("*** Clicking on sandbox option ***", async ()=>{});
    await io.homePage.click(await selectors.homePagePO.SANDBOX_WDIO);

    test.step("*** Clicking on Dashboard ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DASHBOARD);

    test.step("*** Clicking on Completed flows ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);

    test.step("*** Clicking on Integration filter ***", async ()=>{});
    await io.homePage.click(selectors.dashboardPagePO.FILTER_INTEGRATION);

    test.step("*** Verifying the dropdown values inside sandbox ***", async ()=>{});
    const dropdownElement1 = ["All integrations", "Automation Flows"];
    let loc = await selectors.flowBuilderPagePO.FLOWDROPDOWNOPTIONS;
    for(var a = 0; a < loc.length; a++) {
      let matching1 = await io.homePage.getDropDownValue(loc, dropdownElement1[0]);
      let matching2 = await io.homePage.getDropDownValue(loc, dropdownElement1[1]);
      await io.assert.expectToBeTrue(matching1, "");
      await io.assert.expectToBeFalse(matching2, "");
    }
    test.step("*** Changing the type back to production ***", async ()=>{});
    await io.homePage.click(await selectors.homePagePO.PRODUCTION_WDIO);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Dashboard ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Completed flows ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);

    test.step("*** Clicking on Integration filter ***", async ()=>{});
    await io.homePage.click(selectors.dashboardPagePO.FILTER_INTEGRATION);

    test.step("*** Verifying the dropdown values inside production ***", async ()=>{});
    loc = await selectors.flowBuilderPagePO.FLOWDROPDOWNOPTIONS;
    for(var a = 0; a < loc.length; a++) {
      let matching1 = await io.homePage.getDropDownValue(loc, dropdownElement1[0]);
      let matching2 = await io.homePage.getDropDownValue(loc, dropdownElement1[1]);
      await io.assert.expectToBeTrue(matching1, "");
      await io.assert.expectToBeTrue(matching2, "");
    }
  });
});
