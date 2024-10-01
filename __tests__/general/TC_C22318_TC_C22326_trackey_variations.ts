import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C22318_trackekey_ftp.json";
import FTP1 from "@testData/GENERAL/TC_C22326_max_breadth_depth_tracekey.json";

test.describe("TC_C22318_TC_C22326", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T2308 @Env-All TC_C22318", async ({io,page}, testInfo) => {
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

  test("@Zephyr-IO-T2303 @Env-All  TC_C22326", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP1);
    var flow = await io.api.getFlowId(FTP1.name);
    //Checking job status
    await io.api.checkJobStatusFromAPI(
      FTP1.name,
      flows.get(FTP1.name)["flowId"],
      [0, 0, 1]
    );

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2( flows.get(FTP1.name)["flowId"])
    
    await io.homePage.delay(15000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
  
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();
     
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();

    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEWERROR
    );
    await io.homePage.loadingTime();
    var data = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue("Trace key : 5",data, "");

     
    
    await test.step("verified that the tracekey isn't showing",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
