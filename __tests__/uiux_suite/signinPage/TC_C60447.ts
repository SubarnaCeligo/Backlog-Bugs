import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C60447 To verify that the user is able to view masked/unmasked password on Password field.", () => {
    test("C60447 To verify that the user is able to view masked/unmasked password on Password field.", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
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