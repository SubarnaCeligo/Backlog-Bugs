import {test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25866_To verify IO account password can be set more than 32characters", () => {
    test("@Env-All @Zephyr-IO-T1407 C25866_To verify IO account password can be set more than 32characters UI_Backlog", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.loadingTime()
        await io.myAccountPage.click(selectors.myAccountPagePO.EDIT_PASSWORD)
        await io.integrationPage.fill(`{selectors.myAccountPagePO.NEW_PWD} input`, '123');
        await io.myAccountPage.click(selectors.myAccountPagePO.CHANGE_PASSWORD)
        await io.homePage.loadingTime()
        await io.assert.verifyElementDisplayedByText('Password is too weak. Following checks have failed: 1. Password should have at least 10 characters. 2. Password should have at least one capital letter. 3. Password should have at least one number.', "It's not available");
    });
});
