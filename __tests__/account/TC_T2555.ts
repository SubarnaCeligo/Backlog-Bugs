import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T2555", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("TC_T2555 @Zephyr-IO-T2555 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Sears - NetSuite Connector");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Sears - NetSuite Connector");
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Sears to NS import");
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.mappings.V2_SUITESCRIPT.IMPORT_MAPPING);
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened the NS import mappings ***");
        await io.homePage.clickByText("Netsuite");
        await io.homePage.addStep("*** verified that user is able to access mappings ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});