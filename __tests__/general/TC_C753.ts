import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C753", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1402 @Env-All TC_C753", async ({io,page}, testInfo) => {
    // await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await io.homePage.loadingTime()
    await io.homePage.isPageLoaded()
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.myAccountPagePO.EDIT_PASSWORD);

    var current = await io.homePage.isVisible(selectors.myAccountPagePO.CURRENT_PWD);
    await io.assert.expectToBeTrue(current, "");
    await test.step("Verified The fields Current password should be displayed",()=>{});
    await io.homePage.fillWebPage(selectors.myAccountPagePO.CURRENT_PWD, decrypt(process.env["IO_Password"])
    );
    await test.step("*** entered current password ***",()=>{});

    var current1 = selectors.myAccountPagePO.CURRENT_PWD1

    var newPass = await io.homePage.isVisible(selectors.myAccountPagePO.NEW_PWD);
    await io.assert.expectToBeTrue(newPass, "");
    await test.step("Verified The fields New password should be displayed",()=>{});

    await io.homePage.fillWebPage(selectors.myAccountPagePO.NEW_PWD, decrypt(process.env["IO_Password"])
    );
    await test.step("*** entered new password ***",()=>{});

    await io.homePage.click(selectors.myAccountPagePO.CHANGE_PASSWORD);

    const text = await io.homePage.isVisible('text="You are not allowed to choose a password that matches with the previous 20 passwords. Please choose another password."')
    expect(text).toBeTruthy();
     
    await io.homePage.click(selectors.basePagePO.CLOSEDRAWER);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
