import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO51317 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_IO51317 @Env-All @Priority-P2 @Zephyr-IO-51317", async ({ io, page }) => {
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
        await io.homePage.addStep("*** Clicked on source mapping field ***");
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await page.keyboard.press('r');
        await page.keyboard.press('e');
        await io.homePage.addStep("*** Typed just 're' ***");
        await io.homePage.clickByText("record");
        await io.homePage.addStep("*** Selected 'record' after typing 're' ***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, '{{record}}');
        await io.homePage.addStep("*** Checked whether we got only 'record' or not ***");
        await io.homePage.addStep("*** Navigated back to home page ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});