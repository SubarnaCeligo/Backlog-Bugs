
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/EM2.0/TC_C26398_Verify_TraceKey_In_Export_TransformRule_Error.json";

test.describe("TC_C26398_Verify_TraceKey_In_Export_TransformRule_Error", () => {
  test("@Env-All @Zephyr-IO-T6262 TC_C26398_Verify_TraceKey_In_Export_TransformRule_Error", async ({io,page}, testInfo) => {
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    await test.step(
      "Created Flow " +
      flows.get(FTP.name)["flowName"] +
      " With ID " +
      flows.get(FTP.name)["flowId"], async () => {

      }
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.navigateToTheFlow(
      flows.get(FTP.name)["flowId"]
    );
    await io.api.checkJobStatusFromAPI(
      FTP.name,
      flows.get(FTP.name)["flowId"],
      [0, 0, 1]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();
    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEWERROR
    );
    await io.homePage.loadingTime();
    await test.step(
      "*** verifying Tracekey in the error data ***"
, async ()=>{});
    var data = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue("Trace key",data, "");
    test.step("*** Closing th error ***", async ()=>{});
    await io.emailPage.closeWindow();
  });
});
