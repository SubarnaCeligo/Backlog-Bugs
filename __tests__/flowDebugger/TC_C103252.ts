import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C103252.json";

test.describe("TC_C103252", async () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T24528 TC_C103252", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get(TC.name)["flowId"]);
    test.step("*** Opening the flow ***", async () => {});
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
    test.step("*** Clicking on confirm disable ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    test.step("*** Clicking on run test button ***", async () => {});
    await io.homePage.loadingTime();
    //  - Verify error message when
    await io.homePage.click(selectors.flowBuilderPagePO.TD_BUTTON);
    await io.homePage.loadingTime();
    test.step("*** Clicking on errors btn in Table ***", async () => {});
    const errMessage = await page
      .locator('tbody > tr > th > div > div:nth-child(1) div').nth(1)
      .textContent();
    await io.assert.expectToContainValue(
      "failed to load file: 442577011; caused by: You do not have access to the media item you selected.",
      errMessage,
      ""
    );
    test.step("*** Verifying the error message in error drawer ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the error drawer ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => {});
  });
});
