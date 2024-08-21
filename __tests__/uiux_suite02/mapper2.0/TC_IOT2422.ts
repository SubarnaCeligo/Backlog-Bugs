import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45341 from "@testData/Flows/C45341.json";

test.describe("TC_IOT2422 verify tooltips should shown on the destination files name is lengthy", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T2422 C44420 verify tooltips should shown on the destination files name is lengthy", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C45341, "FLOWS");

    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.IMPORT
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "TEST DESTINATION FIELD NAME TEST DESTINATION FIELD NAME TEST DESTINATION FIELD NAME TEST DESTINATION FIELD NAME");
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "$.first_name");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.hover(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 0, false);
    await io.assert.verifyElementDisplayedByText("Destination field: TEST DESTINATION FIELD NAME TEST DESTINATION FIELD NAME TEST DESTINATION FIELD NAME TEST DESTINATION FIELD NAME", "Destination Field Not Displayed");

  });
});