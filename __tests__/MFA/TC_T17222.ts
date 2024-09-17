import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe(`T17222 Verify if the Choose primary account to reset MFA text is not shown to owner`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Env-All @Zephyr-IO-T17222 Verify if the Choose primary account to reset MFA text is not shown to owner`, async ({ page, io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText('Enable MFA', 'Enable MFA not visible');
    await io.homePage.loadingTime();
    const isVisible = await io.myAccountPage.isVisible(selectors.myAccountPagePO.ALLOW_RESET_BY_USERID);
    expect(isVisible).toBeFalsy();
  })
})