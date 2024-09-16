
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_51665.json";

test.describe("TC_C51665", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T19812 @Zephyr-IO-T19794 @Zephyr-IO-T19825 @Zephyr-IO-T19783 TC_C51660,TC_C51642,TC_51674,TC_51631", async ({io,page}, testInfo) => {
    const flowName = "TC_C51665_DND";
    await io.homePage.clickByText(flowName);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const flowId = await io.api.getFlowId(flowName);
    await io.api.runBatchFlowViaAPI(flowName, flowId);
    const lastRun = page.getByText('Last run')
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    test.step("*** Clicking on the error ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
await test.step(
      "*** Retreiving data from edit retry data tab ***"
, async ()=>{});
    const initialText = await io.homePage.getText(
      selectors.flowBuilderPagePO.RESPONSE_CONTENT
    );
    await io.homePage.loadingTime();

    test.step("*** searching for random error ***", async ()=>{});
    await io.homePage.fillWebPage(
      "[data-test = 'homeSearchInput']",
      "sample error"
    );
    
    test.step("*** Clearing the search text ***", async ()=>{});
    await io.homePage.clearTextValue("[data-test = 'homeSearchInput']");
await test.step(
      "*** Retreiving data from edit retry data tab ***"
, async ()=>{});
    const currentText = await io.homePage.getText(
      selectors.flowBuilderPagePO.RESPONSE_CONTENT
    );
await test.step(
      "*** Verifying that the first error is highlighted test.afterEach clearing the search text ***"
, async ()=>{});
    await io.assert.expectToBeValue(String(initialText), String(currentText), ""); //51660 done
    test.step("*** Clicking on resolved errors tab ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB
    );

    let DropDown = await page.$$(selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS);
    expect(DropDown).toHaveLength(0);
await test.step(
      "*** Verified that toggleView DropDown is not present in resolved errors ***" // 51642 done
, async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.OPENERRORS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
await test.step(
      "*** Retreiving data from edit retry data tab ***"
, async ()=>{});
    const text = await io.homePage.getText(
      selectors.flowBuilderPagePO.RESPONSE_CONTENT
    );
    test.step("*** Clicking on the Next button ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.NEXT_ERROR_BUTTON
    );

    const text2 = await io.homePage.getText(
      selectors.flowBuilderPagePO.RESPONSE_CONTENT
    );
await test.step(
      "*** Verifying the change in edit retry tab indicating different error being focused ***"
, async ()=>{});
    expect(text).not.toBe(text2); // 51674,51631 done
    test.step("*** Clicking on the Retry & next button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_AND_NEXT);
    
await test.step(
      "*** Retreiving data from edit retry data tab ***"
, async ()=>{});
    const text3 = await io.homePage.getText(
      selectors.flowBuilderPagePO.RESPONSE_CONTENT
    );
await test.step(
      "*** Verifying the change in edit retry tab indicating different error being focused ***"
, async ()=>{});
    expect(text3).not.toBe(text2);
  });
});
