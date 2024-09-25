import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO60215_Expression should close with '}}' or '}}}' depending on how we started the expression ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("IO60215 @Env-All @Priority-P2 @Zephyr-IO-60215", async ({ io, page }) => {
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
        await io.homePage.addStep("*** Clicked on handle bar field ***");
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await io.homePage.addStep("*** Invoked the dropdown by typing '{{{' ***");
        await page.keyboard.press('a');
        await page.keyboard.press('b');
        await page.keyboard.press('s');
        await io.homePage.addStep("*** Started to write expression ***");
        await page.keyboard.press('Control+Space');
        await io.homePage.addStep("*** Accessing the dropdown ***");
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await io.homePage.addStep("*** Selected the helper to close the expression ***");
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, '{{{abs');
        await io.homePage.addStep("*** Verified whether the expression is closed with '}}}' or not ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});