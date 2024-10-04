import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import json from "@testData/STANDALONE/TC_C33360.json";

test.describe("TC_C99368_C99360_C99361_C99362_C99364_C99350_C99353_C99369", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C99350_C99353_C99368_C99369 @Env-All @Zephyr-IO-T25386 @Zephyr-IO-T25389 @Zephyr-IO-T25404 @Zephyr-IO-T25405", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    await io.homePage.loadingTime();
    test.step("*** Clicked on User tab ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    test.step("*** Clicked on invite user ***", async ()=>{});

    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "mahesh.nivrutti.sutar+delete@celigo.com");
    test.step("*** filling six mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0);
    test.step("*** Choose admin tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicked on invite ***", async ()=>{});
    await io.homePage.loadingTime();
    // TC_C99369 Verify role displayed test.afterEach inviting a user say 'Manage all' or 'Monitor all'
    const user_name = await page.$$(selectors.integrationPagePO.GETAL);
    const user_role = await page.$$(selectors.integrationPagePO.GETALL);
    const openAction = await page.$$(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    const removeUser = await page.locator(
      selectors.myAccountPagePO.REMOVEUSER
    );
    const deleteUser = await page.locator(
      selectors.basePagePO.DELETE
    );
    let userExist = false;
    for(var i = 0; i < user_name.length; i++) {
      let usernames = await user_name[i].textContent();
      let role = await user_role[i].textContent();
      if(usernames == "mahesh.nivrutti.sutar+delete@celigo.com") {
        if (role === "Admin") {
          await openAction[i].click();
          userExist = true;
        }
      }
    }
    await io.assert.expectToBeTrue(userExist, "");

    //TC_C99368 Verify options displayed on Action menu of invited user
    //TC_C99350 Verify "Manage permissions" label changed to "Manage user"
    const role = await io.homePage.getText(selectors.mappings.TOOLTIP);
    await io.assert.expectToContainValue("Remove user from account", String(role), "");
    await io.assert.expectToContainValue("Manage user", String(role), "");
    await removeUser.click();
    await deleteUser.click();
    test.step("*** Clicked on option action ***", async ()=>{});
    await io.homePage.loadingTime();
    //TC_C99353 Verify "Access level" label changed to "Role"
    const Role = await io.homePage.getText(selectors.mappings.ROLE);
    await io.assert.expectToContainValue("Role", String(Role), "");
    test.step("*** Verified Label should changed to 'Role' ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.mappings.ROLEHELP, 0);
    test.step("*** Clicked on help text ***", async ()=>{});
    const Role1 = await io.homePage.getText(selectors.exportsPagePO.TITLE);
    await io.assert.expectToContainValue("Role", String(Role1), "");
    test.step("*** Verified Label should changed to 'Role' in the Help text header as well. ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.mappings.ROLEHELP, 0);
    await io.homePage.loadingTime();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("TC_C99360_C99361_C99362_C99364 @Env-All @Zephyr-IO-T25396 @Zephyr-IO-T25397 @Zephyr-IO-T25398 @Zephyr-IO-T25400", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    test.step("*** Clicked on User tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    test.step("*** Clicked on invite user ***", async ()=>{});

    //TC_C99364 Verify 'Emails' & 'Roles&permision' this are mandatory fields
    await io.homePage.click(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
    test.step("*** Clicked on Require MFA ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicked on invite ***", async ()=>{});
    await io.homePage.loadingTime();
    //Email
    var error = await page.$$(selectors.flowGroupingPagePO.FG_ERROR_MSG);
    const err = await error[0].textContent();
    await io.assert.expectToContainValue("A value must be provided. Please enter a valid email address",err, "");
    //Role&Permission
    const errr = await error[1].textContent();
    await io.assert.expectToContainValue("A value must be provided",errr, "");
    test.step("*** Verified 'Emails' & 'Roles&permision' this are mandatory fields ***", async ()=>{});

    //TC_C99360 Verify test is showing error message if user add more that 5 mail
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, json.sixEmail.Emails);
    test.step("*** filling six mail in the mail field ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0);
    test.step("*** Choose admin tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicked on invite ***", async ()=>{});
    await io.homePage.loadingTime();
    const errro = await io.homePage.getText(selectors.basePagePO.NOTIFICATION_ID);
    await io.assert.expectToContainValue("Number of invites in the request exceeds maximum allowed limit 5.",String(errro), "");
    test.step("*** Verified test is showing error message if user add more that 5 mail ***", async ()=>{});
    await io.homePage.loadingTime();
    //TC_C99361 Verify test is showing error message if user not provide any wrong/comma separated email
    let form = await page.locator(selectors.basePagePO.EMAIL);
    await form.dblclick();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Delete');
    await io.homePage.loadingTime();
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, json.wrongEmail.Emails);
    test.step("*** filling wrong/comma separated email in the mail field ***", async ()=>{});
    await io.homePage.loadingTime();
    var error1 = await page.$$(selectors.flowGroupingPagePO.FG_ERROR_MSG);
    const er = await error1[0].textContent();
    await io.assert.expectToContainValue("Please enter a valid email address",er, "");
    test.step("*** Verified test is showing error message if user not provide any wrong/comma separated email ***", async ()=>{});

    //TC_C99362 Verify test is showing error message if user provide duplicate email
    await form.dblclick();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Delete');

    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, json.duplicateEmail.Emails);
    test.step("*** filling duplicate mail in the mail field ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    test.step("*** Clicked on invite ***", async ()=>{});
    const err3 = await io.homePage.getText(selectors.basePagePO.NOTIFICATION_ID);
    await io.assert.expectToContainValue("Duplicate emails found in the request.",String(err3), "");
    test.step("*** Verified test is showing error message if user provide duplicate email ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
