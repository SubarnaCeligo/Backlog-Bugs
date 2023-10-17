import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C50901 Verify the 'Require MFA?' field in invite user page", () => {
    test("C50901 Verify the 'Require MFA?' field in invite user page", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
        await page.getByRole('button', {name : 'Invite user', exact: true}).click();
        const isMfaRequiredVisible = await io.myAccountPage.isVisible(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
        expect(isMfaRequiredVisible).toBe(true);
    });
});