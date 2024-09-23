import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/T32564.json";

test.describe('T32564 - Verify if Mappings should be supported for new query type "Use optimized bulk load (recommended for larger imports)"', () => {
  test('@Zephyr-T32564 @Epic-IO-68704 @Priority-P2 @Env-All Snowflake bulk load epic cases', async ({ io, page }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    expect(await page.locator(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)).toBeVisible();
  });
});
