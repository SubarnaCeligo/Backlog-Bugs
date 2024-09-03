
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C51634.json";

test.describe("TC_C51634_C51636", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T19786 @Zephyr-IO-T19788 TC_C51634_C51636", async ({io,page}, testInfo) => {
    const flowName = "TC_C51634_C51636_DND";
    await io.homePage.clickByText(flowName);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const flowId = await io.api.getFlowId(flowName);
    await io.api.runBatchFlowViaAPI(flowName, flowId);
    const lastRun = page.getByText('Last run')
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    test.step("*** Waiting till flow gets completed ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);

    test.step("Error Table is opened", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NEXT_ERROR_BUTTON);
    const selectedErrorText = await io.homePage.getText("tr.Mui-selected");
    const tableRows = await page.$$("tbody tr");

    const lastErrorText = await tableRows[tableRows.length - 1].textContent();

    await io.assert.expectNotToBeValue(String(selectedErrorText), lastErrorText, "");
await test.step(
      "*** Verfied last error is the selected test.afterEach clicking previous ***"
, async ()=>{});
    // 51634 done
    await io.homePage.clickButtonByIndex(".rule-filter-container > select > option", 2);
    await io.homePage.clickButtonBasedOnLabelName('[role="button"]', "Today");
    await io.homePage.clickButtonBasedOnLabelName(".MuiButton-label", "Apply");
    test.step("*** Setting the filter the to Today ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NEXT_ERROR_BUTTON);

    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 2);
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.ERROR_CHECKBOX, 1);
    // previous and next
    await io.homePage.clickButtonByIndex("h4 button", 0);
    await io.homePage.clickButtonByIndex("h4 button", 1);
    const elements = await page.$$(selectors.myAccountPagePO.ERROR_CHECKBOX);

    const firstElement = elements[1];
    const scondElement = elements[2];
    const classOfFirst = await firstElement.getAttribute("class");
    const classOfSecond = await scondElement.getAttribute("class");

    expect(classOfFirst.indexOf("Mui-checked")).toBeGreaterThan(-1);
    expect(classOfSecond.indexOf("Mui-checked")).toBeGreaterThan(-1);
await test.step(
      "*** Verfied the checkbox selection did not change test.afterEach doing a previous and next ***"
, async ()=>{});
    // 51636
  });
});
