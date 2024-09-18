
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C25502.json";
import { allure } from "allure-playwright";

test.describe("TC_C25502 | TC_C20855 | TC_C25467", () => {
  let flows;
  let flowId: string;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io, page}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("*** Delete Flow Using UI***", async ()=>{});
  });
  test("@Env-All @Zephyr-IO-T7352 TC_C25502 | Verify the request and response data when the exports has errored out in case of POST request", async ({io, page}) => {
    // Create Flows
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = flows.get(TC.name)["flowId"];
await test.step(
      "**Created Flow " +
        flows.get(TC.name)["flowName"] +
        " With ID " +
        flowId +
        " **",async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flowId,
      [0, 0, 1]
    );
    test.step("*** Flow Execution Completed ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
await test.step(
      "** Opened Flow With Error Source= Application and HTTP Export and POST Request**"
, async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.homePage.reloadPage();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();
await test.step(
      "Opened Actions Menu From Error Details Table"
, async ()=>{});

    const httpRequestErrors = selectors.flowBuilderPagePO.VIEW_REQUEST;
    const httpResponseErrors = selectors.integrationPagePO.HTTPRESPONSEERRORS;
    test.step("HTTP Request Errors is being shown", async ()=>{});
    await io.assert.verifyElementToBeClickable(httpRequestErrors);
    test.step("HTTP Response Errors is being shown", async ()=>{});
    await io.assert.verifyElementToBeClickable(httpResponseErrors);
  });

  test("@Env-All @Zephyr-IO-T7399 TC_C20855 | Verify the line graph filter is set to last 30 days by default", async ({io,page}) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ANALYTICS_TAB);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Navigated to Analytics tab ***", async ()=>{});
    let rangeSelected = await io.homePage.getText(selectors.flowBuilderPagePO.DATERANGE_SELECTOR);
    await io.assert.expectToBeValue(String(rangeSelected), "Last 30 days", "");
await test.step(
      `*** 'Last 30 days' Set By Default In Integration Level***`
, async ()=>{});
    await io.homePage.loadingTime();
    const flowID = await io.api.getFlowId("Mysql to mysql flow_DND");
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowID);
    await io.homePage.click(
      selectors.flowBuilderPagePO.CHARTS
    );
    rangeSelected = await io.homePage.getText(
      ".MuiPaper-elevation16 button:nth-child(3)"
    );
    await io.assert.expectToBeValue(String(rangeSelected), "Last 30 days", "");
await test.step(
      `*** 'Last 30 days' Set By Default In Flow Level***`
, async ()=>{});
    await io.emailPage.closeWindow();
  });

  test("@Env-All @Zephyr-IO-T7345 TC_C25467 | Verify Resolved graphs position", async ({io, page}) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ANALYTICS_TAB);
    test.step("*** Navigated to Analytics tab ***", async ()=>{});
    await io.homePage.loadingTime();
    const graphsTitles = await page.$$(
      selectors.basePagePO.GRAPH_TILES
    );
    let resolvedAtBottom = (
      await (graphsTitles[graphsTitles.length - 1]).textContent()
    ).includes("Resolved");
    await io.assert.expectToBeTrue(resolvedAtBottom, "");
    test.step("*** Verified Resolved Graphs Position ***", async ()=>{});
  });
});
