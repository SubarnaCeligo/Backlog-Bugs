import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe(`C46990 Verify if the user is able to view the secret key when he clicks on the view icon.`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Env-All @Zephyr-IO-T17246 C46990 Verify if the user is able to view the secret key when he clicks on the view icon.`, async ({ page, io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.loadingTime();

    const isToggleEnable = await io.myAccountPage.isVisible(selectors.myAccountPagePO.MFA_ON_OFF);
    expect(isToggleEnable).toBeTruthy();

    let secret = await page.locator(selectors.myAccountPagePO.SECRET_KEY_INPUT).getAttribute('value');
    expect(secret).toBe('xxxxxxxxx');
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA_SHOW_SECRET_KEY);
    await io.myAccountPage.fill(selectors.basePagePO.NEW_PASSWORD, decrypt(process.env["IO_Password"]));
    await io.myAccountPage.click(selectors.myAccountPagePO.REAUTH);
    await io.myAccountPage.loadingTime();
    secret = await page.locator(selectors.myAccountPagePO.SECRET_KEY_INPUT).getAttribute('value');
    expect(secret).not.toBe('xxxxxxxxx');
  });
});
