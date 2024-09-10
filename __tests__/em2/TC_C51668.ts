
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_51668.json";
// import clearValue from "webdriverio/build/commands/element/clearValue";

test.describe("Unify Error tests | Golden ", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T19820 @Zephyr-IO-T19818 @Zephyr-IO-T19817 TC_C51668,TC_C51666,TC_C51665", async ({io,page}, testInfo) => {
    const flowName = "TC_C51668_DND";
    await io.homePage.clickByText(flowName);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const flowId = await io.api.getFlowId(flowName);
    await io.api.runBatchFlowViaAPI(flowName, flowId);
    const lastRun = page.getByText('Last run')
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    test.step("*** Clicking on the error ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on the Next button ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.NEXT_ERROR_BUTTON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
await test.step(
      "*** Retreiving data from edit retry data tab ***"
, async ()=>{});
    const text = await io.homePage.getText(
      selectors.flowBuilderPagePO.RESPONSE_CONTENT
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIOUS_ERROR_BUTTON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Editing the retry data ***", async ()=>{});
    var settext = await page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ERROR_CONTENT);
    await settext.clear();
    await settext.fill(',\t"new_value": "new"}');
await test.step(
      "*** Clicking on the Save,Retry & Next button ***"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_RETRY_AND_CLOSE
    ); //51665 done
    
await test.step(
      "*** Retreiving data from edit retry data tab ***"
, async ()=>{});
    const currentText = await io.homePage.getText(
      selectors.flowBuilderPagePO.RESPONSE_CONTENT
    );
await test.step(
      "*** Verifying that next error is highlighted ***"
, async ()=>{});
    await io.assert.expectToBeValue(String(text), String(currentText), ""); // 51668 done

    let checkboxes = await page.$$(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_UNCHECKED
    );
    let n = checkboxes.length;
    test.step("*** Checking the Add to Batch checkbox ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      ".MuiCheckbox-root",
      3
    );
    test.step("*** Clicking on the Next button ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.NEXT_ERROR_BUTTON
    );
    checkboxes = await page.$$(".MuiCheckbox-root");
    n = checkboxes.length;
    test.step("*** Checking the Add to Batch checkbox ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      ".MuiCheckbox-root",
      2
    );
await test.step(
      "*** Clicking on the resolve errors dropDown ***"
, async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.RESOLVEJOBS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
await test.step(
      "*** Clicking on resolve errors option from the dropdown ***"
, async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 2);
    await io.homePage.loadingTime();
    const found = await page.isVisible(selectors.basePagePO.SAVE_RETRY_AND_CLOSE);
    expect(found).toBeFalsy(); // 51666 done
    test.step("*** Navigating to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
