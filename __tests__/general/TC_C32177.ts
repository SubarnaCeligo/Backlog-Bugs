import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C32177", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C32177_int1");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C32177_int2");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C32177_int3");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);


  });
  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** End of Test Suite ***",()=>{});
    await io.api.deleteIntegrationRecursively("TC_C32177_int1");
    await io.api.deleteIntegrationRecursively("TC_C32177_int2");
    await io.api.deleteIntegrationRecursively("TC_C32177_int3");
  });
  test("@Zephyr-IO-T1456 @Env-All  TC_C32177", async ({io,page}, testInfo) => {
    const url = await io.homePage.getCurrentUrl();
    var result;
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.selectTabInProfileMenu("Users");
    await io.homePage.loadingTime();
      await io.homePage.click(
        selectors.basePagePO.INVITEUSER
      );
      await test.step("*** Clicked on Invite user ***",()=>{});
      
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "abc@celigo.com");
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
        "TC_C32177_int1"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C32177_int2"
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
      if(await io.homePage.isVisible('text="The user already has access to the account. Please use the edit permissions option to update the permissions for the user."')){
        await io.homePage.click(
          selectors.basePagePO.CANCELUSERFORM
        );
      }
      await io.homePage.loadingTime();
      await test.step("*** Clicked on save button ***",()=>{});
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      await io.api.deleteIntegrationRecursively("TC_C32177_int2");
      
await test.step(
        "*** Deleting integration of the above integration which has been used to share***"
, async ()=>{});
await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
await io.homePage.loadingTime();
await io.homePage.selectTabInProfileMenu("Users");
await io.homePage.loadingTime();
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
        "TC_C32177_int3"
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
      await io.homePage.loadingTime();
      result = await io.homePage.isVisible('text="abc@celigo.com"')
      await expect(result).toBeFalsy();
      await test.step("*** Verified User Deleted From List ***",()=>{});
     
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to Home page ***",()=>{});
  });
});
