import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe(`C46937`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Env-All @Zephyr-IO-T17244 C46937 Verify if the dialog box is shown correctly when the user leaves the MFA setup in between.`, async ({ page, io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.loadingTime();
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA_ENABLE_BUTTON);
    await io.myAccountPage.clickByText('View QR code');
    await io.myAccountPage.fill(selectors.basePagePO.NEW_PASSWORD, decrypt(process.env["IO_Password"]));
    await io.myAccountPage.click(selectors.myAccountPagePO.REAUTH);
    await io.myAccountPage.fill(selectors.myAccountPagePO.MOBILE_CODE, 123456);
    await io.myAccountPage.click(selectors.myAccountPagePO.SSO);

    await io.assert.verifyElementDisplayedByText('Cancel MFA setup?', 'Cancel MFA is not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON, "Cancel button not there in the dialog box");
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.MFA_CONTINUE_SETUP, "Cancel button not there in the dialog box");
  });
});
