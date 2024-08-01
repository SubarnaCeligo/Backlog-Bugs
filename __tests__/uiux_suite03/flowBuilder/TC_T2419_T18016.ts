import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/FlowBuilder/T2419.json";

test.describe("Verify the tooltips on the source mapping drop down and verify Dynamic lookup is not present in Field mapping type", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T2419 @Zephyr-IO-T18016 @Env-All @Epic-IO-86262 @Priority-P2 - Verify the tooltips on the source mapping drop down and verify Dynamic lookup is not present in Field mapping type", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    let dest = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).first();
    await dest.waitFor({state: 'visible', timeout: 200000});

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.MAPPER2_SOURCE_FIELD_TEXT, 1);

    const cursor = await page
      .locator(selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST)
      .first()
      .evaluate(el => {
        return getComputedStyle(el).cursor;
      });

    await io.assert.expectToBeValue(
      "pointer",
      cursor,
      "Tooltip is not displayed"
    );
    
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SETTINGS_MARIADB, 1);
    await io.flowBuilder.waitForElementAttached(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
    await io.assert.verifyElementContainsText(
      selectors.importPagePO.DYNAMICLOOKUP,
      "Lookup - static"
    );
    
  });
});
