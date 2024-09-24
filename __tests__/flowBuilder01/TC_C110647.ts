import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C110647_Test to validate functinality of key board shortcuts like Esc, Enter, tab, space is working fine ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C110647 @Zephyr-IO-T15679 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Tab');
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Clicked the keyboard keys, arrows ***");
        await io.homePage.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
        await io.assert.verifyElementDisplayedByText(
            "All",
            "Fields"
          );
        await io.homePage.addStep("*** Checked whether we got correct helper or not upon clicking Tab ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});