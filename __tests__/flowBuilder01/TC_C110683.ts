import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C110683_Test to validate handle bar expression written outside the settings icon should be present inside when we open settings and selects handlebars-expression as input field type ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C110683 @Env-All @Priority-P2 @Zephyr-IO-T1106893", async ({ io, page }) => {
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
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened mappings settings ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON);
        await io.homePage.addStep("*** Opened Handkebar Expression ***");
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.HANDLEBAR_CONTENT, '{{abs number}}');
        await io.homePage.addStep("*** Checked the text present using assertion ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
});