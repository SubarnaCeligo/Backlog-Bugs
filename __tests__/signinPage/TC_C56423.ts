import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C56423 Verify the error message are displayed when signup is clicked without clicking the mandatory fields in signup page",
  () => {
    test("C56423 Verify the error message are displayed when signup is clicked without clicking the mandatory fields in signup page", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
      expect(page.url()).toContain("/signup");
      await io.homePage.addStep("Verified user is navigated to signup page");
      await io.homePage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
      await io.assert.verifyElementDisplayedByText(
        "Name is required.",
        "'Name is required.' text is not displayed"
      );
      await io.assert.verifyElementDisplayedByText(
        "Business email is required.",
        "'Business email is required.' text is not displayed"
      );
      await io.assert.verifyElementDisplayedByText(
        "You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.",
        "'You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.' text is not displayed"
      );
    });
  }
);
