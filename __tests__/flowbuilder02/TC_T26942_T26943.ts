import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T26942_T26943_Test to verify the existing behaviour of layout toggle with 3 options is working for Transformation2.0 script view and rules view at flow step", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("T26942_T26943 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Searched for the integration ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("AFE_AUTOSUGGESTIONS_mapper2.0_DND");
        await io.homePage.addStep("*** Opened the integration ***");
        await io.homePage.clickByText("Oracle_import_flow_DND");
        await io.homePage.addStep("*** Opened the flow with Oracle import ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
        await io.homePage.addStep("*** Opened the transformations  ***");
        await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
        await io.homePage.addStep("*** Opened the java script view  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.COMPACT_VIEW);
        await io.homePage.addStep("*** Clicked on compact view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.COLUMN_VIEW);
        await io.homePage.addStep("*** Clicked on column view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.ROW_VIEW);
        await io.homePage.addStep("*** Clicked on row view one of the 3 options which is available  ***");
        await io.homePage.clickByText("Rules 1.0");
        await io.homePage.addStep("*** Opened the Rules 1.0 ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.COMPACT_VIEW);
        await io.homePage.addStep("*** Clicked on compact view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.COLUMN_VIEW);
        await io.homePage.addStep("*** Clicked on column view one of the 3 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.playgroundPO.ROW_VIEW);
        await io.homePage.addStep("*** Clicked on row view one of the 3 options which is available  ***");
        await io.homePage.clickByText("Rules 2.0");
        await io.homePage.addStep("*** Opened the Rules 2.0 ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.mappings.COMPACT2);
        await io.homePage.addStep("*** Clicked on compact view one of the 2 options which is available  ***");
        await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
        await io.homePage.addStep("*** Clicked on layout which is added  ***");
        await io.flowBuilder.click(selectors.mappings.COMPACTROW);
        await io.homePage.addStep("*** Clicked on column view one of the 2 options which is available  ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated to home page  ***");
    });
});