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
            await io.homePage.loadingTime()
            await io.myAccountPage.clickByText('Invite user')
            await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED)

            // Assert that the toggle is unchecked
            await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED, 'aria-checked', 'false');
        });
    }
);