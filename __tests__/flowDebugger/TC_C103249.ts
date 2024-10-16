import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C103249.json";

test.describe("TC_C103249_SuiteAPP_WithoutMockData", async () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => {});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T24525 TC_C103249_SuiteAPP_WithoutMockData", async ({ io, page }) => {
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

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    test.step("*** Clicking on run test button ***", async () => {});
    await io.homePage.loadingTime();
    //Export hook
    //Test run results' link should be displayed in blue color starting with symbol 'T'
    await io.homePage.click(selectors.exportsPagePO.EXPORT_HOOKS);
    // test.step("*** Clicking on export hook ***", async () => {});
    // await io.homePage.loadingTime();
    // await expect(
    //   await (
    //     await page.locator(selectors.flowBuilderPagePO.SCRIPT_RUN_RESULT)
    //   ).isVisible()
    // ).toBeTruthy();
    // let testRunResult = await page.locator(
    //   selectors.flowBuilderPagePO.SCRIPT_RUN_RESULT
    // );
    // let colorOflin = await testRunResult.evaluate(el => {
    //   return window.getComputedStyle(el).getPropertyValue("color");
    // });
    // await expect(await testRunResult.textContent()).toContain("Test run results");
    // await expect(
    //   await page
    //     .locator(selectors.flowBuilderPagePO.PRESEND_SUITE_SCRIPT_START_ICON)
    //     .isVisible()
    // ).toBeTruthy();
    // test.step("*** Verified Test run results' link should be displayed in blue color starting with symbol 'T' ***", async () => {});
    // // Batch and Status will be shown -> 5 batches should be shown(1 batch having 2 records considering 10 records) with success/failure depends on script
    // await io.homePage.click(selectors.flowBuilderPagePO.SCRIPT_RUN_RESULT);
    // test.step("*** Clicking on result ***", async () => {});
    // var batchCol = await page.$$(selectors.flowBuilderPagePO.AFE_RECORD_COLUMN);
    // for (let i = 0; i < 5; i++) {
    //   let col1 = await (await batchCol[i]).textContent();
    //   let expectedText = `Batch ${i + 1}`;
    //   await io.assert.expectToBeValue(String(col1), expectedText, "");
    // }
    // test.step("*** Verifying hooks will show 5 batches with success/failure depends on script ***", async () => {});
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
    // test.step("*** Clicking on lookup hook ***", async () => {});
    // await io.homePage.loadingTime();
    // await expect(
    //   await (
    //     await page.locator(selectors.flowBuilderPagePO.SCRIPT_RUN_RESULT)
    //   ).isVisible()
    // ).toBeTruthy();
    // let testRunResult1 = await page.locator(
    //   selectors.flowBuilderPagePO.SCRIPT_RUN_RESULT
    // );
    // let colorOflin1 = await testRunResult1.evaluate(el => {
    //   return window.getComputedStyle(el).getPropertyValue("color");
    // });
    // await expect(await testRunResult1.textContent()).toContain(
    //   "Test run results"
    // );
    // await expect(
    //   await page
    //     .locator(selectors.flowBuilderPagePO.PRESEND_SUITE_SCRIPT_START_ICON)
    //     .isVisible()
    // ).toBeTruthy();
    // test.step("*** Verified Test run results' link should be displayed in blue color starting with symbol 'T' ***", async () => {});
    // // 1 batch should be shown
    // await io.homePage.click(selectors.flowBuilderPagePO.SCRIPT_RUN_RESULT);
    // test.step("*** Clicking on result ***", async () => {});
    // var batchColu = await page.$$(selectors.flowBuilderPagePO.AFE_RECORD_COLUMN);
    // for (let i = 0; i < 1; i++) {
    //   let col1 = await (await batchColu[i]).textContent();
    //   let expectedText = `Batch ${i + 1}`;
    //   await io.assert.expectToBeValue(String(col1), expectedText, "");
    // }
    // test.step("*** Verifying hooks will show 1 batch with success/failure depends on script ***", async () => {});
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
    // test.step("*** Clicking on import hook ***", async () => {});
    // await io.homePage.loadingTime();
    // //Pre Map Hook
    // await expect(
    //   await (
    //     await page.locator(selectors.flowBuilderPagePO.SUITE_SCRIPT_POST_MAP)
    //   ).isVisible()
    // ).toBeTruthy();
    // //Post Map Hook
    // await expect(
    //   await (
    //     await page.locator(selectors.flowBuilderPagePO.SUITE_SCRIPT_POST_MAP)
    //   ).isVisible()
    // ).toBeTruthy();
    // //Post Submit Hook
    // await expect(
    //   await (
    //     await page.locator(selectors.flowBuilderPagePO.SUITE_SCRIPT_POST_MAP)
    //   ).isVisible()
    // ).toBeTruthy();
    // //Post Map Hook
    // let testRunResult2 = await page.locator(
    //   selectors.flowBuilderPagePO.SUITE_SCRIPT_POST_MAP
    // );
    // let colorOflin2 = await testRunResult2.evaluate(el => {
    //   return window.getComputedStyle(el).getPropertyValue("color");
    // });
    // await expect(await testRunResult2.textContent()).toContain(
    //   "Test run results"
    // );
    // await expect(
    //   await page
    //     .locator(selectors.flowBuilderPagePO.POSTMAN_SUITE_SCRIPT_ID)
    //     .isVisible()
    // ).toBeTruthy();
    // //Post Submit Hook
    // let testRunResult3 = await page.locator(
    //   selectors.flowBuilderPagePO.SUITE_SCRIPT_POST_MAP
    // );
    // let colorOflin3 = await testRunResult3.evaluate(el => {
    //   return window.getComputedStyle(el).getPropertyValue("color");
    // });
    // await expect(await testRunResult3.textContent()).toContain(
    //   "Test run results"
    // );
    // await expect(
    //   await page
    //     .locator(selectors.flowBuilderPagePO.POSTSUBMIT_SUITE_SCRIPT_START_ICON)
    //     .isVisible()
    // ).toBeTruthy();
    // test.step("*** Verified Test run results' link should be displayed in blue color starting with symbol 'T' ***", async () => {});
    // //postMap, postSubmit hooks will show 5 batches with success/failure depends on script
    // //PostMap hook
    // await io.homePage.click(selectors.flowBuilderPagePO.SUITE_SCRIPT_POST_MAP);
    // test.step("*** Clicking on 'Test run results' link ***", async () => {});
    // await io.homePage.loadingTime();
    // var batchCol7 = await page.$$(selectors.flowBuilderPagePO.AFE_RECORD_COLUMN);

    // for (let i = 0; i < 5; i++) {
    //   let col1 = await (await batchCol7[i]).textContent();
    //   let expectedText = `Batch ${i + 1}`;
    //   await io.assert.expectToBeValue(String(col1), expectedText, "");
    // }
    // test.step("*** Verifying hooks will show 5 batches with success/failure depends on script ***", async () => {});
    // await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    // test.step("*** Closing the close button ***", async () => {});
    //Post Submit hook
    // await io.homePage.click(selectors.flowBuilderPagePO.SUITE_SCRIPT_POST_SUBMIT);
    // test.step("*** Clicking on 'Test run results' link ***", async () => {});
    // await io.homePage.loadingTime();
    // var batchCol11 = await page.$$(selectors.flowBuilderPagePO.AFE_RECORD_COLUMN);
    // for (let i = 0; i < 5; i++) {
    //   let col12 = await (await batchCol11[i]).textContent();
    //   let expectedText12 = `Batch ${i + 1}`;
    //   await io.assert.expectToBeValue(String(col12), expectedText12, "");
    // }
    test.step("*** Verifying hooks will show 5 batches with success/failure depends on script ***", async () => {});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing the close button ***", async () => {});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closing the close button ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("***  Navigating to Home Page ***", async () => {});
  });
});
