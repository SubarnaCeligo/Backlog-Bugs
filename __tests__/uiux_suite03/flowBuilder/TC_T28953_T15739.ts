import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/FlowBuilder/TC_T28953.json";

test.describe("Verify Handle bar editor is clickable when destination field is configured with '/' and Verify the visibility of The 'crosshair cursor' by hovering over the bubble", () => {
  test("@Zephyr-IO-T28953 @Zephyr-IO-T15739 @Env-All @Epic-IO-86262 @Priority-P2 - Verify Handle bar editor is clickable when destination field is configured with '/' and Verify the visibility of The 'crosshair cursor' by hovering over the bubble", async ({ io, page }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    // TC_T15739 - Verify the visibility of The 'crosshair cursor' by hovering over the bubble
    const cursor = await page
      .locator(selectors.flowBuilderPagePO.MOVE_PP)
      .first()
      .evaluate(el => {
        return getComputedStyle(el).cursor;
      });

    await io.assert.expectToBeValue(
      "move",
      cursor,
      "Crosshair cursor is not displayed"
    );

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    let dest = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    await dest.waitFor({state: 'visible', timeout: 500000});
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SETTINGS_MARIADB);
    
    await io.flowBuilder.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.CLICKFORFIELDMAPPINGTYPE);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.CLICKFORFIELDMAPPINGTYPE);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MULTIFIELDDROPDOWN);

    // TC_T28953 - Verify Handle bar editor is clickable when destination field is configured with '/'
    expect(await page.locator(selectors.flowBuilderPagePO.EXPRESSION_OPTION).locator('nth=1')).toBeEditable();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EXPRESSION_OPTION, 1);
    await io.assert.verifyElementDisplayedByText("Build handlebars expression","Handlebars editor is not displayed");
  });
});