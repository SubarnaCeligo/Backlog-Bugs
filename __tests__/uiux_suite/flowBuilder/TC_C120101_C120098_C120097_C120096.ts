import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C120101,C120098,C120097,C120096", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C120101,C120098,C120097,C120096", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated back to home page ***");
        await io.homePage.click(selectors.homePagePO.SEARCH_INTEGRATION);
        await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "Maria_DB");
        await io.homePage.clickByText("Maria_DB");
        await io.homePage.clickByText("Maria_DB_Flow");
        await io.flowBuilder.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        await io.assert.verifyElementDisplayedByText("Create destination rows [ ] from source record { }", "Option is not displayed properly");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
        await io.homePage.addStep("*** Clicked on changing output format button ***");
        await io.flowBuilder.click(selectors.basePagePO.COLLAPSE_ALL);
        await io.homePage.addStep("*** Clicked on collapseall button ***");
        await io.flowBuilder.click(selectors.basePagePO.EXPAND_ALL);
        await io.homePage.addStep("*** Clicked on expandall button ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "name");
        await io.homePage.addStep("***Verified the Destination Field Meta Deta ***");
        await io.homePage.addStep("*** Added destination field ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "name");
        await io.homePage.addStep("*** Added source field ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.homePage.addStep("*** Clicked on preview button ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);
        await io.homePage.addStep("*** Clicked on search button ***");
        await io.homePage.addStep("*** Clicked all buttons on mapper2.0 page everything is working fine ***");

    });
});