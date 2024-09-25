import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C110675_Test to validate AFE auto suggestion features are working fine at mapper2.0 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C110675 @Zephyr-IO-T15685 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await page.keyboard.press('Control+Space');
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Clicked Ctrl + space on one of the source field ***");
        await io.assert.verifyElementDisplayedByText(
            "All",
            "Fields"
          );
        await io.homePage.addStep("*** Checked dropdown is present or not by assertion of 'All', 'Feilds' sections ***");
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowDown');
        await io.homePage.addStep("*** Checked Keyboard shortcuts ***");
        await io.homePage.clickByText("All");
        await io.homePage.addStep("*** Navigated through Different sections ***");
        await io.homePage.addStep("*** Checked the core functionality of AFE auto suggestions in mapper2.0 ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});