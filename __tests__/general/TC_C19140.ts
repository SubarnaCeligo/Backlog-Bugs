import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";


test.describe("TC_C19140_Help_centre", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Navigate to Home Page ***", () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2241 @Env-All TC_C19140_Help_centre", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.homePagePO.HELPER_MENU);
    await test.step("*** Help center selected ***", () => { });

    var text = await io.homePage.isVisible(
      selectors.basePagePO.HELP_CENTRE
    );
    await test.step("Verified the Help centre  on home screen", () => { });
    expect(text).toBeTruthy();
    await io.homePage.click(selectors.basePagePO.HELP_CENTRE);
    await io.homePage.loadingTime()
    await test.step("*** Clicking on Help centre button ***", () => { });
    let page1 = await io.homePage.switchWindow()
    await io.homePage.loadingTime()
    const url = await page1.url();
    expect(url).toContain("integrator.io");
    
    
  });
});
