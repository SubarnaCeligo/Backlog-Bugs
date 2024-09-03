import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C45826 Verify if the MFA details are retained when the owner enables MFA for an existing user again.`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`@Env-All @Zephyr-IO-T17234 C45826 Verify if the MFA details are retained when the owner enables MFA for an existing user again.`, async ({ page, io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
    await io.myAccountPage.loadingTime();

    const isToggleEnable = await io.myAccountPage.isVisible(selectors.myAccountPagePO.MFA_ON_OFF);

    //Check if the MFA is enabled
    expect(isToggleEnable).toBeTruthy();

    //Disable MFA
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA_ENABLE_BUTTON);
    await io.myAccountPage.loadingTime();
    expect(page.getByText("Reset MFA", { exact: true })).not.toBeVisible();
    expect(page.getByText("QR code", { exact: true })).not.toBeVisible();
    expect(page.getByText("Trusted devices", { exact: true })).not.toBeVisible();

    //Now Enable it again
    await io.myAccountPage.click(selectors.myAccountPagePO.MFA_ENABLE_BUTTON);
    await io.myAccountPage.loadingTime();
    //Initial setup should not be visible when we enable MFA again instead is should show th previsousl saved details
    expect(page.getByText("Get verification app", { exact: true })).not.toBeVisible();

    //Verify the MFA details are retained
    await io.assert.verifyElementDisplayedByText('Reset', 'Reset MFA button is not visible');
    await io.assert.verifyElementDisplayedByText('View code', 'View code button is not visible');
    await io.assert.verifyElementDisplayedByText('Manage devices', 'Manage devices button is not visible');
  });
});
