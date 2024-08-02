import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2475_Verify the new Tools & Resources tab, Transfers & Audit logs under My account, install zip in home page, getting started under support", () => {
    test("@Env-All @Zephyr-IO-T5963 C2475_Verify the new Tools & Resources tab, Transfers & Audit logs under My account, install zip in home page, getting started under support UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.goToMenu("Tools");
        // Validating once clicked on Tools reports visible
        await io.assert.verifyElementDisplayedByText('Reports', "App crashed")
        await io.homePage.goToMenu("Resources");
        // Validating once clicked on Resources connections visible
        await io.assert.verifyElementDisplayedByText('Connections', "App crashed")
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.TRANSFERTAB);
        // Validating once clicked on transfer tab profile visible
        await io.assert.verifyElementDisplayedByText('Create transfer', "It's not visible")
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.AUDIT_LOG);
        await io.myAccountPage.loadingTime()
        // Validating once clicked on audit log tab visible
        await io.assert.verifyElementDisplayedByText('Resource name', "It's not visible")
    });
});
