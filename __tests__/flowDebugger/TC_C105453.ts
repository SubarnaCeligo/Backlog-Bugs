import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C105453.json";

test.describe("TC_C105453", async () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T25655 TC_C105453", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => {});
    await io.homePage.loadingTime();
    //In case the mock response is edited, then in response mapping test shows updated JSON from the mock respo
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    test.step("*** Clicking on response Mapping***", async () => {});
    await io.homePage.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT, "Not visible")
    test.step("*** Verified In case the mock response is edited, then in response mapping test shows updated JSON from the mock respo ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on cancel ***", async () => {});
    await io.homePage.loadingTime();
    //In case import transformation fails, the _json part of the mock response is showing as empty in the response mapping input since the transformation is applied on _json.
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
    test.step("*** Clicking on import ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    test.step("*** Clicking on mock response ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKRES);
    let platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    } else {
      await page.keyboard.type("Control+A");
      await page.keyboard.type("Delete");
    }
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    test.step("*** Adding Mock Response in the form ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save And Close ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    test.step("*** Clicking on response Mapping ***", async () => {});
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT, "Not visible")
    test.step("*** Verified In case import transformation fails, the _json part of the mock response is showing as empty in the response mapping input since the transformation is applied on _json. ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on cancel ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => {});
  });
});
