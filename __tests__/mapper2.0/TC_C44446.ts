import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C44446 from "@testData/Mapper2.0/TC_C44446.json";

test.describe("TC_C44446 Verify that when we change the export and click refresh fields button, the source data should be refreshed and the current selected export fields should be present", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T2358  Verify that when we change the export and click refresh fields button, the source data should be refreshed and the current selected export fields should be present", async ({ io, page }) => {
    test.step(" *** CREATED FLOW VIA API ***", async () => {});
    flowId = await io.createResourceFromAPI(TC_C44446, "FLOWS");
    await io.homePage.loadingTime();

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

    await io.homePage.click(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );
    test.step("*** Clicked on source field ***", async () => {});

    let dropdown = await page.locator(
      selectors.mappings.MAPPER2DOT0PO.SOURCE_DROPDOWN
    );
    await io.homePage.clickByText("customerid");
    await io.homePage.click(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );
    let dropdowntext = await dropdown.textContent();
    await test.step("*** Got the text from the source dropdown ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on save and close button ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    test.step("*** Clicked on export ***", async () => {});
    let sourcefield = await page.locator(selectors.exportsPagePO.QUERY1).last();
    let sourcefieldtext = await sourcefield.textContent();
    await test.step("*** Get the text from the relativeuri field ***", async () => {});
    await sourcefield.dblclick();
    await io.homePage.clearTextValue(sourcefieldtext);
    test.step("*** Clear the text in the relative uri ***", async () => {});
    let entersourcefieldtext = await page
      .locator(`${selectors.exportsPagePO.QUERY1} textarea`)
      .last();
    await entersourcefieldtext.fill("select * from automation_afe");
    await test.step("*** Change the source data in the export ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Save and close the export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    test.step("*** Clicked on import mapping ***", async () => {});
    await io.homePage.clickByText("Refresh fields");
    test.step("*** Clicked on  refresh button ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );
    test.step("*** Clicked on source field ***", async () => {});
    let dropdownfieldchange = await dropdown.textContent();
    await test.step("*** Got the new text in the source field dropdown ***", async () => {});
    expect(dropdownfieldchange).not.toBe(dropdowntext);
  });
});
