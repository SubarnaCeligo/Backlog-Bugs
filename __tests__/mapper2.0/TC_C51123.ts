import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51123.json";

test.describe(`TC_C51123 Validate the ""status"" field for saved mappings`, () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test(`@Env-All  @Zephyr-IO-T22353  Validate the ""status"" field for saved mappings`, async ({
    io,
  }) => {
    flowId = await io.createResourceFromAPI(TC, "FLOWS");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    test.step("*** Going to mappings page ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on destination field***", async () => {});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS);

    await test.step("*** Entered the text in the destination field***", async () => {});
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER,
      "destination"
    );
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    await test.step("*** Entered the text in the SOURCE field***", async () => {});
    await io.flowBuilder.clickByText("name");

    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.loadingTime();

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    const flowData = await await io.api.getFlowById(flowId);
    const pageProcessors = await flowData.pageProcessors;
    const importId = await pageProcessors[0]._importId;
    var importJson1 = await io.api.getImportById(importId);
    await io.assert.expectToBeValue(
      String(importJson1.mappings[0]?.status),
      "Active",
      ""
    );
    await test.step("*** Verified the status is Active for mapping ***", async () => {});
  });
});
