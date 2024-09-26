import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C46925.json";

test.describe("TC_C46925 Verify user should not be able to modify the destination record field name and data type for the required fields.", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T18035 Verify user should not be able to modify the destination record field name and data type for the required fields.", async ({
    io,
    page
  }) => {
    test.step(" *** CREATED FLOW VIA API ***", async () => {});
    flowId = await io.createResourceFromAPI(TC, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the import mappings***", async () => {});
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the auto papulate fields***", async () => {});
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU,
      2
    );

    await io.homePage.click(selectors.importPagePO.AUTO_POPULATE_MAPPINGS);
    await io.homePage.loadingTime();

    await io.assert.expectToBeTrue(
      await (
        await page.$(selectors.mappings.MAPPER2DOT0PO.DISABLEDDESTINATIONFIELD)
      ).isVisible(),
      ""
    );
    const disabledFields = await page
      .locator(selectors.mappings.MAPPER2DOT0PO.DISABLEDDESTINATIONFIELD)
      .evaluateAll(elements => {
        return elements.map(element => (element as HTMLInputElement).disabled);
      });
    disabledFields.forEach(isDisabled => expect(isDisabled).toBe(true));
  });
});
