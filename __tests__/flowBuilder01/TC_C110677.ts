import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C110677_Test to validate the AFE auto suggestion drawer is getting invoked inside settings when we select 'handlebars-expression' field mapping type in mapper2.0 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C110677 @Env-All @Priority-P2 @Zephyr-IO-T110677", async ({ io, page }) => {
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
        await io.homePage.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "number");
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "{{abs number}}");
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Typed both destination and source fields ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON);
        await io.homePage.addStep("*** Opened mappings settings ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON);
        await io.homePage.addStep("*** Opened Handkebar Expression ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT);
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await page.keyboard.press('{');
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Typed '{{' or '{{{' at field level ***");
        await io.assert.verifyElementDisplayedByText(
            "All",
            "Fields"
          );
        await io.homePage.addStep("*** Checked dropdown is present or not by assertion of 'All', 'Feilds' sections ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});