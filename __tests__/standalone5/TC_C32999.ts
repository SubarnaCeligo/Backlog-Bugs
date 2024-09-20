
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_C27963_Httpexp_Httplookup_apipaging.json";

test.describe("TC_C32999", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T3030 @Env-All TC_C32999", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    const existt = await io.homePage.isVisible(selectors.homePagePO.CLONE_INTEGRATION);
    await io.assert.expectToBeTrue(existt, "");
    test.step("*** Verified clone integration option is available ***", async ()=>{});
  });
});
