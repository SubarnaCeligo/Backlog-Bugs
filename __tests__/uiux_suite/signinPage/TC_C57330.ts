import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C57330 Verify if the user is logged out we should be navigating to signin page as expected", () => {
    test("C57330 Verify if the user is logged out we should be navigating to signin page as expected", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
        await page.hover(selectors.basePagePO.ACCOUNT);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, 'Sign in button is not displayed after sign out');
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL_ID, 'Email input is not displayed after sign out');
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD_ID, 'Password input is not displayed after sign out');
    });
  });
  