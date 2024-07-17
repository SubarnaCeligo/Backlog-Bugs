import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C56639_Verify the iclient action menu from resource page in different browsers like Chrome,Firefox and Safari", () => {
    test("@Env-All @Zephyr-IO-T16890 C56639_Verify the iclient action menu from resource page in different browsers like Chrome,Firefox and Safari UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
        await io.homePage.goToMenu("Resources", "iClients");
        await io.homePage.addStep("Reloading the page");
        await io.homePage.reloadPage();
        await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
        const actionText = (await io.flowBuilder.getText(selectors.dashboardPagePO.OPEN_ACTION_CLICK)) as string;
        // Validating action menu details visible
        await io.assert.expectToContainValue("Edit iClient", actionText, "Edit iClient not available");
        await io.assert.expectToContainValue("View audit log", actionText, "View audit log not available");
        await io.assert.expectToContainValue("Used by", actionText, "Used by not available");
        await io.assert.expectToContainValue("Delete iClient", actionText, "Delete iClient not avilable");
    });
});