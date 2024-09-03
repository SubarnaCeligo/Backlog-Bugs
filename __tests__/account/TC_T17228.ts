import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe(`C45819`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Env-All @Zephyr-IO-T17228 C45819 Verify if the Account Id and the secret key are shown when the user clicks on Manual details.`, async ({ page, io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.loadingTime();
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA_ENABLE_BUTTON);
    await io.myAccountPage.clickByText('View account & secret key');
    await io.myAccountPage.fill(selectors.basePagePO.NEW_PASSWORD, decrypt(process.env["IO_Password"]));
    await io.myAccountPage.click(selectors.myAccountPagePO.REAUTH);
    await expect(page.locator('text=/Account:/')).toBeVisible();
    await expect(page.locator('text=/Secret key:/')).toBeVisible();
  });
});
