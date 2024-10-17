import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C105393.json";

test.describe("TC_C105393_C105452", async () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T25652 TC_C105393", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    test.step("*** Clicking on export ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN
    );
    test.step("*** Clicking on populate with preview data ***", async () => { });
    await io.homePage.loadingTime();
    await expect(
      await (await page.locator(selectors.myAccountPagePO.DIALOG_BOX)).isVisible()
    ).toBeTruthy();
    test.step("*** Verified In delta export, when we click on the 'Populate with preview data' and no results are returned from the endpoint, the delta date popup will be displayed ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Clicking on close ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async () => { });
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => { });
  });
  test("@Env-All @Zephyr-IO-T25652 TC_C105452", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC.new);
    await test.step(
      "Created Flow: " + flows.get(TC.new.name)["flowName"],
      async () => { }
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.new.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    test.step("*** Clicking on response Mapping ***", async () => { });
    await io.homePage.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT, "Not visible")
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    test.step("*** Clicking on import ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    test.step("*** Clicking on mock response ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKRES);
    await io.homePage.loadingTime();
    let platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    } else {
      await page.keyboard.type("Control+A");
      await page.keyboard.type("Delete");
    }
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on save And Close ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    test.step("*** Clicking on response Mapping ***", async () => { });
    await io.homePage.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT, "Not visible")
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on close ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => { });
  });
});
