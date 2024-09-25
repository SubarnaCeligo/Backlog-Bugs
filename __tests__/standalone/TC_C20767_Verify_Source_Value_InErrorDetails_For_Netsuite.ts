
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C20767_Verify_Source_Value_InErrorDetails_For_Netsuite.json";

test.describe("TC_C20767_Verify_Source_Value_InErrorDetails_For_Netsuite", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Zephyr-IO-T6238 TC_C20767_Verify_Source_Value_InErrorDetails_For_Netsuite", async ({io,page}, testInfo) => {
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2015");
    await io.homePage.clickByTextByIndex("TC_C2015_DND", 0);
    await io.homePage.loadingTime();

    test.step("*** Choosing desired flow ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ERROR_BUBBLE, 1);
    await io.homePage.loadingTime();
    await page.waitForTimeout(2000);
    var sourceEl = await page.getByText("MySQL").first();
    await expect(sourceEl).toBeVisible();
    test.step("*** Closing th error ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
});
