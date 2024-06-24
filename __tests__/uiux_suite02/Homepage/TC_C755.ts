import {test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C755_Verify Change password with valid current pass and new pass - Displays the signin page to login with existing email and new password", () => {
    test("@Env-All @Zephyr-IO-T1404 C755_Verify Change password with valid current pass and new pass - Displays the signin page to login with existing email and new password UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime()
        await io.myAccountPage.click(selectors.myAccountPagePO.EDIT_PASSWORD)
        await io.integrationPage.fill(selectors.myAccountPagePO.CURRENT_PASSWORD, '1234')
        await io.integrationPage.fill(selectors.myAccountPagePO.NEW_PASSWORD, '123');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.CHANGE_PASSWORD, 'Change password not showing')
    });
});
