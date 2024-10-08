
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C22293 from "@testData/EM2.0/TC_C22293_Verify_Multiple_TraceKey_ErrorDetails_Value_One.json";

test.describe("TC_C22293_Verify_Multiple_TraceKey_ErrorDetails_Value_One", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T6256 TC_C22293_Verify_Multiple_TraceKey_ErrorDetails_Value_One", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C22293);
    var flowId = flows.get(TC_C22293.name)["flowId"];
await test.step(
      "Created Flow " +
        flows.get(TC_C22293.name)["flowName"] +
        " With ID " +
        flows.get(TC_C22293.name)["flowId"],async () => {
          
        }
    );
    //Checking job status
    await io.api.checkJobStatusFromAPI(
      TC_C22293.name,
      flows.get(TC_C22293.name)["flowId"],
      [0, 0, 1]
    );

    await io.homePage.reloadPage();
    await io.homePage.isPageReady();
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(60000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEWERROR
    );

    var resulttext = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();

    await io.assert.expectToContainValue("Trace key",resulttext, "");
    await io.assert.expectToContainValue("1",resulttext, "");
    test.step("verified the tracekey value as 1", async ()=>{});

    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();

    test.step("*** Click on created export ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    test.step("*** Changing the file name ***", async ()=>{});
    await page.locator(selectors.exportsPagePO.FILE_NAME_FILTER).fill("TC_C22293_2");
    await io.homePage.click(selectors.importPagePO.FETCH_PREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Save and close the export ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("*** Run the flow again ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.isPageReady();
    await io.homePage.delay(60000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEWERROR
    );
    
await test.step(
      "*** verifying Tracekey in the error data ***"
, async ()=>{});
    var trace = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue("Trace key : 1",trace, "");
    test.step("*** Closing the error ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
