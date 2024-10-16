import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C106795.json";

test.describe("TC_C107015", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Go to flows page ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T23759 TC_C107015", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC.new);
    await test.step(
      "Created Flow: " + flows.get(TC.new.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.new.name)["flowId"]);
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
    let status = await page.$$(selectors.flowBuilderPagePO.JOB_ERRORS);
    for (let i = 0; i < status.length; i++) {
      let message = await status[i].textContent();
      await io.assert.expectToBeValue(String(message), "Success", "");
    }
    test.step("*** Verified flow is running successfully ***", async () => {});
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0);
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    let afeRows = await page.$$(selectors.flowBuilderPagePO.AFE_TABLE_ROWS);
    for (let i = 0; i < 4; i += 2) {
      await afeRows[i].click();
      await io.homePage.loadingTime();
      let input = await io.homePage.copyResourceData(
        selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE
      );
      await afeRows[i + 2].click();
      await io.homePage.loadingTime();
      let input1 = await io.homePage.copyResourceData(
        selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE
      );
      await expect(input).not.toEqual(input1);
    }
    test.step("*** Verified The selected record should be displayed in the input panel of the Rules tab, for the selected record on the 'Test run result' ***", async () => {});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 0);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => {});
  });
});
