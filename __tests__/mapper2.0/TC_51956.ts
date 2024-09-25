import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_51956.json";

test.describe("TC_51956 verify in sandbox environment all the mappings must be in expanded state in edit case", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T22461  verify in sandbox environment all the mappings must be in expanded state in edit case", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(TC, "FLOWS");
    await io.flowBuilder.loadingTime();
    test.step("*** Clicking on import mapping ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on mapper 2.0 ***", async () => {});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
    await test.step("*** Obtaining the number of destination fields ***", async () => {});
    let DestinationFields = await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    );
    await test.step("*** Obtaining the number of source fields ***", async () => {});
    let SourceFields = await page.$$(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );
    await test.step("*** verifying the number of source and destination fields ***", async () => {});
    expect(DestinationFields).toHaveLength(11);
    expect(SourceFields).toHaveLength(11);
    await test.step("*** Clicking on collapse button on the first destinatioon field ***", async () => {});
    await io.homePage.click(selectors.basePagePO.COLLAPSE_ALL);
    await test.step("*** Obtaining the number of source fields ***", async () => {});
    DestinationFields = await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    );
    SourceFields = await page.$$(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );
    await test.step("*** Verifying the number of fields to be 1 indicating the collapse of the tree structure ***", async () => {});
    expect(DestinationFields).toHaveLength(1);
    expect(SourceFields).toHaveLength(1);
  });
});
