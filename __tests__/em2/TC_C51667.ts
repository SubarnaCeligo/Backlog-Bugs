
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C51667.json";

test.describe("TC_C51667", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T19819 TC_C51667", async ({io,page}, testInfo) => {
    const flowName = "TC_C51667_DND";
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
    await test.step(
      "*** Retreiving data from edit retry data tab ***"
, async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const textarea = await page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT);

    await textarea.focus();
    await io.homePage.loadingTime();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await io.homePage.fill(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT, '{}');
    
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.SAVE_AND_NEXT);
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.STATUS,
      3
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const textarea2 = await page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT);
    console.log(textarea2);
    console.log("textarea start");
    await textarea2.focus();
    await io.homePage.loadingTime();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await io.homePage.fill(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT, '{}');
    
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.SAVE_AND_NEXT);
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 1);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 2);
    await io.homePage.loadingTime();
    test.step("Edited the retry data in two errors data", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.homePage.click("li"+ selectors.myAccountPagePO.SELECTED_ERROR);
    await io.flowBuilderDashboard.waitTillRetryCompletes();
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(3);
await test.step(
      "Verfied able to retry data from top drawer and retrued data went to resolve"
, async ()=>{});
  });
});
