import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import json from "@testData/STANDALONE/TC_C33360.json";

test.describe("TC_C99348_C99351_C99365_C99366", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Deleting User
    test.step("*** Deleting invited user ***", async ()=>{});
    await io.api.deleteUserViaEmail("mahesh.nivrutti.sutar+delete7@celigo.com");
    await io.homePage.loadingTime();
  });
  test("TC_C99348_C99351_C99365_C99366 @Env-All @Zephyr-IO-T25384 @Zephyr-IO-T25387 @Zephyr-IO-T25401 @Zephyr-IO-T25402", async ({io,page}, testInfo) => {
    await io.api.inviteUserThruApi(json.newUser);
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
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
    
    //Invite User page
    //TC_C99348 Verify "Learn more about roles & permissions" link is redirecting to correct KB articles
    const link = await page.locator(selectors.basePagePO.LINK);
    const link1 = await link.getAttribute("href");
    await io.assert.expectToContainValue("https://docs.celigo.com/hc/en-us/articles/115003929872-Manage-account-and-integration-permissions",link1, "");
    test.step("*** Verifying  'Learn more about roles & permissions' link is redirecting to correct KB articles   ***", async ()=>{});

    //TC_C99351 Verify error message when we don't have any integration selected with custom role
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "mahesh.nivrutti.sutar+delete@celigo.com");
    test.step("*** filling mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 3);
    test.step("*** Choose admin tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicked on invite ***", async ()=>{});
    await io.homePage.loadingTime();
    
    //Error at Monitor integration
    var monitorText = await io.homePage.getText(selectors.basePagePO.MANAGEERR)
    await io.assert.expectToContainValue("A value must be provided",String(monitorText), "");
    //Error at Manage integration
    var manageText = await io.homePage.getText(selectors.basePagePO.MANAGEERR)
    await io.assert.expectToContainValue("A value must be provided",String(manageText), "");
    test.step("*** Verified error message when we don't have any integration selected with custom role ***", async ()=>{});

    //TC_C99365 Verify checking "Monitor all" will unchecks all selected integrations
    await io.homePage.click(selectors.basePagePO.INTEGRATIONSTOMONITOR);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 1);
    test.step("*** Selecting another intgration ***", async ()=>{});
    await io.homePage.loadingTime();
    const monitorAll = await page.$(selectors.myAccountPagePO.MONITOR_ALL_BUTTON);
    await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.MONITOR_ALL_BUTTON, "aria-selected", "false");
    test.step("*** Verified monitor all is unchecked ***", async ()=>{});
    await monitorAll.click();
    test.step("*** Clicking on 'Monitor all' ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.MONITOR_ALL_BUTTON, "aria-selected", "true");
    test.step("*** Verify checking 'Monitor all' will unchecks all selected integrations ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, "aria-selected", "false", 1);

    //TC_C99366 Verify checking an integration auto-unchecks "Monitor all"
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 1);
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.MONITOR_ALL_BUTTON, "aria-selected", "false");
    test.step("*** Verify checking an integration auto-unchecks 'Monitor all' ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.click(selectors.basePagePO.CANCELUSERFORM);
    await io.homePage.loadingTime();

    //Manage user page
    await io.homePage.loadingTime();
    const user_name = await page.$$(selectors.integrationPagePO.GETAL);
    const user_role = await page.$$(selectors.integrationPagePO.GETALL);
    const openAction = await page.$$(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    let userExist = false;
    for(var i = 0; i < user_name.length; i++) {
      let usernames = await user_name[i].textContent();
      let role = await user_role[i].textContent();
      if(usernames == "mahesh.nivrutti.sutar+delete7@celigo.com") {
        role == "Administrator";
        await openAction[i].click();
        userExist = true;
      }
    }
    await io.assert.expectToBeTrue(userExist, "");
    await io.homePage.click(selectors.basePagePO.MANAGEPERMISSION);
    test.step("*** Clicked on manage user ***", async ()=>{});
    await io.homePage.loadingTime();

    //TC_C99348 Verify "Learn more about roles & permissions" link is redirecting to correct KB articles
    const mlink = await page.locator(selectors.basePagePO.LINK);
    const mlink1 = await mlink.getAttribute("href");
    await io.assert.expectToContainValue("https://docs.celigo.com/hc/en-us/articles/115003929872-Manage-account-and-integration-permissions",mlink1, "");
    test.step("*** Verifying  'Learn more about roles & permissions' link is redirecting to correct KB articles   ***", async ()=>{});

    //TC_C99351 Verify error message when we don't have any integration selected with custom role
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 3);
    test.step("*** Choose admin tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    test.step("*** Clicked on save ***", async ()=>{});
    await io.homePage.loadingTime();

    //Error at Monitor integration
    var monitorTextm = await io.homePage.getText(selectors.basePagePO.MONITORERR)
    await io.assert.expectToContainValue("A value must be provided",String(monitorTextm), "");
    //Error at Manage integration
    var manageTextm =  await io.homePage.getText(selectors.basePagePO.MANAGEERR)
    await io.assert.expectToContainValue("A value must be provided",String(manageTextm), "");
    test.step("*** Verified error message when we don't have any integration selected with custom role ***", async ()=>{});

    //TC_C99365 Verify checking "Monitor all" will unchecks all selected integrations
    await io.homePage.click(selectors.basePagePO.INTEGRATIONSTOMONITOR);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 1);
    test.step("*** Selecting another intgration ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.MONITOR_ALL_BUTTON, "aria-selected", "false");
    test.step("*** Verified monitor all is unchecked ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.MONITOR_ALL_BUTTON);
    test.step("*** Clicking on 'Monitor all' ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.MONITOR_ALL_BUTTON, "aria-selected", "true");
    test.step("*** Verify checking 'Monitor all' will unchecks all selected integrations ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, "aria-selected", "false", 1);
      
    //TC_C99366 Verify checking an integration auto-unchecks "Monitor all"
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 1);
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.MONITOR_ALL_BUTTON, "aria-selected", "false");
    test.step("*** Verify checking an integration auto-unchecks 'Monitor all' ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.click(selectors.basePagePO.CANCELUSERFORM);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
