import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25554", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1448 @Env-All  TC_C25554", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await test.step("*** Clicked on Profile Menu ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    await test.step("*** Clicked on invite user ***",()=>{});

    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "abc-@mail.com");

    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0);
    await test.step("*** Entered Invalid Email ***",()=>{});

    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await test.step("*** Clicking on invite ***",()=>{});
    const errText = await io.homePage.isVisible('text="New accounts must be attached to a valid business email address."');
     
    await await io.assert.expectToBeTrue(errText, "");
    await test.step("*** Verified User Error Shown For Invalid Email ***",()=>{});
    await io.homePage.click(selectors.basePagePO.CANCELUSERFORM)
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    await test.step("*** Cleared the Email Value ***",()=>{});
    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "test@celigo.com");
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0);
    await test.step("*** Entered Valid Email ***",()=>{});
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    const text = await io.homePage.isVisible('text="The user already has access to the account. Please use the edit permissions option to update the permissions for the user."');
    if(text){
      await io.homePage.click('[data-test="cancelUserForm"]')
    }
    await test.step("*** Clicking on invite ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.myAccountPagePO.REMOVEUSER);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await test.step("*** Clicked On Remove User Button ***",()=>{});
    var result = await io.homePage.getTextFromElement(selectors.myAccountPagePO.NAMETEXT, "test@celigo.com");
    await expect(result).toBeFalsy();
    await test.step("*** Verified User Deleted From List ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
