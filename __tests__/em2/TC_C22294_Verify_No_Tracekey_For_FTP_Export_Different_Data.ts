
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/EM2.0/TC_C22294_Verify_No_Tracekey_For_FTP_Export_Different_Data.json";
import { allure } from "allure-playwright";

test.describe("TC_C22294_Verify_No_Tracekey_For_FTP_Export_Different_Data", () => {
  test("@Env-All @Zephyr-IO-T6258 TC_C22294_Verify_No_Tracekey_For_FTP_Export_Different_Data", async ({io,page}, testInfo) => {
    // *Create Page Generators
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    const flowId = flows.get(FTP.name)["flowId"];
    
    await test.step(
      "Created Flow " +
        flows.get(FTP.name)["flowName"] +
        " With ID " +
        flows.get(FTP.name)["flowId"],async () => {
          
        }
    );
    await io.api.checkJobStatusFromAPI(
      FTP.name,
      flows.get(FTP.name)["flowId"],
      [0, 0, 1]
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.flowBuilderDashboard.waitForErrorMsgToAppear();
    await io.flowBuilderDashboard.openEm2ErrorTable();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
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
    await io.assert.expectNotToContainValue("Trace key",trace, "");
    test.step("*** Closing the error drawer ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();

    test.step("*** Click on created export ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );


    test.step("*** Changing the file name ***", async ()=>{});
    await io.homePage.click(
      selectors.exportsPagePO.FILE_NAME_FILTER
    );
    await io.homePage.loadingTime();
    test.step("*** Changing the file name ***", async ()=>{});
    await page.locator(selectors.exportsPagePO.FILE_NAME_FILTER).fill(
      "TC_C22294_2"
    );
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
    await io.homePage.delay(30000);
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
    var trace2 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.CONTENT
    );
    await io.assert.expectNotToContainValue("Trace key",trace2, "");
    test.step("*** Closing the error drawer ***", async ()=>{});
    await io.emailPage.closeWindow();
    await io.emailPage.closeWindow();
  });
});
