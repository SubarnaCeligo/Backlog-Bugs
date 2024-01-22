import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C111328", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_C111328", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to home page ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.homePage.addStep("*** Navigated to flow builder page ***");
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
        );
        await io.homePage.addStep("*** Clicked on add destination or lookup ***");
        await io.homePage.click(selectors.flowBuilderPagePO.POSTGRESQL_APPLICATION);
        await io.homePage.addStep("*** Clicked on POSTGRE application ***");
        await io.flowBuilder.clickByText("Import records into destination application");
        await io.homePage.addStep("*** Selected import records option ***");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "POSTGRESQL CONNECTION");
        await io.homePage.addStep("*** Searched for POSTGRESQL CONNECTION ***");
        await io.homePage.clickByText('POSTGRESQL CONNECTION');
        await io.homePage.addStep("*** Selected  POSTGRE connection ***");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.addStep("*** Clicked on next button ***");
        await io.homePage.click(selectors.basePagePO.ADD_NAME);
        await io.homePage.addStep("*** Clicked on name field ***");
        await page.keyboard.press('/');
        await io.homePage.addStep("*** Entered name for the import ***");
        await io.homePage.click(selectors.flowBuilderPagePO.DESTINATIONTABLESEARCHPOSTGRE);
        await io.homePage.addStep("*** Clicked on destination table search field ***");
        await io.homePage.clickByText('Agent');
        await io.homePage.addStep("*** Selected A table ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
        await io.homePage.addStep("*** Saved the import ***");
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.homePage.addStep("*** Clicked on plus icon ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.homePage.addStep("*** Opened the import mappings ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
        await io.homePage.addStep("*** Clicked on changing output format button ***");
        await io.flowBuilder.click(selectors.basePagePO.COLLAPSE_ALL);
        await io.homePage.addStep("*** Clicked on collapseall button ***");
        await io.flowBuilder.click(selectors.basePagePO.EXPAND_ALL);
        await io.homePage.addStep("*** Clicked on expandall button ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "name");
        await io.homePage.addStep("*** Added destination field ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "name");
        await io.homePage.addStep("*** Added source field ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.homePage.addStep("*** Clicked on preview button ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);
        await io.homePage.addStep("*** Clicked on search button ***");
        await io.homePage.addStep("*** Clicked all buttons on mapper2.0 page everything is working fine ***");
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep("*** Navigated back to home page ***");
    });
}
)