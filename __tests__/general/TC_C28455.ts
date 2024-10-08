import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import DB from "@testData/GENERAL/TC_C28455.json";

test.describe("TC_C28455", () => {
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
    await io.homePage.reloadPage();
  });

  test.afterEach(async ({io,page}, testInfo) => {
await test.step(
      "*** Deleting Resources created for the test case ***"
, async ()=>{});
    await io.api.deleteIntegrationRecursivelyAfterRemovingAliases(
      DB.Source_Integration
    );
  });
  test("@Zephyr-IO-T2269 @Env-All  TC_C28455", async ({io,page}, testInfo) => {
   
      
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTS);
    await test.step("***Clicked on Script ***",()=>{});

    //Name
    await io.homePage.isPageLoaded();
    await io.homePage.clickByIndex("table>thead>tr>th>span", 1);
    var NameBeforeSorting = (await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW)).toString()
    await io.homePage.clickByIndex("table>thead>tr>th>span",1);
    await test.step("*** clicked on Last updated***",()=>{});
    var NameAfterSorting = (await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW)).toString()

    //Last Updated
    var ScriptBeforeSortingTime = (await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW)).toString()
    await io.homePage.clickByIndex("table>thead>tr>th>span",0);
    await test.step("*** clicked on Last updated***",()=>{});
    var ScriptAfterSortingTime = (await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW)).toString()
    expect(NameBeforeSorting).not.toEqual(NameAfterSorting);
    await test.step("*** Sorting is working properly in Name tab***",()=>{});
    expect(ScriptBeforeSortingTime).not.toEqual(ScriptAfterSortingTime);
    await test.step("*** Sorting is working properly in Time tab.***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
