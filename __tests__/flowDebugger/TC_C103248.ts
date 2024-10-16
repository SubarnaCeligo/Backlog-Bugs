import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C103248.json";

test.describe("TC_C103248_C103256_C103261_C103267", async () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T24524 TC_C103248_Suitebundle_WithoutMockData", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => {}
    );
    await io.flowBuilder.navigateToTheFlow(flows.get('TC_C103248')["flowId"]);
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
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    test.step("*** Clicking on run test button ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    test.step("*** Clicking on export ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    test.step("*** Clicking on Mock Output ***", async () => {});
    let mockOut = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.MOCKOUTPUTFIELD
    );
    test.step("*** Copying the mock output ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //Export hook
    //Test run results' link should be displayed in blue color starting with symbol 'T'
    await io.homePage.click(selectors.exportsPagePO.EXPORT_HOOKS);
    test.step("*** Clicking on export hook ***", async () => {});
    await io.homePage.loadingTime();
    test.step("*** Verifying hooks will show 5 batches with success/failure depends on script ***", async () => {});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing the close button ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the close button ***", async () => {});
    await io.homePage.loadingTime();
    //LOOKUP HOOK
    //Test run results' link should be displayed in blue color starting with symbol 'T'
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS,
      0
    );
    test.step("*** Verifying Preview button should not be displayed ***", async () => {});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing the close button ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the close button ***", async () => {});
    await io.homePage.loadingTime();
    //Import Hook
    //Test run results' link should be displayed in blue color starting with symbol 'T'
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS,
      1
    );
    test.step("*** Verifying Preview button should not be displayed ***", async () => {});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing the close button ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the close button ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => {});
  });
});
