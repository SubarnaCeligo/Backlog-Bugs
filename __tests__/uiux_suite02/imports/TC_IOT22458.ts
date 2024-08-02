import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45341 from "@testData/Flows/C45341.json";

test.describe("TC_IOT22458 Verify in edit case when user add new mappings the focus of the cursor should be in destination column", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T22458 C51869 Verify in edit case when user add new mappings the focus of the cursor should be in destination column", async ({
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
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);
    let cursorFocusCheck = await page
      .locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(1)
      .evaluate(el => el === document.activeElement);
    await io.assert.expectToBeTrue(
      cursorFocusCheck,
      "Cursor is not focused on the Destination Mapping"
    );
  });
});
