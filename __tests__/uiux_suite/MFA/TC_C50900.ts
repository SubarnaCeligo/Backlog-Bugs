import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C50900 Verify the "Don't allow trusted devices" check box`, () => {
  test(`C50900 Verify the "Don't allow trusted devices" check box`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "myAccount/security/mfa"
    );
    await io.homePage.click(
      selectors.myAccountPagePO.DONT_ALLOW_TRUSTED_DEVICES_CHECKBOX
    );
    await expect(
      page.locator(selectors.myAccountPagePO.TRUST_DEVICES_FOR_DAYS_INPUT)
    ).toBeDisabled();
    await io.homePage.addStep(
      "Verified 'Number of days until MFA is required again for trusted devices' input is disabled"
    );
  });
});
