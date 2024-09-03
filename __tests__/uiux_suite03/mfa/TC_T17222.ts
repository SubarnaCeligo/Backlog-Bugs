import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe(`T17222 Verify if the Choose primary account to reset MFA text is not shown to owner`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Env-All @Zephyr-IO-T17222 Verify if the Choose primary account to reset MFA text is not shown to owner`, async ({ page, io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);

    await io.assert.verifyElementDisplayedByText('Enable MFA', 'Enable MFA not visible');
    const isToggleEnable = await io.myAccountPage.isVisible(selectors.myAccountPagePO.MFA_ON_OFF);
    expect(!isToggleEnable).toBeTruthy();
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA_ENABLE_BUTTON);
    expect(page.getByText("Get verification app", { exact: true })).toBeVisible();
    const mfaChooseAccount = await page.$$("Choose primary account to reset MFA ");
    await io.assert.expectToBeValue("0", mfaChooseAccount.length.toString(), "Element is present which is not expected")
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA_ENABLE_BUTTON);

  })
})