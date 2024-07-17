import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22352 Verify UX for download integration dropdown field", () => {
    test("@Env-All @Zephyr-IO-T878 C22352 Verify UX for download integration dropdown field", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.homePagePO.TILE_VIEW)
        await io.homePage.loadingTime()
        await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES_ACTIONS_MENU);
        await page.locator(selectors.homePagePO.INTEGRATION_TILES,{hasText: 'Automation Flows'}).nth(0).locator(selectors.homePagePO.INTEGRATION_TILES_ACTIONS_MENU).click();
        expect(page.locator(selectors.homePagePO.CLONE_INTEGRATION)).toBeVisible();
        expect(page.locator(selectors.homePagePO.GENERATE_TEMPLATE_ZIP)).toBeVisible();
        expect(page.locator(selectors.homePagePO.DELETE_INTEGRATION)).toBeVisible();
    });
});
