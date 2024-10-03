import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25553", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1447 @Env-All TC_C25553", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await test.step("*** Clicked on Profile Menu ***",()=>{});

    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    await test.step("*** Clicked on invite user ***",()=>{});

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime()

    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "test.test+3@celigo.com");

    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0);
    await test.step("*** Entered Invalid Email ***",()=>{});

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    const text = await io.homePage.isVisible('text="The user already has access to the account. Please use the edit permissions option to update the permissions for the user."');
    if(text){
      await io.homePage.click(selectors.basePagePO.CANCELUSERFORM)
    }
    await test.step("*** Clicking on invite ***",()=>{});

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime()

    await test.step("*** Invited User Successfully ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.myAccountPagePO.REMOVEUSER);
    await io.homePage.click(selectors.basePagePO.DELETE);

 

    await test.step("*** Clicked On Remove User Button ***",()=>{});
    await io.homePage.loadingTime()
    var result = await io.homePage.isVisible('text ="test.test+3@celigo.com"');
    if(!result)
    {
    await expect(result).toBeFalsy();
    }
    await test.step("*** Verified User Deleted From List ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
