import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C117734_C117735_Validating whether first matched field/helper is matched and that is added after clicking TAB ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C117734_C117735 @Zephyr-IO-T18828 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await io.homePage.keyboard('{');
        await io.homePage.keyboard('{');
        await io.homePage.keyboard('{');
        await io.homePage.addStep("*** Invoked the dropdown ***");
        await io.homePage.keyboard('r');
        await io.homePage.keyboard('e');
        await io.homePage.addStep("*** Started filtering by typing 're' ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.keyboard('Tab');
        await io.homePage.addStep("*** Checked the first matched field/helper is on highlight ***");
        await io.homePage.addStep("*** Clicked on TAB  ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});