import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45341 from "@testData/Flows/C45341.json";

test.describe("TC_IOT2398 Verify the hover text for filled mapping fields in Mapper 2.0", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T2398 C45341 Verify the hover text for filled mapping fields in Mapper 2.0", async ({
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
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "name");
    await io.homePage.addStep("*** Added destination field ***");
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, "$.first_name");
    await io.homePage.addStep("*** Added source field ***");
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER, 0, false);
    await io.assert.verifyElementDisplayedByText("Source field", "Source field Not Displayed");
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 0, false);
    await io.assert.verifyElementDisplayedByText("Destination field", "Destination Field Not Displayed");
  });
});
