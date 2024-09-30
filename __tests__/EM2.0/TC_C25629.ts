
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C25629.json";
import { allure } from "allure-playwright";

test.describe("TC_C25629 | TC_C23896", () => {
  let flowId: string;
  let scriptId: string;
  test.beforeEach(async ({io}) => {
    scriptId = await io.api.getScriptId(TC.scriptBody.name);
    if (!scriptId) {
      scriptId = await io.api.createScriptViaAPI(
        TC.scriptBody
      );
    }
    TC.qa__api_tdata[0].pageGenerators[0].qa__export.hooks.preSavePage._scriptId =
      scriptId;
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io, page}) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("@Env-All @Zephyr-IO-T7242 TC_C25629 | Verify that the HTTP request and response are not shown when an error happens in Filter,premap,mapping,post map steps.", async ({io, page}) => {
    let flow = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = flow.get(TC.name)["flowId"];
await test.step(
      "Created Flow " + flow.get(TC.name)["flowName"] + " With ID " + flowId
, async ()=>{});
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flowId,
      [0, 0, 1]
    );

    await io.homePage.loadingTime();
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await io.homePage.loadingTime();
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();
await test.step(
      "Opened Actions Menu From Error Details Table"
, async ()=>{});
    const httpRequestErrors = await page.locator(
      selectors.flowBuilderPagePO.VIEW_REQUEST).isVisible();
    const httpResponseErrors = await page.locator(
      selectors.flowBuilderPagePO.RESPONSE).isVisible();
    test.step("HTTP Request Errors is being shown", async ()=>{});
    await io.assert.expectToBeFalse(httpRequestErrors,"")
    await io.assert.expectToBeFalse(httpResponseErrors,"")
    test.step("HTTP Response Errors is being shown", async ()=>{});
    await io.emailPage.closeWindow();
  });

  test("@Env-All @Zephyr-IO-T7439 TC_C23896 | Verify the refresh button functionality in Run history tab", async ({io,page}) => {
    let flowName = "TC_23896_DND";
    await io.goToFlowsPage();
    test.step("Clicking on the flow", async ()=>{});
    const flowID = await io.api.getFlowId(flowName);
    await io.flowBuilder.navigateToTheFlow(  flowID);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("Clicking on the Run History tab", async ()=>{});

    const buttons = ".MuiButton-iconSizeMedium";
    const buttonsLen = await io.homePage.getLengthOfElementArray(buttons);
    await io.homePage.clickButtonByIndex(buttons, buttonsLen - 2);
    await io.homePage.loadingTime();
    test.step("Clicked On Next Page Button", async ()=>{});

    let pageElements = (
      (await page.locator("button + span").nth(1).textContent()).toString()).split(" ");
    const prevTotalCount = pageElements[4];
    expect(+pageElements[0]).toEqual(51);
    await io.api.runBatchFlowViaAPI(flowName, flowID);
    await io.api.verifyFlowStatus( flowName, flowID, [1, 0, 1]);
    await page.getByText("Refresh").click();
    await io.homePage.loadingTime();
    pageElements = (
      (await page.locator("button + span").nth(1).textContent()).toString()).split(" ");

    expect(+pageElements[0]).toEqual(1);
    expect(+prevTotalCount).toBeLessThan(+pageElements[4]);
  });
});
