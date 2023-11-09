import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C67038 Verify if the error message is shown when the user tries to signup using google with an invalid email", () => {
    test("C67038 Verify if the error message is shown when the user tries to signup using google with an invalid email", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
      await io.homePage.clickByText('Sign up with Google');
      await io.homePage.fill(selectors.loginPagePO.IDENTIFIER_ID, 'invalidEmailValidation@celigo.com');
      await io.homePage.clickByTextByIndex('Next', 0);
      await io.assert.verifyElementDisplayedByText('Couldn’t find your Google Account', 'No error message');
    });
  });