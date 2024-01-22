
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C32177", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C32177", async ({io,page}, testInfo) => {
    const url = await io.homePage.getCurrentUrl();
    var result;
    if (process.env["NODE_ENV"] == "qa") {
      expect(url).toBe("https://qa.staging.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.click(
        selectors.homePagePO.PROFILE_MENU
      );
      await test.step("*** Clicked on Profile Menu ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.MY_PROFILE_BUTTON
      );
      await test.step("*** Clicked on My account ***",()=>{});
      await io.homePage.click(selectors.myAccountPagePO.USERS);
      await test.step("*** Clicked on Users page ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.INVITEUSER
      );
      await test.step("*** Clicked on Invite user ***",()=>{});
      await io.homePage.fillWebPage(
        selectors.homePagePO.USERNAMEINPUT,
        "test4@celigo.com"
      );
      await test.step("*** Entering the email ***",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.basePagePO.ADMIN,
        3
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "DNDINTEGRATION2"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C32177_DND1"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C32177_DND"
      );
await test.step(
        "*** Giving manage access to integartions ***"
, async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT
      );
      await io.homePage.click(
        selectors.basePagePO.INVITEUSER2
      );
      await test.step("*** Clicked on save button ***",()=>{});
      await io.homePage.click(selectors.basePagePO.HOME);
      const tileName = "TC_C32177_DND";
      const integrationTile = await io.integrationPage.getIntegrationTileByName(
        tileName
      );
      await integrationTile
        .$(selectors.integrationPagePO.INTEGRATIONNAME)
        .click();
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await test.step("*** Navigate to  desired Integration ***",()=>{});
      await io.homePage.click(
        selectors.homePagePO.DELETE_INTEGRATION
      );
      await io.homePage.click(
        selectors.basePagePO.DELETE
      );
await test.step(
        "*** Deleting integration of the above integration which has been used to share***"
, async ()=>{});
      await io.homePage.click(
        selectors.homePagePO.PROFILE_MENU
      );
      await test.step("*** Clicked on Profile Menu ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.MY_PROFILE_BUTTON
      );
      await test.step("*** Clicked on My account ***",()=>{});
      await io.homePage.click(selectors.myAccountPagePO.USERS);
      await test.step("*** Navigating back to users page ***",()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEPERMISSION
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C1594_DND"
      );
await test.step(
        "*** Adding another integration to manage  ***"
, async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT
      );
      await io.homePage.click(
        selectors.basePagePO.MFA_SAVE
      );
      await test.step("*** Clicked on save button  ***",()=>{});
await test.step(
        "*** Verified able to update user manage permission access   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        selectors.myAccountPagePO.REMOVEUSER
      );
      await io.homePage.click(
        selectors.basePagePO.DELETE
      );
      await test.step("*** Clicked On Remove User Button ***",()=>{});
      result = await io.homePage.getTextFromElement(
        selectors.myAccountPagePO.NAMETEXT,
        "test4@celigo.com"
      );
      await expect(result).toBeFalsy();
      await test.step("*** Verified User Deleted From List ***",()=>{});
      await io.homePage.click(selectors.basePagePO.HOME);
      await io.homePage.click(
        selectors.homePagePO.CREATE_NEW_INTEGRATION
      );
      await io.homePage.fillWebPage(
        selectors.basePagePO.ADD_NAME,
        "TC_C32177_DND"
      );
      await io.homePage.click(
        selectors.basePagePO.SAVE_AND_CLOSE
      );
    } else if (process.env["NODE_ENV"] == "qaprod") {
      expect(url).toBe("https://qaprod.staging.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.click(
        selectors.homePagePO.PROFILE_MENU
      );
      await test.step("*** Clicked on Profile Menu ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.MY_PROFILE_BUTTON
      );
      await test.step("*** Clicked on My account ***",()=>{});
      await io.homePage.click(selectors.myAccountPagePO.USERS);
      await test.step("*** Clicked on Users page ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.INVITEUSER
      );
      await test.step("*** Clicked on Invite user ***",()=>{});
      await io.homePage.fillWebPage(
        selectors.homePagePO.USERNAMEINPUT,
        "test4@celigo.com"
      );
      await test.step("*** Entering the email ***",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.basePagePO.ADMIN,
        3
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "DNDINTEGRATION2"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C32177_DND1"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C32177_DND"
      );
await test.step(
        "*** Giving manage access to integartions ***"
, async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT
      );
      await io.homePage.click(
        selectors.basePagePO.INVITEUSER2
      );
      await test.step("*** Clicked on save button ***",()=>{});
      await io.homePage.click(selectors.basePagePO.HOME);
      const tileName = "TC_C32177_DND";
      const integrationTile = await io.integrationPage.getIntegrationTileByName(
        tileName
      );
      await integrationTile
        .$(selectors.integrationPagePO.INTEGRATIONNAME)
        .click();
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await test.step("*** Navigate to  desired Integration ***",()=>{});
      await io.homePage.click(
        selectors.homePagePO.DELETE_INTEGRATION
      );
      await io.homePage.click(
        selectors.basePagePO.DELETE
      );
await test.step(
        "*** Deleting integration of the above integration which has been used to share***"
, async ()=>{});
      await io.homePage.click(
        selectors.homePagePO.PROFILE_MENU
      );
      await test.step("*** Clicked on Profile Menu ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.MY_PROFILE_BUTTON
      );
      await test.step("*** Clicked on My account ***",()=>{});
      await io.homePage.click(selectors.myAccountPagePO.USERS);
      await test.step("*** Navigating back to users page ***",()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEPERMISSION
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C1594_DND"
      );
await test.step(
        "*** Adding another integration to manage  ***"
, async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT
      );
      await io.homePage.click(
        selectors.basePagePO.MFA_SAVE
      );
      await test.step("*** Clicked on save button  ***",()=>{});
await test.step(
        "*** Verified able to update user manage permission access   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        selectors.myAccountPagePO.REMOVEUSER
      );
      await io.homePage.click(
        selectors.basePagePO.DELETE
      );
      await test.step("*** Clicked On Remove User Button ***",()=>{});
      result = await io.homePage.getTextFromElement(
        selectors.myAccountPagePO.NAMETEXT,
        "test4@celigo.com"
      );
      await expect(result).toBeFalsy();
      await test.step("*** Verified User Deleted From List ***",()=>{});
      await io.homePage.click(selectors.basePagePO.HOME);
      await io.homePage.click(
        selectors.homePagePO.CREATE_NEW_INTEGRATION
      );
      await io.homePage.fillWebPage(
        selectors.basePagePO.ADD_NAME,
        "TC_C32177_DND"
      );
      await io.homePage.click(
        selectors.basePagePO.SAVE_AND_CLOSE
      );
    } else {
      await io.homePage.click(
        selectors.homePagePO.PROFILE_MENU
      );
      await test.step("*** Clicked on Profile Menu ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.MY_PROFILE_BUTTON
      );
      await test.step("*** Clicked on My account ***",()=>{});
      await io.homePage.click(selectors.myAccountPagePO.USERS);
      await test.step("*** Clicked on Users page ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.INVITEUSER
      );
      await test.step("*** Clicked on Invite user ***",()=>{});
      await io.homePage.fillWebPage(
        selectors.homePagePO.USERNAMEINPUT,
        "test4@celigo.com"
      );
      await test.step("*** Entering the email ***",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.basePagePO.ADMIN,
        3
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "DNDINTEGRATION2"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C32177_DND1"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C32177_DND"
      );
await test.step(
        "*** Giving manage access to integartions ***"
, async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT
      );
      await io.homePage.click(
        selectors.basePagePO.INVITEUSER2
      );
      await test.step("*** Clicked on save button ***",()=>{});
      await io.homePage.click(selectors.basePagePO.HOME);
      const tileName = "TC_C32177_DND";
      const integrationTile = await io.integrationPage.getIntegrationTileByName(
        tileName
      );
      await integrationTile
        .$(selectors.integrationPagePO.INTEGRATIONNAME)
        .click();
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await test.step("*** Navigate to  desired Integration ***",()=>{});
      await io.homePage.click(
        selectors.homePagePO.DELETE_INTEGRATION
      );
      await io.homePage.click(
        selectors.basePagePO.DELETE
      );
await test.step(
        "*** Deleting integration of the above integration which has been used to share***"
, async ()=>{});
      await io.homePage.click(
        selectors.homePagePO.PROFILE_MENU
      );
      await test.step("*** Clicked on Profile Menu ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.MY_PROFILE_BUTTON
      );
      await test.step("*** Clicked on My account ***",()=>{});
      await io.homePage.click(selectors.myAccountPagePO.USERS);
      await test.step("*** Navigating back to users page ***",()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEPERMISSION
      );
      await io.homePage.click(
        selectors.basePagePO.MANAGEINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C1594_DND"
      );
await test.step(
        "*** Adding another integration to manage  ***"
, async ()=>{});
      await io.homePage.click(
        selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT
      );
      await io.homePage.click(
        selectors.basePagePO.MFA_SAVE
      );
      await test.step("*** Clicked on save button  ***",()=>{});
await test.step(
        "*** Verified able to update user manage permission access   ***"
, async ()=>{});
      await io.homePage.click(
        selectors.integrationPagePO.OPENACTIONSMENU
      );
      await io.homePage.click(
        selectors.myAccountPagePO.REMOVEUSER
      );
      await io.homePage.click(
        selectors.basePagePO.DELETE
      );
      await test.step("*** Clicked On Remove User Button ***",()=>{});
      var result1 = await io.homePage.getTextFromElement(
        selectors.myAccountPagePO.NAMETEXT,
        "test4@celigo.com"
      );
      await expect(result1).toBeFalsy();
      await test.step("*** Verified User Deleted From List ***",()=>{});
      await io.homePage.click(selectors.basePagePO.HOME);
      await io.homePage.click(
        selectors.homePagePO.CREATE_NEW_INTEGRATION
      );
      await io.homePage.fillWebPage(
        selectors.basePagePO.ADD_NAME,
        "TC_C32177_DND"
      );
      await io.homePage.click(
        selectors.basePagePO.SAVE_AND_CLOSE
      );
    }
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to Home page ***",()=>{});
  });
});
