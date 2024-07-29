import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51800 from "@testData/Flows/C51800.json";

test.describe("TC_IO-T22447 Verify when there are existing mappings the tree structures should expand all rows by default [rows to record]", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T22447 C51800 Verify when there are existing mappings the tree structures should expand all rows by default [rows to record]", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C51800, "FLOWS");

    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.IMPORT
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON
    );
    await io.flowBuilder.loadingTime();
    const treeSwitcherLocator = page.locator(selectors.mappings.MAPPER2DOT0PO.MAPPING_EXPAND_LOCATER);
    expect(treeSwitcherLocator).toBeVisible();

    treeSwitcherLocator.click();

    expect(treeSwitcherLocator).toBeHidden();
  });
});
