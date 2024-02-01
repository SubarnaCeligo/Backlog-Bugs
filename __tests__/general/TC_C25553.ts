
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25553", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C25553", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    await test.step("*** Clicked on Profile Menu ***",()=>{});

    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    await test.step("*** Clicked on myAccount Menu ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    await test.step("*** Clicked on invite user ***",()=>{});

    await io.homePage.enterHugeData(selectors.basePagePO.EMAIL, "test.test+1@celigo.com");

    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADMIN, 0);
    await test.step("*** Entered Invalid Email ***",()=>{});

    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await test.step("*** Clicking on invite ***",()=>{});

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Invited User Successfully ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.myAccountPagePO.REMOVEUSER);
    await io.homePage.click(selectors.basePagePO.DELETE);

    await test.step("*** Clicked On Remove User Button ***",()=>{});
    var result = await io.homePage.getTextFromElement(selectors.myAccountPagePO.NAMETEXT, "abc.abc+1@celigo.com");
    await expect(result).toBeFalsy();
    await test.step("*** Verified User Deleted From List ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
