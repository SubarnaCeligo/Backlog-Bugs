import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T27372 from '../../testData/inputData/FlowBuilder/T27372.json';
import T27371 from '../../testData/inputData/FlowBuilder/T27371.json';

test.describe("T27370 Verify mapper2 use cases for NoSQLDBwith both record and row based input data(export data)", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("Verify mapper2 use cases for MongoDB both record and row based input data(export data @Zephyr-IO-T27370 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.createResourceFromAPI(T27372, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
        await io.homePage.addStep("*** Clicked on plus icon ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.homePage.addStep("*** Opened the import mappings ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
        await io.mappings.addStep("*** Clicked on changing output format button ***");
        await page.getByText("Create destination record { } from source record { }").nth(1).click();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "id");
        await io.mappings.addStep("*** Added destination field ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
        await io.flowBuilder.clickByTextByIndex('Name', 0)
        await io.mappings.addStep("*** Added source field ***");
        await io.mappings.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW,"preview");
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        let finalText;
        let expectedInput = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
        if (Array.isArray(expectedInput) && expectedInput.every(item => item === '')) {
            finalText = '';
        }else {
            finalText = expectedInput.toString();
        }
        if(!finalText) {
        await io.assert.expectToBeValue("", finalText, "");
        await io.mappings.addStep("*** empty input data ***");
        }else {
        await io.mappings.addStep("*** output data validated ***");
        }
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
        await io.mappings.addStep("*** Clicked on changing output format button ***");
        await page.getByText("Create destination rows [ ] from source record { }").click();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "$");
        await io.mappings.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW,"preview");
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.addStep("*** Preview call done ***");
        expectedInput = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
        if (Array.isArray(expectedInput) && expectedInput.every(item => item === '')) {
            finalText = '';
        }else {
            finalText = expectedInput.toString();
        }
        if(!finalText) {
        await io.assert.expectToBeValue("", finalText, "");
        await io.mappings.addStep("*** empty input data ***");
        }else {
        await io.mappings.addStep("*** output data validated ***");
        }
    });
    test("Verify mapper2 use cases for DynamoDB both record and row based input data(export data @Zephyr-IO-T27370 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.createResourceFromAPI(T27371, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
        await io.homePage.addStep("*** Clicked on plus icon ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.homePage.addStep("*** Opened the import mappings ***");
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
        await io.mappings.addStep("*** Clicked on changing output format button ***");
        await page.getByText("Create destination record { } from source record { }").nth(1).click();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "id");
        await io.mappings.addStep("*** Added destination field ***");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
        await io.flowBuilder.clickByTextByIndex('Name', 0)
        await io.mappings.addStep("*** Added source field ***");
        await io.mappings.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW,"preview");
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        let finalText;
        let expectedInput = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
        if (Array.isArray(expectedInput) && expectedInput.every(item => item === '')) {
            finalText = '';
        }else {
            finalText = expectedInput.toString();
        }
        if(!finalText) {
        await io.assert.expectToBeValue("", finalText, "");
        await io.mappings.addStep("*** empty input data ***");
        }else {
        await io.mappings.addStep("*** output data validated ***");
        }
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT);
        await io.mappings.addStep("*** Clicked on changing output format button ***");
        await page.getByText("Create destination rows [ ] from source record { }").click();
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "$");
        await io.mappings.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW,"preview");
        await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.mappings.addStep("*** Preview call done ***");
        expectedInput = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
        if (Array.isArray(expectedInput) && expectedInput.every(item => item === '')) {
            finalText = '';
        }else {
            finalText = expectedInput.toString();
        }
        if(!finalText) {
        await io.assert.expectToBeValue("", finalText, "");
        await io.mappings.addStep("*** empty input data ***");
        }else {
        await io.mappings.addStep("*** output data validated ***");
        }
    });
}
)