import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C117948_Text should hover if highlight is more than 2 secs ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C117948 @Zephyr-IO-T18850 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await io.homePage.addStep("*** Navigated to the helper ***");
        await page.keyboard.press('Enter');
        await io.homePage.addStep("*** Selected to the helper ***");
        await io.homePage.addStep("*** Clicked on keyboard icon we can the respective shortcuts ***");
        await io.flowBuilder.loadingTime();
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});