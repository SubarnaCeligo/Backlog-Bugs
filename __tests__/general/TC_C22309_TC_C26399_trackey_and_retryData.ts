import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C22309_TC_C26399_trackey_and_retryData.json";

test.describe("TC_C22309_TC_C26399", () => {


  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigate to Home Page ***", () => { });



    await io.homePage.navigateTo(`${process.env["IO_UI_CONNECTOR_URL"]}scripts`);
  });
  test("@Zephyr-IO-T2300 @Zephyr-IO-T6264 @Env-All  TC_C22309_TC_C26399", async ({ io, page }, testInfo) => {
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
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.ACTIONS_MENU_EDIT_RETRY_DATA)
    await io.homePage.loadingTime();
    var data = (await io.homePage.getText(selectors.basePagePO.EDIT_RETRY_DATA)).toString();
    await io.assert.expectToContainValue('  "b": 2',data, "");

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER,1);
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();

    await io.homePage.click(
      selectors.flowBuilderPagePO.VIEWERROR
    );
    await io.homePage.loadingTime();
    var data = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue("Trace key : 4",data, "");

     
    
    await test.step("verified that the tracekey isn't showing",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
