import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import DB from "@testData/GENERAL/TC_C30843_C30848_scriptDebugger.json";

test.describe("TC_C30843_C30848_scriptDebugger", () => {
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
  test("@Zephyr-IO-T2531 @Zephyr-IO-T2532 @Env-All  TC_C30843_C30848_scriptDebugger", async ({io,page}, testInfo) => {
    
   
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTS);
    await test.step("***Clicked on Script ***",()=>{});
    await test.step("*** Clicked on scripts tab ***",()=>{});
    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 1);
    await test.step("*** Clicked on action menu of script ***",()=>{});
    await io.homePage.click(selectors.myAccountPagePO.VIEWEXECUTIONLOG);
    await test.step("*** Clicked on execution logs of script ***",()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);

    await io.homePage.loadingTime();

    await io.homePage.click(selectors.myAccountPagePO.DATEFILTER);
    await test.step("*** Clicking on date filter in script execution logs ***",()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.DATERANGEOPTION, "Custom");
    await test.step("*** Clicking on custom date range ***",()=>{});

    await io.homePage.click(selectors.integrationPagePO.SELECTTODAY);
    await test.step("*** Selecting today's date from the options ***",()=>{});

    await io.homePage.click(selectors.integrationPagePO.APPLYSELECTRANGE);
    await test.step("*** Clicking on apply ***",()=>{});

    
    await io.homePage.click(selectors.myAccountPagePO.PAUSEFETCH);

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    const text = await page.locator('[id="tabpanel-5"]  div.text-base').textContent();
    await io.assert.expectToContainValue("Fetching paused...",text, '' );
    
    await test.step("*** Verified Fetching Pauses on clicking on Pause button ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.myAccountPagePO.RESUMEFETCH);

    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await test.step("*** Verified Fetching logs on clicking on Resume button ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to homePage ***",()=>{});
  });
});
