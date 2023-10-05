
import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import {decrypt} from "@celigo/aut-utilities";


test.describe("C50895 Verify the trusted device message for account owner", () => {
    test.beforeEach('check sign out', async({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        const isNotLoggedIn = await io.loginPage.checkLoginState();
        if(!isNotLoggedIn){
            await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
            await page.hover(selectors.basePagePO.ACCOUNT);
            await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        }
    })
    test("C50895 Verify the trusted device message for account owner. ", async ({io, page}) => {
        await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
        await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        await io.assert.verifyElementContainsText(selectors.loginPagePO.CLIENT_SNACKBAR, 'You are signing in from a new device. Enter your passcode to verify your account.');
    });

  });