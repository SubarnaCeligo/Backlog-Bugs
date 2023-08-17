import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C50900 Verify the "Don't allow trusted devices" check box`, () => {
  test(`C50900 Verify the "Don't allow trusted devices" check box`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    await io.homePage.click(selectors.myAccountPagePO.SECURITY);
    await io.homePage.click(selectors.myAccountPagePO.MFA);
    await page
      .locator(selectors.myAccountPagePO.DONT_ALLOW_TRUSTED_DEVICES_CHECKBOX)
      .click();
    await expect(
      page.locator(selectors.myAccountPagePO.TRUST_DEVICES_FOR_DAYS_INPUT)
    ).toBeDisabled();
  });
});
