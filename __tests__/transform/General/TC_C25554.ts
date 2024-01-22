
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25554", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C25554", async ({io,page}, testInfo) => {
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );
    await test.step("*** Clicked on Profile Menu ***",()=>{});

    await io.homePage.click(
      selectors.basePagePO.MY_PROFILE_BUTTON
    );
    await test.step("*** Clicked on myAccount Menu ***",()=>{});
    await io.homePage.click(selectors.myAccountPagePO.USERS);
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    await test.step("*** Clicked on invite user ***",()=>{});

    await io.homePage.enterHugeData(
      selectors.basePagePO.EMAIL,
      "abc-@mail.com"
    );

    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADMIN,
      0
    );
    await test.step("*** Entered Invalid Email ***",()=>{});

    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await test.step("*** Clicking on invite ***",()=>{});
    var result1 = await io.homePage.getTextFromElement(
      "[class='MuiSnackbarContent-message']",
      "New accounts must be attached to a valid business email address."
    );
    await expect(result1).toBeTruthy();
    await io.homePage.click(
      "[class='MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit']"
    );
await test.step(
      "*** Verified User Error Shown For Invalid Email ***"
, async ()=>{});
    await io.homePage.clearTextValue(
      selectors.loginPagePO.EMAIL
    );
    await test.step("*** Cleared the Email Value ***",()=>{});
    await io.homePage.enterHugeData(
      selectors.basePagePO.EMAIL,
      "test@celigo.com"
    );
    await test.step("*** Entered Valid Email ***",()=>{});
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await test.step("*** Clicking on invite ***",()=>{});
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
    var result = await io.homePage.getTextFromElement(
      selectors.myAccountPagePO.NAMETEXT,
      "test@celigo.com"
    );
    await expect(result).toBeFalsy();
    await test.step("*** Verified User Deleted From List ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
