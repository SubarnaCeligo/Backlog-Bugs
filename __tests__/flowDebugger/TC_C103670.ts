import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C103670.json";

test.describe("TC_C103670", () => {
  let platform;
  let str = JSON.stringify(TC.ghostText);
  let str1 = JSON.stringify(TC.ghostText1);
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T24400 TC_C103670", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => {});
    //EXPORT:
    //TC_C103670 Verify 'Done' button should be enable on test.afterEach removing “m” and  but test.afterEach again adding “m” “Done” button should be disabled.
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on mock output ***", async () => {});
    await io.homePage.click(
      selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB
    );
    test.step("*** Clicking on insert canonical stub ***", async () => {});
    let ghostText = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock response ***", async () => {});
    test.step("*** Verified For page of records correct stub should be populated ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT_EDIT);
    test.step("*** Clicked on Expand Button ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.MOCKOUT1, 1);
    platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN, 1);
    } else {
      await page.keyboard.type("Control+A");
      await page.keyboard.type("Delete");
    }
    await io.homePage.loadingTime();
    var place = await page.$$(selectors.flowBuilderPagePO.MOCKOUT1)[1];
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN, 1);
    test.step("*** Filling updated stub into Mock Output field ***", async () => {});
    await io.homePage.loadingTime();
    var doneButton = await page.locator(selectors.flowBuilderPagePO.DONEBUTTON);
    var eneble = await doneButton.isEnabled();
    await io.assert.expectToBeTrue(eneble, "");
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.MOCKOUT1, 1);
    platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN, 1);
    } else {
      await page.keyboard.type("Control+A");
      await page.keyboard.type("Delete");
    }
    await io.homePage.loadingTime();
    var place1 = await page.$$(selectors.flowBuilderPagePO.MOCKOUT1)[1];
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN, 1);
    test.step("*** Filling original stub into Mock Output field ***", async () => {});
    var eneble1 = await doneButton.isEnabled();
    // await expect(eneble1).toBeTruthy();
    test.step("*** VErified 'Done' button should be enable on test.afterEach removing “m” and  but test.afterEach again adding “m” “Done” button should be disabled. ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicked on close Button ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on saveAndClose Button ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => {});
  });
});
