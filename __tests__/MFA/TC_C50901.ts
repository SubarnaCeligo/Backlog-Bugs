import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C50901 Verify the 'Require MFA?' field in invite user page", () => {
    test("@Env-All @Zephyr-IO-T19650 C50901 Verify the 'Require MFA?' field in invite user page", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
        await io.myAccountPage.getByRoleClick('button','Invite user')
        //await page.getByRole('button', {name : 'Invite user', exact: true}).click();
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED,"Unable to verify Require MFA");

        // const isMfaRequiredVisible = await io.myAccountPage.isVisible(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
        // expect(isMfaRequiredVisible).toBe(true);
    });
});