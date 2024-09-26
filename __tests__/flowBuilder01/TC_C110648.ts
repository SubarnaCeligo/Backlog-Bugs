import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C110648_Test to validate user is getting older table with fields when we remove '{{' from the source field of Mapper2.0 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C110648 @Zephyr-IO-T15680 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Typed '{{' or '{{{' on one of the source field ***");
        await io.assert.verifyElementDisplayedByText(
            "All",
            "Fields"
          );
        await io.homePage.addStep("*** Checked dropdown is present or not by assertion of 'All', 'Feilds' sections ***");
        await page.keyboard.press('Backspace');
        await page.keyboard.press('Backspace');
        await page.keyboard.press('Backspace');
        await io.homePage.addStep("*** Removed '{{{' by clicking backspace ***");
        await io.assert.verifyElementDisplayedByText(
            "$",
            "recordType"
          );
        await io.homePage.addStep("*** Checked old dropdown is present or not after removing '{{' by assertion of '$', 'recordType' sections ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});