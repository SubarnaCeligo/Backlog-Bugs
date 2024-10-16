import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C102621.json";
import TC1 from "../../testData/inputData/FlowDebugger/TC_C102617.json";

test.describe("TC_C102617_C102621_C102623", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T23484 TC_C102623", async ({ io, page }) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await test.step(
      "Created Flow: " + flows.get(TC.name)["flowName"],
      async () => { }
    );

    await io.flowBuilder.navigateToTheFlow(flows.get('TC_C102621').flowId);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    //  await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => { });
    await io.homePage.loadingTime();

    //TC_C192623 Verify when record doesn't pass through the the filter, Filter status should show as ignore
    await io.homePage.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    test.step("*** clicking on run test ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.INPUT_FILTER);
    await io.homePage.loadingTime();
    let statusCol = await page.$$(selectors.flowBuilderPagePO.TEST_RUN_STATUS);
    var result = await statusCol[1].textContent();
    await io.assert.expectToContainValue("Success (ignored)", result, "");
    await test.step("*** Verified Filter test run result status should show as Success (ignored) ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking on cancel ***", async () => { });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
  });
  test("@Env-All @Zephyr-IO-T23484 TC_C102617_C102621", async ({ io, page }, testInfo) => {
    let flows = await io.api.createImpOrExpAndFlowsThruAPI(TC1);
    await test.step(
      "Created Flow: " + flows.get(TC1.name)["flowName"],
      async () => { }
    );
    await io.flowBuilder.navigateToTheFlow(flows.get('TC_C102617').flowId);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => { });
    //TC_C102621 In production mode, complete row in Source dropdown options should be clickable and clicking anywhere in the row should close the dropdown and run the flow with that source.
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    test.step("*** Clicking on dropdown chevron ***", async () => { });
    var hand = await page.$$(
      selectors.flowBuilderPagePO.TOOLTIP_LIST_ITEM_PADDING
    );
    for (let i = 1; i < hand.length; i++) {
      await hand[i].hover();
      await io.homePage.loadingTime();
      let cursorPointer = await hand[i].getAttribute("class");
      await io.assert.expectNotToBeValue(
        String(cursorPointer.valueOf()),
        "pointer",
        ""
      );
    }
    test.step("*** Verified changed the cursor from the arrow to the hand when over a row. ***", async () => { });

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.TOOLTIP_LIST_ITEM_PADDING,
      0
    );
    test.step("*** Clicking on first row ***", async () => { });
    var dropdown = await (
      await page.locator(
        selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
      )
    ).isVisible();
    await expect(dropdown).toBeFalsy();
    test.step("*** Verified In production mode, complete row in Source dropdown options should be clickable and clicking anywhere in the row should close the dropdown and run the flow with that source. ***", async () => { });
    await waitForCompletionStatus(page, selectors);
    async function waitForCompletionStatus(page, selectors) {
      const completedStatusSelector = `${selectors.flowBuilderPagePO.IMPORT_RUN_COMPLETION_STATUS}:has-text("Completed")`;
      const completedStatusElement = await page.waitForSelector(completedStatusSelector, { timeout: 60000 }).catch(() => null);
      if (completedStatusElement) {
        let completedStatusExport = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(0).textContent();
        expect(completedStatusExport).toEqual('Completed');
        await test.step("Test", async () => {
          if (completedStatusExport == 'Completed') {
            let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(0).textContent();
            expect(successStatus).toEqual('Success');
          }
        });
      } else {
        await waitForCompletionStatus(page, selectors);
      }
    }
    //verify success count and run status for import
    let completedStatusImport = await page.locator(selectors.flowBuilderPagePO.RUN_COMPLETION_STATUS).nth(1).textContent();
    expect(completedStatusImport).toEqual('Completed');
    if (completedStatusImport == 'Completed') {
      let successStatus = await page.locator(selectors.flowBuilderPagePO.JOB_ERRORS).nth(1).textContent();
      expect(successStatus).toEqual('Success');
    }
    await io.homePage.loadingTime();
    //TC_C102617 Verify added hover text For all 'T' icon
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    test.step("*** clicking on run test ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    test.step("*** clicking on import ***", async () => { });
    await io.homePage.loadingTime();
    //Directory path
    const hoverText = await page.locator(
      selectors.flowBuilderPagePO.FTP_DIRECTORY_PATH_DATA_TEST
    );
    await hoverText.focus();
    await hoverText.hover();
    let helpTooltip = await page.locator(
      selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
    ).nth(0);
    await io.assert.expectToContainValue(
      "View test run results",
      await helpTooltip.textContent(),
      ""
    );
    //File Name
    const hoverText1 = await page.locator(
      selectors.exportsPagePO.FILE_NAME_HOTSPOT_ICON
    );
    await hoverText1.focus();
    await hoverText1.hover();
    let helpTooltip1 = await page.locator(
      selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
    ).nth(0);
    await io.assert.expectToContainValue(
      "View test run results",
      await helpTooltip1.textContent(),
      ""
    );
    test.step("*** Verified hover text for handlebar T icon ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking on cancel ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async () => { });
  });
});
