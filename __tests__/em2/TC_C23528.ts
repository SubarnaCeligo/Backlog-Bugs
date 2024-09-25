
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import constants from "@testData/EM2.0/constants.json";
import TC from "@testData/EM2.0/TC_C19874_TC_C20017_TC_C20849.json";

test.describe("(TC_C23528| TC_C28629| TC_C23881| TC_C23878| TC_C23894)", () => {
  let flowId: string;
  let runhistory = selectors.flowBuilderPagePO.RUN_HISTORY;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    flowId = await io.api.getFlowId("TC_C23528_DND");
  });
  test("@Env-All @Zephyr-IO-T7416 TC_C23528 | Able to search the errors - open errors", async ({io, page}) => {
    test.step("** Clicking on the flow TC_027_C19874 **", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBARFILTER, "invalid");
    let res = await io.flowBuilder.verfiyErrorsCountByPages("1000+");
    await io.assert.expectToBeTrue(res, "");
await test.step(
      "*** Verified Able to search the errors - open errors"
, async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7461 TC_C28629 | Verify a new column 'Classification' is added on the errors dashboard", async ({io,page}) => {
    test.step("** Clicking on the flow TC_027_C19874 **", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.changeErrorDrawerView();
    test.step("** Opened 'Open Error' Tab **", async ()=>{});
    let headings = ".MuiPaper-elevation16 .MuiTableCell-head";
    let columns = constants.errorDrawer.openErrors;
    let headers = await io.flowbranching.flowBranchingPage.getList(headings);
    for (let i = 0; i < columns.length; i++) {
      await io.assert.expectToContainValue(columns[i], headers[i], '');
    }
    await io.emailPage.closeWindow();
await test.step(
      "*** Opened Error Drawer And Verified 'Classification' column Is Added***"
, async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7428 TC_C23881 | Verify the headers for the Run history tab", async ({io,page}) => {
    test.step("** Clicking on the flow TC_027_C19874 **", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    test.step("** Clicked On Run History Tab **", async ()=>{});
    const headings = ".MuiTableCell-head";
    const columns = constants.runHistory.columns;
    let res = await io.homePage.verifyAllColumnsPresent(
      headings,
      columns
    );
    await io.assert.expectToBeTrue(res, "");
  });

  test("@Env-All @Zephyr-IO-T7425 TC_C23878 | Verify Run history tab is present in the flow builder", async ({io,page}) => {
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    let ele = runhistory;
    let txt = await io.homePage.getText(runhistory);
    await io.assert.verifyElementToBeClickable(ele);
    await io.assert.expectToBeValue(String(txt), "Run history", "");
    test.step("** Verified 'Run history' Tab Is Preset**", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7437 TC_C23894 | Verify the Refresh button is present in the Run history to right side corner", async ({io,page}) => {
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    let txt = await page.getByText("Refresh").isVisible();
    await io.assert.expectToBeTrue(txt, "");
    test.step("** Verified 'Refresh' Button Is Preset**", async ()=>{});
  });
});
