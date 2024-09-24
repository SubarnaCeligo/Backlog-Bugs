import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C117739_Validating whether expression is closed with '}}'/'}}}' ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C117739 @Zephyr-IO-T18833 @Env-All @Priority-P2", async ({ io, page }) => {
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
        await io.homePage.keyboard('a');
        await io.homePage.keyboard('b');
        await io.homePage.keyboard('s');
        await io.homePage.addStep("*** Started filtering by typing 'abs' ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.keyboard('Control+Space');
        await io.homePage.keyboard('ArrowDown');
        await io.homePage.keyboard('ArrowDown');
        await io.homePage.keyboard('ArrowDown');
        await io.homePage.keyboard('Enter');
        await io.homePage.addStep("*** Clicked on 'abs' helper using key board shortcuts***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, '{{{abs number}}}');
        await io.homePage.addStep("*** Checked whether helper is added or not ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});