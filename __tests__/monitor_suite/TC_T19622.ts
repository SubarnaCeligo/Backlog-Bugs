import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe(`T19622 Verify the shared user should not be able to see the account-level settings for trusted devices.
`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test(`@Env-All @Zephyr-IO-T19622 Verify the shared user should not be able to see the account-level settings for trusted devices.
  `, async ({ page, io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);

        await io.assert.verifyElementDisplayedByText('Enable MFA', 'Enable MFA not visible');
        const isToggleEnable = await io.myAccountPage.isVisible(selectors.myAccountPagePO.MFA_ON_OFF);
        expect(!isToggleEnable).toBeTruthy();
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA_TOGGLE);
        expect(page.getByText("Get verification app", { exact: true })).toBeVisible();
        expect(page.locator(selectors.myAccountPagePO.TRUST_DEVICES_FOR_DAYS_INPUT)).toBeHidden();
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA_TOGGLE);
        expect(page.getByText("Get verification app", { exact: true })).toBeHidden();

    })
})