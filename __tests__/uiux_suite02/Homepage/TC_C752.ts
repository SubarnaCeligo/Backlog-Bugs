import {test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C752_Verify Change password with invalid current pass and valid new pass - should show error messsage", () => {
    test("@Env-All @Zephyr-IO-T1401 C752_Verify Change password with invalid current pass and valid new pass - should show error messsage UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime()
        await io.myAccountPage.click(selectors.myAccountPagePO.EDIT_PASSWORD)
        await io.integrationPage.fill(selectors.myAccountPagePO.CURRENT_PASSWORD, '1234')
        await io.integrationPage.fill(selectors.myAccountPagePO.NEW_PASSWORD, '123');
        await io.myAccountPage.click(selectors.myAccountPagePO.CHANGE_PASSWORD)
        await io.homePage.loadingTime()
        await io.assert.verifyElementDisplayedByText('Current password failed to authenticate. Please try again.', "It's not available");
    });
});
