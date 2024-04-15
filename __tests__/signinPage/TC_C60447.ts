import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C60447 To verify that the user is able to view masked/unmasked password on Password field.", () => {
    test.beforeEach('check sign out', async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        const isNotLoggedIn = await io.loginPage.checkLoginState();
        if (!isNotLoggedIn) {
          await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
          await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
          await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
          await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        }
      })
    test("C60447 To verify that the user is able to view masked/unmasked password on Password field.", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
        await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
        await io.homePage.click(selectors.homePagePO.SIGN_OUT);
        await io.loginPage.waitForElementAttached(selectors.loginPagePO.PASSWORD);
        let passwordField = page.locator(selectors.loginPagePO.PASSWORD);
        expect(await passwordField.getAttribute('type')).toBe('password');
        await io.loginPage.click(selectors.loginPagePO.HIDE_PASSWORD);
        passwordField = page.locator(selectors.loginPagePO.PASSWORD);
        expect(await passwordField.getAttribute('type')).toBe('text');
    });
});