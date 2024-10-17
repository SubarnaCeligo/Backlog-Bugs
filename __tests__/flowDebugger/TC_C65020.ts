import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C65020.json";

test.describe("TC_C65020_C65026_C93638_C95732", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T24925 TC_C65020_C65026_C93638_C95732", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );
    let runTestBtns;
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** Opening the flow in production mode ***", async () => { });
    // TC_C65026 - Verify in Production Mode the dropdown menu items are non-selectable
    // TC_C95732 - Verify no 'Lightning bolt' icon displayed on any export when all exports are running in PRODUCTION MODE
    const lightningBolt = await page.locator(
      selectors.flowBuilderPagePO.ACTIVE_SOURCE
    );
    // await expect(lightningBolt).not.toBeTruthy();
    test.step("*** Verifying lightning bolt is not present in production mode ***", async () => { });
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    test.step("*** Clicking on more run test button ***", async () => { });
    runTestBtns = await page.$$(
      selectors.flowBuilderPagePO.GENERATOR_POPPER_MULTI_STEM_ROOT
    );
    await runTestBtns[0].click();
    await io.homePage.loadingTime();
    var value = await (
      await page.locator(
        selectors.flowBuilderPagePO.GENERATOR_POPPER_MULTI_STEM_ROOT
      )
    ).isVisible();
    await expect(value).toBeFalsy();
    test.step("*** Verifying in Production Mode the dropdown menu items are non-selectable ***", async () => { });

    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => { });
    await io.homePage.loadingTime();
    // TC_C65020 - Verify If mock data is missing for the listener, then the Run test button is disabled
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN,
      0
    );
    test.step("*** Clicking on more run test button ***", async () => { });
    runTestBtns = await page.locator(
      selectors.flowBuilderPagePO.GENERATOR_POPPER_RUN_TEST
    );
    test.step("*** Verifying the run test button for listerner with no mock data ***", async () => { });
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.GENERATOR_POPPER_RUN_TEST,
      1
    );
    // TC__C93638 - Verify when the test run is in progress then flow builder icon should be disabled
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.LISTENER, "");
    await io.assert.verifyElementNotBeFound(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.TRANSFER, "");
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION, "");
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EXPORT_FILTER, "");
    test.step("*** Verifying the flow builder icons are disabled in production mode  ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
  });
});
