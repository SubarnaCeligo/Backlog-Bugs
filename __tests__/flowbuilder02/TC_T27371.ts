import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T27372 from '../../testData/inputData/FlowBuilder/T27372.json';
import T27371 from '../../testData/inputData/FlowBuilder/T27371.json';

test.describe(`T27371 Verify mapper2 use cases for NoSQLDB `, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
  test(`Verify mapper2 use cases for MongoDB @Env-All @Priority-P2`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(T27372, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
    await io.homePage.addStep("*** Clicked on plus icon ***");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
    await io.homePage.addStep("*** Opened the import mappings ***");
    const labels = [
      "Hard-coded",
      "Static lookup"
    ];
    for (let i = 0; i < labels.length; i++) {
            await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(i).fill(`id-${i}`);
            await io.homePage.addStep("*** Filled the import mappings destination field***");
            await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS).nth(i).click();
            await io.flowBuilder.click(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
            await io.flowBuilder.loadingTime();
            await io.flowBuilder.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
            await io.flowBuilder.loadingTime();
            await page.locator(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS).nth(i).click();
            await io.flowBuilder.loadingTime();
            await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
            switch (labels[i]) {
                case "Hard-coded": {
                    await page.getByText("Hard-coded").click();
                    await page.locator(selectors.mappings.MAPPER2DOT0PO.HARDCODED_DEFAULT_INPUT).fill("test");
                    await io.homePage.addStep("*** added hardcoded value ***");
                    break;
                }
                case "Static lookup": {
                    await io.mappings.click(selectors.importPagePO.DYNAMICLOOKUP);
                    await page.locator(selectors.mappings.MAPPER2DOT0PO.LOOKUP_NAME).fill("test");
                    await io.homePage.addStep("*** added Static lookup value ***");
                    break;
                }
            }
            await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).nth(1).click();
            if(i===1){
                await page.isVisible(selectors.mappings.MAPPER2DOT0PO.STATIC_LOOKUP);
            } else {
            await io.mappings.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
            await io.mappings.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW,"preview");
            await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
            }
            if(i<labels.length) await page.locator(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS).nth(i).click();
    }
  });
  test(`Verify mapper2 use cases for DynamoDB `, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(T27371, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
    await io.homePage.addStep("*** Clicked on plus icon ***");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
    await io.homePage.addStep("*** Opened the import mappings ***");
    const labels = [
      "Hard-coded",
      "Static lookup"
    ];
    for (let i = 0; i < labels.length; i++) {
            await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(i).fill(`id-${i}`);
            await io.homePage.addStep("*** Filled the import mappings destination field***");
            await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS).nth(i).click();
            await io.flowBuilder.click(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
            await io.flowBuilder.loadingTime();
            await io.flowBuilder.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);
            await io.flowBuilder.loadingTime();
            await page.locator(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS).nth(i).click();
            await io.flowBuilder.loadingTime();
            await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
            switch (labels[i]) {
                case "Hard-coded": {
                    await page.getByText("Hard-coded").click();
                    await page.locator(selectors.mappings.MAPPER2DOT0PO.HARDCODED_DEFAULT_INPUT).fill("test");
                    await io.homePage.addStep("*** added hardcoded value ***");
                    break;
                }
                case "Static lookup": {
                    await io.mappings.click(selectors.importPagePO.DYNAMICLOOKUP);
                    await page.locator(selectors.mappings.MAPPER2DOT0PO.LOOKUP_NAME).fill("test");
                    await io.homePage.addStep("*** added Static lookup value ***");
                    break;
                }
            }
            await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).nth(1).click();
            if(i===1){
                await page.isVisible(selectors.mappings.MAPPER2DOT0PO.STATIC_LOOKUP);
            } else {
            await io.mappings.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
            await io.mappings.performWebActions(selectors.mappings.MAPPER2DOT0PO.PREVIEW,"preview");
            await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
            }
            if(i<labels.length) await page.locator(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS).nth(i).click();
    }
  });
});