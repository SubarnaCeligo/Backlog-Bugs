import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45341 from "@testData/Flows/C45341.json";

test.describe(`TC_IOT22342 Verify the mapping row should show (H) symbol beside the settings gear when user add value wrapped in quotes """" in source`, () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test(`@Env-All @Zephyr-IO-T22342  C51111 Verify the mapping row should show (H) symbol beside the settings gear when user add value wrapped in quotes """" in source`, async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C45341, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
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
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER,
      "name"
    );
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      `""abc""`
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    );
    await expect(page.getByLabel("Hard-coded", { exact: true })).toBeVisible({
      timeout: 10000
    });
  });
});
