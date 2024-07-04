import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T27371 from '../../testData/inputData/FlowBuilder/T27371.json';

test.describe("T27368 Check for NoSqlDbs if the mapper 2.0 is enabled and getting saved and persisted ", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("Check for NoSqlDbs if the mapper 2.0 is enabled and getting saved and persisted @Env-All @Priority-P2", async ({ io, page }) => {
        await io.homePage.addStep("*** starting test case for DynamoDB ***");
        await io.createResourceFromAPI(T27371, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
        await io.homePage.addStep("*** Clicked on plus icon ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.homePage.addStep("*** Opened the import mappings ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
        await io.mappings.addStep("*** Clicked on changing output format button ***");
        await io.flowBuilder.click(selectors.basePagePO.COLLAPSE_ALL);
        await io.mappings.addStep("*** Clicked on collapseall button ***");
        await io.flowBuilder.click(selectors.basePagePO.EXPAND_ALL);
        await io.mappings.addStep("*** Clicked on expandall button ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "name");
        await io.mappings.addStep("*** Added destination field ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
        await io.flowBuilder.clickByTextByIndex('Name', 0)
        await io.mappings.addStep("*** Added source field ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.addStep("*** Clicked on preview button ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);
        await io.mappings.addStep("*** Clicked on search button ***");
        await io.mappings.addStep("*** Clicked all buttons on mapper2.0 page everything is working fine ***");
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
        await io.flowBuilder.loadingTime();
        await io.mappings.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.assert.textFromElement(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 'name');
        await io.assert.textFromElement(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, 'name');
        await io.mappings.addStep("*** Clicked on search button ***");
        await io.mappings.addStep("*** Clicked all buttons on mapper2.0 page everything is persisted ***");
        await io.homePage.addStep("*** end test case for dynamoDB ***");
    });
}
)