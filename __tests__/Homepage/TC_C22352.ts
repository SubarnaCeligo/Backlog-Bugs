import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22352 Verify UX for download integration dropdown field", () => {
    test("C22352 Verify UX for download integration dropdown field", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.INTEGRATION_TILES_ACTIONS_MENU);
        expect( await page.$(selectors.homePagePO.CLONE_INTEGRATION)).toBeDefined();
        expect( await page.$(selectors.homePagePO.GENERATE_TEMPLATE_ZIP)).toBeDefined();
        expect( await page.$(selectors.homePagePO.DELETE_INTEGRATION)).toBeDefined();
    });
});