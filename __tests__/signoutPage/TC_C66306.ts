import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C66306 Verify Sign up with Google is enabled on NA Sign up page", () => {
  test("@Env-All @Zephyr-IO-T20887 C66306 Verify Sign up with Google is enabled on NA Sign up page", async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.assert.verifyElementDisplayedByText(
      "Sign up with Google",
      "Sign up with Google is not displayed"
    );
  });
});
