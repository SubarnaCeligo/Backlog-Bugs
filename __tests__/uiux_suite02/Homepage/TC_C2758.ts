import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2758_Verify when the sandbox tile is shared with a non sandbox license user the shared tile should be shown in the production account.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.clickByText("Production")
    })
    test("@Env-All @Zephyr-IO-T6940 C2758_Verify when the sandbox tile is shared with a non sandbox license user the shared tile should be shown in the production account UI_Backlog", async ({ io }) => {
        await io.myAccountPage.clickByText("Sandbox")
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
        await io.myAccountPage.clickByText("Invite user")
        // Validating user invite a non sandbox license user
        await io.assert.verifyElementDisplayedByText('Learn more about roles & permissions', "Manage all not visible")
    });
});
