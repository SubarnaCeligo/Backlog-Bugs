import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C66318 Verify Sign in via Google option is shown in profile page for EU domain",
  () => {
    test("C66318 Verify Sign in via Google option is shown in profile page for EU domain", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.assert.verifyElementDisplayedByText(
        "Sign in with Google",
        "'Sign in with Google' text is not displayed"
      );
    });
  }
);
