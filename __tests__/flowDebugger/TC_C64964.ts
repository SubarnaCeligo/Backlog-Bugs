import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C64964.json";

test.describe("TC_C64964", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T24875 TC_C64964", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on confirm disable ***", async () => { });
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on run test button ***", async () => { });
    // TC_C64964 - Verify If there are more responses than records, each record will use their corresponding response, and the rest of the responses will be ignored/not used
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => { });
    let mockOut = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => { });
    let mockOutputJson = JSON.parse(mockOut as string);
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on import ***", async () => { });
    await io.homePage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    test.step("*** Clicking on mock response tab ***", async () => { });
    let mockRes = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKRES
    );
    test.step("*** Copying the mock response ***", async () => { });
    let mockResponseJson = JSON.parse(mockRes as string);
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    test.step("*** Clicking on response mapping ***", async () => { });
    const afeRows = await page.$$(selectors.flowBuilderPagePO.AFE_TABLE_ROWS);
    for (let i = afeRows.length - 1; i >= 0; i--) {
      await afeRows[i].click();
      await io.homePage.loadingTime();
      test.step("*** Clicking on afe row ***", async () => { });
      let input = await io.homePage.copyResourceData(
        selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE
      );
      let output = await io.homePage.copyResourceData(
        selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT
      );
      let inputJson = JSON.parse(input as string);
      let outputJson = JSON.parse(output as string);
      await io.assert.expectToBeValue(
        String(inputJson.mockResponse.record.name),
        mockResponseJson[i]._json.mockResponse.record.name,
        ""
      );
      await io.assert.expectToBeValue(
        String(outputJson.record.Result_Name),
        inputJson.mockResponse.record.name,
        ""
      );
      await io.assert.expectToBeValue(
        String(outputJson.record.name),
        mockOutputJson.page_of_records[i].record.name,
        ""
      );
    }
    test.step("*** Verifying the input, output and mock response ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
  });
});
