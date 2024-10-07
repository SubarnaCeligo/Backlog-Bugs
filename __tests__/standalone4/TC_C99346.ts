import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import json from "@testData/STANDALONE/TC_C33360.json";

test.describe("TC_C99346_C99359_C99355_C99356_C99357", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();

    //Delete invited user
    await io.api.deleteUserViaEmail("mahesh.nivrutti.sutar+delete1@celigo.com");
    await io.api.deleteUserViaEmail("mahesh.nivrutti.sutar+delete2@celigo.com");
    await io.api.deleteUserViaEmail("mahesh.nivrutti.sutar+delete3@celigo.com");
    await io.api.deleteUserViaEmail("mahesh.nivrutti.sutar+delete4@celigo.com");
    await io.api.deleteUserViaEmail("mahesh.nivrutti.sutar+delete5@celigo.com");
    await io.homePage.loadingTime();
  });
  test("TC_C99346_C99359 @Env-All @Zephyr-IO-T25382 @Zephyr-IO-T25395", async ({io,page}, testInfo) => {
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    test.step("*** Clicked on User tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    test.step("*** Clicked on invite user ***", async ()=>{});
    await io.homePage.loadingTime();

    //TC_C99346 Verify user is able to invite 5 user at a time
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, json.validEmail.Emails);
    test.step("*** filling five valid mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0);
    test.step("*** Choose admin tab ***", async ()=>{});

    //TC_C99359 Verify user should be able to invite 5 user with "Require MFA" option
    await io.homePage.click(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
    test.step("*** Clicking on Require MFA ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicking on invite ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("TC_C99356_Monitor_All_Role @Env-All @Zephyr-IO-T25392", async ({io,page}, testInfo) => {
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    test.step("*** Clicked on User tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    test.step("*** Clicked on invite user ***", async ()=>{});
    await io.homePage.loadingTime();

    //TC_C99346 Verify user is able to invite 5 user at a time
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, json.validEmail.Emails);
    test.step("*** filling five valid mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 2);
    test.step("*** Choose admin tab ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicking on invite ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("TC_C99355_Manage_All_Role @Env-All @Zephyr-IO-T25391", async ({io,page}, testInfo) => {
    await io.homePage.reloadPage();
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
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, json.validEmail.Emails);
    test.step("*** filling five valid mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 1);
    test.step("*** Choose manage all tab ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicking on invite ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("TC_C99357_Custom_Role @Env-All @Zephyr-IO-T25393", async ({io,page}, testInfo) => {
    await io.homePage.reloadPage();
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
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, json.validEmail.Emails);
    test.step("*** filling five valid mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 3);
    test.step("*** Choose admin tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.INTEGRATIONSTOMONITOR);
    await io.homePage.click(selectors.myAccountPagePO.MONITOR_ALL_BUTTON);
    test.step("*** Selecting another intgration ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicking on invite ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
