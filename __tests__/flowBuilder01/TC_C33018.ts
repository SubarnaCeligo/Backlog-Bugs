import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C33018_C32997", () => {
    test("C33018_C32997 @Env-All @Priority-P2 @Zephyr-IO-T3049", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.TILE_VIEW);
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "IO-20667_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Request to renew");
        await io.homePage.click(selectors.basePagePO.SUBMIT_REQUEST);
        await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    });
    test("C33018_1 @Env-All @Priority-P2 @Zephyr-IO-T3934", async ({ io,  page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.TILE_VIEW);
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "IO-56360_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Request to renew");
        await io.homePage.click(selectors.basePagePO.SUBMIT_REQUEST);
        await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    });
});