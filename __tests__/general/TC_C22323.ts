import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C22323 from "@testData/GENERAL/TC_C22323.json";

test.describe("TC_C22323", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2313 @Env-All TC_C22323", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C22323);
    var flow = await io.api.getFlowId(TC_C22323.name);
    //Checking job status
    await io.api.checkJobStatusFromAPI(
      TC_C22323.name,
      flows.get(TC_C22323.name)["flowId"],
      [0, 0, 1]
    );

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2( flows.get(TC_C22323.name)["flowId"])
    
    await io.homePage.delay(15000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
  
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();
    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEWERROR
    );
    await io.homePage.loadingTime();
    var data = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectNotToContainValue("Trace key",data, "");

     
    
    await test.step("verified that the tracekey isn't showing",()=>{});
  });
});
