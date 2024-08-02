import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import IO70947 from '../../testData/inputData/FlowBuilder/IO70947.json';

test.describe(`IO70947 The default value in the “Action to take…” options should be “Please select”. The “Do nothing” option should be removed for DB imports only in case of Handlebar Expression`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);});
  test(`IO70947 @Env-All @Priority-P2`, async ({io,page}) => {
    await io.createResourceFromAPI(IO70947, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
    await io.homePage.addStep("*** Clicked on plus icon ***");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
    await io.homePage.addStep("*** Opened the import mappings ***");
    await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(0).fill(`id-0`);
    await io.homePage.addStep("*** Filled the import mappings destination field***");
    await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS).nth(0).click();
    await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(0).click()
    await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS).nth(0).click();
    await page.locator(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS).nth(0).click();
    await io.mappings.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
    await page.getByText("Handlebars expression").click();
    await page.locator(selectors.mappings.MAPPER2DOT0PO.MULTIFIELDACTION).click();
    await expect(page.getByText("Do nothing")).toHaveCount(0);
  });
});