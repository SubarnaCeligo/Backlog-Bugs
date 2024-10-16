import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C64965.json";

test.describe("TC_C108689", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T23948 TC_C108689", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => {
      let retries = 10;
      while (retries > 0) {
        try {
          const element = await page.locator(selectors.flowBuilderPagePO.FLOW_DISABLE);
          if (element) {
            await element.click();
            break;
          }
        } catch (error) {
          console.log("Element not ready, retrying...");
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retry
          retries--;
        }
      }

      if (retries === 0) {
        throw new Error("Failed to click the disable flow button after multiple attempts");
      }
    });
    // await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => { });
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    test.step("*** Clicking on run test button ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** Clicking on export button ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on export button ***", async () => { });
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "export");
    await io.homePage.loadingTime();
    // await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, "")
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    // await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, "")
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    test.step("*** Clicking on run test button ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** Clicking on import button ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on import button ***", async () => { });
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "import");
    let warningMsg3 = await (
      await page.locator(selectors.basePagePO.NOTIFICATION_ID)
    ).textContent();
    await expect(warningMsg3).toContain(
      "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results."
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    let warningMsg4 = await (
      await page.locator(selectors.basePagePO.NOTIFICATION_ID)
    ).textContent();
    // await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, "")
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page   ***", async () => { });
  });
});
