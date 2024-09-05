import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C110678_Test to validate the AFE auto suggestion drawer is getting invoked inside settings when we select 'handlebars-expression' field mapping type in Transformation2.0 ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C110678 @Env-All @Priority-P2 @Zephyr-IO-T110678", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("FLOW_DND");
        await io.homePage.addStep("*** Opened the flow ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.homePage.addStep("*** Clicked on Add data processor button to add transformations ***");
        await io.homePage.click(selectors.basePagePO.EXPORTTRANSFORMATION);
        await io.homePage.addStep("*** Opened transformation rules ***");
        await io.homePage.clickByText("Rules 2.0");
        await io.homePage.addStep("*** Navigated to transformation rules 2.0 ***");
        await io.homePage.fill(selectors.flowBuilderPagePO.TRANSFORMATION_OUTPUTFIELD_PLACEHOLDER, "number");
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER, "{{abs number}}");
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Added both input and output fields ***");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.TRANSFORMATION_OUTPUTFIELD_PLACEHOLDER);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.TRANSFORMATION_INPUTFIELD_PLACEHOLDER);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened mappings settings ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep("*** Opened Handkebar Expression ***");
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