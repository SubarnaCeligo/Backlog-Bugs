import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C99367", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C99367 @Env-All @Zephyr-IO-T25403", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    test.step("*** Clicked on User tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    test.step("*** Clicked on invite user ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ROLEHELP, 0);
    test.step("*** Clicked on help icon for admin ***", async ()=>{});
    
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.THUMNSDOWNICON);
    test.step("*** Verified Thumbsdown icon under help text ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TEXTAREA);
    await page.keyboard.type("test");
    test.step("*** Verified placeholder text under help text ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HELPTEXTSUBMIT);
    test.step("*** Verified submit button under help text ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ROLEHELP, 0);
    test.step("*** Clicked on help icon for admin ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.THUMNSDOWNICON);
    test.step("*** Verified submit button under help text ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CANCELUSERFORM);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Yes/No' for 'Was this helpful' options of any help text should working fine   ***", async ()=>{});
  });
});
