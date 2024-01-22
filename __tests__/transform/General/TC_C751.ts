
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C751", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C751", async ({io,page}, testInfo) => {
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

    var current1 = await io.homePage.getText(
      "[for='currentPassword']"
    );
    expect(current1).toEqual("Current password");
await test.step(
      "Verified The spelling for Current password field"
, async ()=>{});

    var newPass = await io.homePage.isVisible(
      selectors.myAccountPagePO.NEW_PWD
    );
    expect(newPass).toBeTruthy();
await test.step(
      "Verified The fields New password should be displayed"
, async ()=>{});
    var newPass1 = await io.homePage.getText(
      "[for='newPassword']"
    );
    expect(newPass1).toEqual("New password");
await test.step(
      "Verified The Spelling for New password field"
, async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSEDRAWER);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
