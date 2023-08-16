import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C50900 Verify the "Don't allow trusted devices" check box`, () => {
  test(`C50900 Verify the "Don't allow trusted devices" check box`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // TODO: selectors.basePagePO.ACCOUNT_BUTTON
    await io.homePage.click('[data-test="profileMenu"]');
    // TODO: selectors.basePagePO.MY_PROFILE_BUTTON
    await io.homePage.click('[data-test="myAccountOrMyProfile"]');
    await io.homePage.click(selectors.myAccountPagePO.SECURITY);
    await io.homePage.click(selectors.myAccountPagePO.MFA);
    // TODO: selectors.myAccountPagePO.DONT_ALLOW_TRUSTED_DEVICES_CHECKBOX
    await page.locator('[data-test="dontAllowTrustedDevices"] input').click();
    // TODO: selectors.myAccountPagePO.TRUST_DEVICES_FOR_DAYS_INPUT
    await expect(
      page.locator('[data-test="trustDeviceForPeriod"] input')
    ).toBeDisabled();
  });
});
