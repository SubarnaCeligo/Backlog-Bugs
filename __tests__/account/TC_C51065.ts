import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51065 Verify the help text for Require MFA in the Invite User drawer and in the Users table.", () => {
    test("@Env-All @Zephyr-IO-T19658 C51065 Verify the help text for Require MFA in the Invite User drawer and in the Users table.", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
        const button = await page.locator(selectors.myAccountPagePO.REQUIRE_MFA_HELP_BUTTON).first();
        await button.click();
        const helpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
        const helpText = await helpTextPopup.textContent();
        expect(helpText).toContain('Require MFASwitch Require MFA on for any users who are required to authenticate with MFA when accessing your account. You can modify the security settings for these users in the MFA section under the Security tab in your profile.Was this helpful?');

        await io.myAccountPage.getByRoleClick('button','Invite user');
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA_HELP_TEXT);
        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
        const mfaHelpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
        const mfaHelpText = await mfaHelpTextPopup.textContent();
        expect(mfaHelpText).toContain('Switch Require MFA on to require the user to authenticate with MFA when accessing your account.');
    });
});