import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51065", () => {
    test("C51065 Verify the help text for Require MFA in the Invite User drawer and in the Users table.", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
        await io.myAccountPage.getByRoleClick('button','Invite user');
        await io.myAccountPage.click(selectors.flowBuilderPagePO.MFAHELPTEXT);
        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.HELP_BUBBLE);
        const mfaHelpTextPopup = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
        const mfaHelpText = await mfaHelpTextPopup.textContent();
        expect(mfaHelpText).toContain('Switch Require MFA on to require the user to authenticate with MFA when accessing your account.');
    });
});