import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C115649", () => {
    test("TC_C115649 Verify Scroller is visible on the IA install base screen @Zephyr-IO-T24354 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
        await io.homePage.clickByText("Request to buy");
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});