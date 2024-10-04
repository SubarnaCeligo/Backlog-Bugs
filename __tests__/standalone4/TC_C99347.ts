import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C99343.json";

test.describe("TC_C99343_C99345_C99347", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C99343_C99345_C99347_C99349 @Env-All @Zephyr-IO-T25379 @Zephyr-IO-T25381 @Zephyr-IO-T25383 @Zephyr-IO-T25385", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    test.step("*** Clicked on User tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    test.step("*** Clicked on invite user ***", async ()=>{});

    //TC_C99347 Verify padding for email field
    await io.assert.verifyElementAttributeContainsText(selectors.homePagePO.USERNAMEINPUT, "placeholder", "Separate addresses with a comma (,) to invite multiple users of the same role");

    //TC_C99343 Verify help text for below given places on Invite user page
    //Admin
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ROLEHELP, 0);
    test.step("*** Clicked on help icon for admin ***", async ()=>{});
    await io.homePage.loadingTime();
    const sele = await page.$$(selectors.basePagePO.HELPTE);
    var admin = await sele[0].textContent();
    await io.assert.expectToContainValue(TC.admin.admintext,String(admin), "");
    test.step("*** Verified help text for admin tab on Invite user page ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.loadingTime();

    //Manage all
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ROLEHELP, 1);
    test.step("*** Clicked on help icon for admin ***", async ()=>{});
    const sele1 = await page.$$(selectors.basePagePO.HELPTE);
    var manageALL = await sele1[0].textContent();
    await io.assert.expectToContainValue(TC.manageAll.manageText, String(manageALL), "");
    test.step("*** Verified help text for Manage All tab on Invite user page ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.loadingTime();

    //Monitor all
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ROLEHELP, 2);
    const sele2 = await page.$$(selectors.basePagePO.HELPTE);
    var monitorALL = await sele2[0].textContent();
    await io.assert.expectToContainValue(TC.monitorAll.monitorText, String(monitorALL), "");
    test.step("*** Verified help text for Monitor All tab on Invite user page ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.loadingTime();

    //Custom
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ROLEHELP, 3);
    test.step("*** Clicked on help icon for custom role ***", async ()=>{});
    const sele3 = await page.$$(selectors.basePagePO.HELPTE);
    var custom = await sele3[0].textContent();
    await io.assert.expectToContainValue(TC.custom.customText, String(custom), "");
    test.step("*** Verified help text for Custom tab on Invite user page ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.loadingTime();
    //TC_C99345 Verify User is not able to see "Integrations to manage" option test.afterEach clicking on "Monitor all" role
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 2);
    test.step("*** Clicking on Monitor all ***", async ()=>{});
    const value  = await io.homePage.isVisible(selectors.basePagePO.INTTOMAN);
    await io.assert.expectToBeFalse(value, "");
    test.step("*** Verified User is not able to see 'Integrations to manage' option test.afterEach clicking on 'Monitor all' role ***", async ()=>{});

    //TC_C99344 Verify all the labels and text for "Roles & permission"
    var sso = await io.homePage.getText(selectors.basePagePO.ROLESPERMISSION)
    await io.assert.expectToContainValue("Roles & permissions *",String(sso), "");

    //Admin
    var te = await page.$$(selectors.basePagePO.ADMIN);
    var adm = await te[0].textContent();
    await io.assert.expectToBeValue(String(adm), "AdminCan edit account settings, users and all integrations", "");

    //Manage All
    var man = await te[1].textContent();
    await io.assert.expectToContainValue("Manage allCan edit all integrations (current and future integrations)", String(man), "");

    //Monitor All
    var mon = await te[2].textContent();
    await io.assert.expectToContainValue("Monitor allCan view all integrations (current and future integrations)", String(mon), "");

    //Custom
    var cus = await te[3].textContent();
    await io.assert.expectToContainValue("CustomSelect which integrations can be viewed or edited  (monitored or managed)", String(cus), "");

    //Invite
    var sso1 = await io.homePage.getText(selectors.basePagePO.INVITEUSER2);
    await io.assert.expectToContainValue("Invite",String(sso1), "");
    test.step("*** Verified Save button text should be changed to 'Invite'  ***", async ()=>{});

    //TC_C99349 Verify if user choose "Custom" role then they are able to see dropdowns.
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 3);
    test.step("*** Clicking on Monitor all ***", async ()=>{});
    var drop1 = await(await page.locator(selectors.basePagePO.MANAGEINTE)
    ).isVisible();
    await io.assert.expectToBeTrue(drop1, "");
    var drop2 = await(await page.locator(selectors.basePagePO.MONITORINTE)
    ).isVisible();
    await io.assert.expectToBeTrue(drop2, "");
    test.step("*** Verified if user choose 'Custom' role then they are able to see dropdowns ***", async ()=>{});
    //B] Also changed label from "Please select" to "None selected"
    var non = await io.homePage.getText(selectors.basePagePO.INTEGRATIONSTOMONITOR);
    await io.assert.expectToContainValue("None selected",String(non), "");
    var non1 = await io.homePage.getText(selectors.basePagePO.MANAGEINTEGRATION);
    await io.assert.expectToContainValue("None selected",String(non1), "");
    test.step("*** Verified Also changed label from 'Please select' to 'None selected' ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
