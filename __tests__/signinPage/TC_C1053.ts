import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(`C1053 Verify on clicking "Signin with Google" asks to login to google account(if not loggedinto the browser)`, () => {
  test(`C1053 Verify on clicking "Signin with Google" asks to login to google account(if not loggedinto the browser)`, async ({
    io
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
    await io.homePage.hover(selectors.basePagePO.ACCOUNT);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.clickByText("Sign in with Google");
    const text = await io.homePage.isVisible("text='Forgot email?'");
    await io.assert.expectToBeTrue(
      text,
      "page stating to login to the gmail account is not displayed"
    );
  });
});
