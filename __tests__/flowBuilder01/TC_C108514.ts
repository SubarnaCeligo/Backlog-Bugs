import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108514_calendar_at_completed_flows", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C108514 @Zephyr-IO-T23763 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.click(selectors.flowBuilderPagePO.DASHBOARD);
        await io.homePage.addStep("*** Opened the Dashboard section ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
        await io.homePage.addStep("*** Opened the Completed Flows section ***");
        await io.assert.verifyElementDisplayedByText(
            "Completed date range:",
            "Completed date range:"
          );
        await io.homePage.addStep("*** Opened the calendar checking the alignment is correct ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});