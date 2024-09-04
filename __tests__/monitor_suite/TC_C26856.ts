import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/monitorSuite/C26856.json"
import testData from "@testData/monitorSuite/monitor_all_Ci_user.json";

test.describe(`C26856 Verify AutoMap field button is not shown`, () => {
  test(`@Env-All @Zephyr-IO-T5276 C26856 Verify AutoMap field button is not shown when access level of user is monitor`, async ({ io, page }) => {
    const ree = await io.api.processAshareData(testData);
    const id = await io.createResourceFromAPI(
      data,
      'FLOWS'
    );
    await page.locator(`//*[contains(@class,'MuiTypography-root') and contains(text(),'Loading')]`).first().waitFor({ state: "hidden", timeout: 600000 });
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();
    const separationBoundary = await io.flowBuilder.isVisible(selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP)
    await io.assert.expectToBeValue(separationBoundary.toString(), 'false', "Element not found");

  });
})