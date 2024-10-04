
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import json from "@testData/STANDALONE/TC_C33360.json";

test.describe("TC_C100164_C99363", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting invited user ***", async ()=>{});
    await io.api.deleteUserViaEmail("mahesh.nivrutti.sutar+delete7@celigo.com");
  });

  
  test("@Env-All @Zephyr-IO-T25408 TC_C100164", async ({io,page}, testInfo) => {
    const createdUSers = await io.api.inviteUserThruApi(json.newUser);

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicked on My Account ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    
    test.step("*** Clicked on User tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    test.step("*** Clicked on invite user ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "mahesh.nivrutti.sutar+delete7@celigo.com");
    test.step("*** filling mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0);
    test.step("*** Choose admin tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicked on invite ***", async ()=>{});

    await page.pause();
    //Error
    var errorText = await io.homePage.getText("[role='alert'] span")
    await io.assert.expectToContainValue("The user already has access to the account. Please use the edit permissions option to update the permissions for the user.", String(errorText),"");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CANCELUSERFORM);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  
  test("@Env-All @Zephyr-IO-T25408 TC_C99363", async ({io,page}, testInfo) => {
    await io.api.inviteUserThruApi(json.newUser);
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicked on My Account ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    test.step("*** Clicked on User tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    test.step("*** Clicked on invite user ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "mahesh.nivrutti.sutar+delete7@celigo.com");
    test.step("*** filling mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 3);
    test.step("*** Choose admin tab ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.INTEGRATIONSTOMONITOR);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 1);
    test.step("*** Selecting another intgration ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.loadingTime();
    var int1 = await io.homePage.getText(selectors.basePagePO.INTEGRATIONSTOMONITOR)
    await io.homePage.click(selectors.basePagePO.MANAGEINTEGRATION);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 0);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.loadingTime();
    var int2 = await io.homePage.getText(selectors.basePagePO.INTEGRATIONSTOMONITOR)
    await io.assert.expectToBeValue(String(int1), String(int2), "");
    
    await io.homePage.click(selectors.basePagePO.CANCELUSERFORM);
    await io.homePage.loadingTime();
    //Manage user
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
    await expect(userExist).toEqual(true);
    await io.homePage.click(selectors.basePagePO.MANAGEPERMISSION);
    test.step("*** Clicked on manage user ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 3);
    test.step("*** Choose admin tab ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.INTEGRATIONSTOMONITOR);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 1);
    test.step("*** Selecting another intgration ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.loadingTime();
    var int11 = await io.homePage.getText(selectors.basePagePO.INTEGRATIONSTOMONITOR)
    await io.homePage.click(selectors.basePagePO.MANAGEINTEGRATION);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 0);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.loadingTime();
    var int12 = await io.homePage.getText(selectors.basePagePO.INTEGRATIONSTOMONITOR)
    await io.assert.expectToBeValue(String(int11), String(int12), "");

    await io.homePage.click(selectors.basePagePO.CANCELUSERFORM);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
