import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119139 Verify After refreshing page also Dashboard showing Running/completed flows as expected.)", () => {
    test("C119139 Verify After refreshing page also Dashboard showing Running/completed flows as expected. @Env-All @Priority-P2", async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.basePagePO.DASHBOARD);
        await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
        await io.homePage.reloadPage();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.COMPLETED_FLOWS, 'Flows are not displayed');
    });
});