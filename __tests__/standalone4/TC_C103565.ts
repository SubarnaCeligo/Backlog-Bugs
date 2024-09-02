
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C103565", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.loadingTime();
  });

  test("TC_C103565_C103566 @Zephyr-IO-T22207 @Env-All", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    // @Zephyr-IO-T22206 OBSOLETE: The following code block is commented out because the HELP menu options have been transfered to Pendo.
    //TC_C103565 Verify added re-direct logo for What’s New, Submit tickets, Help centre, Community.
    // await(await page.locator(selectors.basePagePO.HELP)).hover();
    // await io.homePage.loadingTime();
    // var logo = await page.$$(selectors.basePagePO.LINKLOGO);
    // var logos = logo.length;
    // await expect(logos).toEqual(4);
    // await expect(await logo[0].isVisible()).toBeTruthy();
    // await expect(await logo[1].isVisible()).toBeTruthy();
    // await expect(await logo[2].isVisible()).toBeTruthy();
    // await expect(await logo[3].isVisible()).toBeTruthy();

    //TC_C103566 Verify "SIGN OUT" button showing for Account sub menu
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );
    await io.homePage.loadingTime();
    var signOutButton = await io.homePage.isVisible(
      selectors.basePagePO.SIGN_OUT
    );
    await io.assert.expectToBeTrue(signOutButton, "Sign Out button is not visible");
    test.step("***  Verifying 'SIGN OUT' button showing for Account sub menu  ***", async ()=>{});
    await io.assert.verifyElementContainsText(selectors.basePagePO.SIGN_OUT, "SIGN OUT");
    test.step("***  Verifying 'SIGN OUT' button label should be `SIGN OUT`  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
