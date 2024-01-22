
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C753", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C753", async ({io,page}, testInfo) => {
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );
    await io.homePage.click(
      selectors.basePagePO.MY_PROFILE_BUTTON
    );
    await io.homePage.click(
      selectors.myAccountPagePO.EDIT_PASSWORD
    );

    var current = await io.homePage.isVisible(
      selectors.myAccountPagePO.CURRENT_PWD
    );
    expect(current).toBeTruthy();
await test.step(
      "Verified The fields Current password should be displayed"
, async ()=>{});
    await io.homePage.fillWebPage(
      selectors.myAccountPagePO.CURRENT_PWD,
      decrypt(process.env["IO_Password"])
    );
    await test.step("*** entered current password ***",()=>{});

    var current1 = await io.homePage.getText(
      "[for='currentPassword']"
    );

    var newPass = await io.homePage.isVisible(
      selectors.myAccountPagePO.NEW_PWD
    );
    expect(newPass).toBeTruthy();
await test.step(
      "Verified The fields New password should be displayed"
, async ()=>{});

    await io.homePage.fillWebPage(
      selectors.myAccountPagePO.NEW_PWD,
      decrypt(process.env["IO_Password"])
    );
    await test.step("*** entered new password ***",()=>{});

    await io.homePage.click(
      selectors.myAccountPagePO.CHANGEPASSWORDBTN
    );

    // var result = await page.$(
    //   "[class='MuiTypography-root MuiTypography-h6']"
    // ).getText();

    var result = await io.homePage.getText("[class='MuiTypography-root MuiTypography-h6']")

    await expect(result).toBe(
      "You are not allowed to choose a password that matches with the previous 20 passwords. Please choose another password."
    );
    await test.step("*** validated the error message ***",()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSEDRAWER);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
