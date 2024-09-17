import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/FlowBuilder/TC_T9950.json";

test.describe("Verify whether user is able to see the destination fields as highlighted", () => {
  test("@Zephyr-IO-T9950 @Env-All @Epic-IO-86262 @Priority-P2 - Verify whether user is able to see the destination fields as highlighted", async ({ io, page }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    let dest = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).first();
    await dest.waitFor({state: 'visible', timeout: 500000});
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SETTINGS_MARIADB);
    
    await io.flowBuilder.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.DATATYPE);

    await io.assert.verifyElementIsDisplayed(selectors.mappings.MAPPER2DOT0PO.ACTIVE_MAPPING_ROW, 'Destination fields are not highlighted');

    const backgroundColor = await page
      .locator(selectors.mappings.MAPPER2DOT0PO.ACTIVE_MAPPING_ROW)
      .first()
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(backgroundColor, "rgb(169, 209, 245)", "Background Color not blue");

    const inputVal = await page.locator(selectors.mappings.MAPPER2DOT0PO.ACTIVE_MAPPING_ROW).first().locator(selectors.flowBuilderPagePO.MAPPER2_DESTINATION_FIELD_TEXT).getAttribute('value');

    await io.assert.expectToContainValue('destinationTableName', inputVal, "Error is not showing properly");

  });
});