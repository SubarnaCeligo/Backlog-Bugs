import { expect, test } from "@celigo/ui-core-automation";
import T27372 from '../../testData/inputData/FlowBuilder/T27372.json';
import T27371 from '../../testData/inputData/FlowBuilder/T27371.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("T27372 Verify handlebar expression in Mapper 2.0 for NoSQL", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("Verify handlebar expression in Mapper 2.0 for MongoDb @Env-All @Priority-P2", async ({ io, page }) => {
        await io.createResourceFromAPI(T27372, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
        await io.homePage.addStep("*** Clicked on plus icon ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.homePage.addStep("*** Opened the import mappings ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "id");
        await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS).nth(0).click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
        await page.locator(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS).nth(0).click();
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.MULTIFIELDDROPDOWN);
        await io.mappings.fill(selectors.mappings.MAPPER2DOT0PO.TEXTEXPRESSION, "{{record.ID}}");
        await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).nth(1).click();
        await io.mappings.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW,"preview");
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    });
    test("Verify handlebar expression in Mapper 2.0 for DynamoDb", async ({ io, page }) => {
        await io.createResourceFromAPI(T27371, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
        await io.homePage.addStep("*** Clicked on plus icon ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.homePage.addStep("*** Opened the import mappings ***");
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "id");
        await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS).nth(0).click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
        await page.locator(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS).nth(0).click();
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.MULTIFIELDDROPDOWN);
        await io.mappings.fill(selectors.mappings.MAPPER2DOT0PO.TEXTEXPRESSION, "{{record.ID}}");
        await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).nth(1).click();
        await io.mappings.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW,"preview");
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    });
}
)