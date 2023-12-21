import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C56284 Verify all the available fields in the Forgot your password?(/request-reset) page",
  () => {
    test("C56284 Verify all the available fields in the Forgot your password?(/request-reset) page", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
      await io.assert.verifyElementDisplayedByText(
        "Forgot your password?",
        "'Forgot your password?' text is not displayed"
      );
      await io.assert.verifyElementIsDisplayed(
        selectors.loginPagePO.EMAIL_ID,
        "Email field is not displayed"
      );
      await io.assert.verifyElementIsDisplayed(
        selectors.basePagePO.SUBMIT,
        "Submit button is not displayed"
      );
    });
  }
);
