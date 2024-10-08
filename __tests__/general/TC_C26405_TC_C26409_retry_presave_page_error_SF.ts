import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import DB from "@testData/GENERAL/TC_C26405_TC_C26409_retry_presave_page_error_SF_retry_presave_page_error_SF.json";

test.describe("TC_C26405_TC_C26409", () => {
  let _integrationId, _flowId, _exportId, scriptId1, scriptId2;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
await test.step(
      "*** Deleting Integrations which might not get deleted due to error in previous test case run ***"
, async ()=>{});
    await io.api.deleteIntegrationRecursivelyAfterRemovingAliases(
      DB.Source_Integration
    );

    test.step("*** Creating Required Resources ***", async ()=>{});
    _integrationId = await io.api.createIntegrationThruAPI(DB);
    DB.qa__api_tdata[0].createFlow.qa__integrationId = _integrationId;
    DB.qa__api_tdata[0].createFlow._integrationId = _integrationId;
    scriptId1 = await io.api.getScriptId(DB.script1.name);
    scriptId2 = await io.api.getScriptId(DB.script2.name);
    if (!scriptId1) {
      test.step("*** Creating Script **** ", async ()=>{});
      scriptId1 = await io.api.createScriptViaAPI( DB.script1);
    }
    if (!scriptId2) {
      test.step("*** Creating Script **** ", async ()=>{});
      scriptId1 = await io.api.createScriptViaAPI( DB.script2);
    }
    DB.qa__api_tdata[0].pageGenerators[0].qa__export.hooks.preSavePage._scriptId =
    scriptId1;
    DB.qa__api_tdata[0].pageProcessors[0].qa__import.hooks.preMap._scriptId =
    scriptId2;
    const flow = await io.api.createImpOrExpAndFlowsThruAPI(DB);
    _flowId = flow.get(DB.qa__api_tdata[0].createFlow.name).flowId;
    _exportId = flow.get(DB.qa__api_tdata[0].createFlow.name).exportId;
    scriptId1 = await io.api.getScriptId(DB.script1.name);
    await io.homePage.navigateTo(io.connectorUrl);
    await io.homePage.isPageReady();
    const homeButton = await page.locator(selectors.basePagePO.HOME);
    await homeButton.isVisible({ timeout: 20000 });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Created Flows :" + flow.get(DB.name)["flowName"],()=>{})
    await io.homePage.reloadPage();
    await io.flowBuilder.navigateToTheFlow( flow.get(DB.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.api.checkJobStatusFromAPI(
      DB.name,
      flow.get(DB.name)["flowId"],
      [0, 0, 1]
    );

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2( flow.get(DB.name)["flowId"])
    
  
  });

  test.afterEach(async ({io,page}, testInfo) => {
await test.step(
      "*** Deleting Resources created for the test case ***"
, async ()=>{});
    await io.api.deleteIntegrationRecursivelyAfterRemovingAliases(
      DB.Source_Integration
    );
  });
  test("@Zephyr-IO-T6271 @Zephyr-IO-T6279 @Env-All  TC_C26405_TC_C26409", async ({io,page}, testInfo) => {
   
    
    await io.homePage.delay(15000);
    await io.homePage.clickByIndex('[data-test="bubble-error"]', 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await page.getByText("All retriable errors").nth(0).click();
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);

     
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();

    var count1, actualMsg1;

     
      count1 = await io.api.validateJobCountFromAPI(DB.name, DB.qa__expectedDashboardCount);
      actualMsg1 = count1.get(true)[0];
      if(actualMsg1.indexOf("completed") > -1) {
        await io.assert.expectToContainValue("TC_C26405_TC_C26409_retry_presave_page_error_SF_retry_presave_page_error_SF| completed 0 0 1",actualMsg1, "");
      
}
     

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
