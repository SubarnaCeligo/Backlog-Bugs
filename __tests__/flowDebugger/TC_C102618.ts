import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C102618.json";

test.describe("TC_C102618", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T23481 TC_C102618", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => {});
    //PRODUCTION
    //1.Hide the source dropdown(chevron)
    var value = await (
      await page.locator(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN)
    ).isVisible();
    await expect(value).toBeFalsy();
    //2.Hover test for Run button : "Run now"
    //Header
    var cancelbtn = await page.locator(selectors.basePagePO.RUNFLOW).nth(0);
    await cancelbtn.focus();
    await cancelbtn.hover();
    let helpTooltip = await page.locator(
      selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
    );
    await io.assert.expectToContainValue(
      "Run now",
      await helpTooltip.textContent(),
      ""
    );
    var cancelbtn1 = await page.locator(selectors.basePagePO.RUNFLOW).nth(1);
    // await cancelbtn1.focus();
    // await cancelbtn1.hover();
    // let helpTooltip1 = await page.locator(
    //   selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
    // );
    // await io.assert.expectToContainValue(
    //   "Run now",
    //   await helpTooltip1.textContent(),
    //   ""
    // );
    test.step("*** Verifying the hover text for Run button ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => {});
    await io.homePage.loadingTime();
    //TEST MODE
    //3.Hide the source dropdown(chevron)
    var value1 = await (
      await page.locator(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN)
    ).isVisible();
    await expect(value1).toBeFalsy();
    //4.Hide lightning icon
    var lightningIcon = await (
      await page.locator(selectors.flowBuilderPagePO.ACTIVE_SOURCE)
    ).isVisible();
    await expect(lightningIcon).toBeFalsy();
    //5.Hover test for Run button : "Run test"
    //Header
    var runTest = await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).nth(0);
    console.log(runTest)
    await runTest.focus();
    await runTest.hover();
    let helptip = await page.locator(
      selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
    ).nth(0);
    await io.assert.expectToContainValue(
      "Run test",
      await helptip.textContent(),
      ""
    );
    var runTest1 = await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).nth(1);
    // await runTest1.focus();
    // await runTest.hover();
    // let helptip1 = await page.locator(
    //   selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
    // ).nth(1);
    // await io.assert.expectToContainValue(
    //   "Run test",
    //   await helptip1.textContent(),
    //   ""
    // );
    test.step("*** Verifying the hover text for Run test button ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => {});
  });
});
