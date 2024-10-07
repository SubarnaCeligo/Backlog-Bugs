
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C22308 from "@testData/EM2.0/TC_C22308.json";

test.describe("TC_C22308", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T2299 TC_C22308| TraceKey as an Array having single element", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C22308);
    var flowId = flows.get(TC_C22308.name)["flowId"];
await test.step(
      "Created Flow " +
        flows.get(TC_C22308.name)["flowName"] +
        " With ID " +
        flows.get(TC_C22308.name)["flowId"],async () => {
          
        }
    );
    //Checking job status
    await io.api.checkJobStatusFromAPI(
      TC_C22308.name,
      flows.get(TC_C22308.name)["flowId"],
      [0, 0, 1]
    );
    //Opening error table
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(30000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();

    await io.homePage.isPageReady();
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEWERROR
    );

    
    var resulttext = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();

    await io.assert.expectToContainValue("Trace key : 4",resulttext, "");
    test.step("verified the tracekey value as 4", async ()=>{});
  });
});
