import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C110681_Test to validate AFE suggestions do not work for mapper1.0 and Transformation1.0 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C110681 @Env-All @Priority-P2 @Zephyr-IO-T15691", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.addStep("*** Navigated to Production Env ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.click(selectors.homePagePO.ADD_MAPPING);
        await io.homePage.addStep("*** Opened the mappings ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
        await io.homePage.addStep("*** Navigated to Mapper1.0 page ***");
        await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE);
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Typed '{{' or '{{{' on one of the source field ***");
        await io.homePage.addStep("*** Checked dropdown is not present ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});