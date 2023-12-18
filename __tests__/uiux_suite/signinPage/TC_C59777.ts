import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C59777 Verify clicking on sign out page redirects to sign in page", () => {
  test("C59777 Verify clicking on sign out page redirects to sign in page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
    await io.homePage.hover(selectors.basePagePO.ACCOUNT);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    const regex = /signin$/;
    await page.waitForURL(regex);
    await io.assert.expectToContainValue(
      "signin",
      page.url(),
      "URL doesn't contain signin"
    );
    await io.homePage.addStep(
      "Verified user is redirected to signin page successfully"
    );
  });
});
