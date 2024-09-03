import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
    "T17217 Verify if the default value for Require MFA is disabled",
    () => {
        test("@Env-All @Zephyr-IO-T17217 Verify if the default value for Require MFA is disabled.", async ({
            io,
            page
        }) => {
            const email = "T17217test@test.com";
            await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL)
            await io.myAccountPage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON)
            await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON)

            await io.homePage.click(selectors.myAccountPagePO.USERS)
            const alreadyEmailThere = await page.getByText(email).isVisible();
            if (alreadyEmailThere) {
                await page.getByRole('row', { name: 't17217test@test.com Admin' }).locator('svg').nth(3).isDisabled();
                await page.getByRole('row', { name: 't17217test@test.com Admin' }).locator(selectors.myAccountPagePO.OPEN_ACTIONSMENU).click();
                await io.myAccountPage.click(selectors.myAccountPagePO.REMOVEUSER);
                await io.myAccountPage.click(selectors.basePagePO.DELETE);
                await page.getByText(email).isHidden();
            }

            await io.myAccountPage.clickByText('Invite user')

            await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED)

            // Assert that the toggle is unchecked
            await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED, 'aria-checked', 'false');
            await io.myAccountPage.fill(
                selectors.myAccountPagePO.INVITE_EMAIL_TEXTAREA,
                email
            );
            await page.getByText('Can edit account settings, users and all integrations').click();
            await io.myAccountPage.click(selectors.basePagePO.INVITEUSER2);
            await page.getByText('Can edit account settings, users and all integrations').isHidden();
            await page.getByText(email).isVisible();
            await page.getByRole('row', { name: 't17217test@test.com Admin' }).locator('svg').nth(3).isEnabled();
            await page.getByRole('row', { name: 't17217test@test.com Admin' }).locator(selectors.myAccountPagePO.OPEN_ACTIONSMENU).click();
            await io.myAccountPage.click(selectors.myAccountPagePO.REMOVEUSER);
            await io.myAccountPage.click(selectors.basePagePO.DELETE);
            await page.getByText(email).isHidden();
        });
    }
);