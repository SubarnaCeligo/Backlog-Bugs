import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C56283 Verify clicking on the forgot password page from signin page is navigating to the forgot password page(/request-reset)",
  () => {
    test("C56283 Verify clicking on the forgot password page from signin page is navigating to the forgot password page(/request-reset)", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
      await io.assert.expectToContainValue(
        "/request-reset",
        page.url(),
        "User is not re-directing to forgot password page."
      );
    });
  }
);
