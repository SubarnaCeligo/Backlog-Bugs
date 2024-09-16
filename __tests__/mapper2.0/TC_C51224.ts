import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51224.json";

test.describe("TC_C51224", () => {
  test.beforeEach(async ({ io }) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22391 TC_C51224", async ({ io, page }, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/assets/" + TC.pageGenerators[0].qa__export.qa__path);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    await io.homePage.loadingTime();
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await test.step("*** Clicking on preview for import mappings ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();

    test.step("*** Validate the output data ***", async () => {});
    await io.homePage.loadingTime();
    var data: any = await io.homePage.copyResourceData(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT
    );
    data = data.replace(/[\r\n ]+/g, "");
    //
    var response1 = await io.validation.validations.validateJSONData(
      TC.ExpectedData,
      JSON.parse(data)
    );
    await io.assert.expectToContainValue(
      "passed",
      response1["overallStatus"],
      ""
    );

    test.step("*** Navigate to home ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
