import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C34437 Verify a new icon indicating auto retry should be displayed in the UI for errors whose classification is equal to intermittent", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C34437 Verify a new icon indicating auto retry should be displayed in the UI for errors whose classification is equal to intermittent @Zephyr-IO-T6559 @Env-All @Priority-P2", async ({ io, page, }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.clickByText("Standalone flows");
        await io.homePage.loadingTime();
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "C34437_DND");
        await io.homePage.clickByText("C34437_DND");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("HTTP request");
        await io.homePage.clickByText("HTTP response");
        await io.homePage.clickByText("Resolved errors");
    });
});
