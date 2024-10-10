import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/GENERAL/TC_C1104_error_flows_redirections.json";

test.describe("TC_C1104", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Delete intergation ***", async ()=>{});
    await io.api.deleteIntegrationRecursively("Don't use");
  });
  test("@Zephyr-IO-T868 @Env-All TC_C1104", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    var flow = await io.api.getFlowId(FTP.name);
    //Checking job status
    await io.api.checkJobStatusFromAPI(
      FTP.name,
      flows.get(FTP.name)["flowId"],
      [0, 0, 1]
    );

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2( flows.get(FTP.name)["flowId"])
    
    await io.homePage.delay(15000);
    await io.homePage.loadingTime();

    const text = await io.homePage.getText('[data-test="bubble-error"]');

    await io.assert.expectToContainValue("1 error", text[1], "");

    await io.homePage.clickByTextByIndex("1 error",0);

    const url = await io.homePage.getCurrentUrl();

    await io.assert.expectToContainValue("flowBuilder", url, "");
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
