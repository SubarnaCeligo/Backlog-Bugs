import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/FlowBuilder/T22564.json";

test.describe("TC_T11646 Verify 'Sorting and grouping records' should be an optional section and this section should be collapsed by default.", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T11646 @Env-All @Epic-IO-86262 @Priority-P2 - Verify 'Sorting and grouping records' should be an optional section and this section should be collapsed by default.", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    let dest = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).first();
    await dest.waitFor({state: 'visible', timeout: 500000});

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);

    // await page.getByLabel("Search destination fields").fill("company");
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'first');
    await io.flowBuilder.loadingTime();

    let borderColor = await page
      .locator(selectors.flowBuilderPagePO.FIELD_MAPPING_GENERATE)
      .first()
      .evaluate(el => {
        return getComputedStyle(el).borderColor;
      });
    await io.assert.expectToBeValue(borderColor, "rgb(169, 209, 245)", "Border Color not blue");

    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.MAPPER2_DESTINATION_FIELD_TEXT,
      "value",
      "firstKey",
      0
    );

    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'second');
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.MAPPER2_DESTINATION_FIELD_TEXT,
      "value",
      "secondKey",
      0
    );

  });
});
