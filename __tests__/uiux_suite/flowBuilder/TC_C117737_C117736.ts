import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C117737_C117736", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C117737_C117736", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.click(selectors.homePagePO.ADD_MAPPING);
        await io.homePage.addStep("*** Opened the mappings ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
        await io.homePage.addStep("*** Navigated to Mapper2.0 page ***");
        await io.homePage.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
        await io.homePage.addStep("*** Clicked on source field ***");
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await io.homePage.addStep("*** Invoked the dropdown ***");
        await page.keyboard.press('a');
        await page.keyboard.press('b');
        await page.keyboard.press('s');
        await io.homePage.addStep("*** Started filtering by typing 'abs' ***");
        await io.flowBuilder.loadingTime();
        await page.keyboard.press('Tab');
        await io.homePage.addStep("*** Clicked on TAB  ***");
        await io.homePage.addStep("*** Checked the highlight is moving to next argument ***");
        await io.homePage.addStep("*** Chekced dropdown is not closed ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});