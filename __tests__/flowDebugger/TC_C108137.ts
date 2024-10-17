import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import TC from "../../testData/inputData/FlowDebugger/TC_C108137.json";

test.describe("TC_C108137_C108147", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Go to flows page ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T14547 TC_C108137_C108147", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    await io.homePage.loadingTime();
    test.step("*** Running flow in test mode ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    let status = await page.$$(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
    //TC_C108137 Verify For "page of rows" mock output. The test run is ignoring the records
    for (let i = 0; i < status.length; i++) {
      let message = await status[i].textContent();
      await io.assert.expectToBeValue(String(message), "Success", "");
    }
    test.step("*** Verified The record should pass through the input filter successfully ***", async () => {});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 0);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN,
      0
    );
    test.step("*** Clicking on dropdown icon ***", async () => {});

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.MUI_PAPEER_ROUNDED_MUILISTITEMROOT,
      1
    );
    test.step("*** Selecting the second source ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CONTINUE);
    await io.homePage.loadingTime();
    //TC_C108147 Mock output data should be stored in “page of rows” Format
    // await io.homePage.clickButtonByIndex(
    //   selectors.flowBuilderPagePO.RUNTEST_BUTTON,
    //   0
    // );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.EXPORT_BUBBLE,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.loadingTime();
    let mock = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    await io.assert.expectToContainValue("rows", mock, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => {});
  });
});
