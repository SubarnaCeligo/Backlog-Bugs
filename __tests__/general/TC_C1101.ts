import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import jsonData from "@testData/GENERAL/TC_C1101.json";


test.describe("TC_C1101", () => {
  let _integrationId, flowId, flow, _httpConnectionId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Creating Required Resources ***", async ()=>{});
    _integrationId = await io.api.createIntegrationThruAPI(jsonData);
    _httpConnectionId = await io.connections.createConnectionViaAPI( JSON.stringify(jsonData.apiConnections[0].importJSON)
    );
    jsonData.qa__api_tdata[0].createFlow.qa__integrationId = _integrationId;
    jsonData.qa__api_tdata[0].createFlow._integrationId = _integrationId;
    jsonData.qa__api_tdata[0].pageProcessors[0].qa__import._connectionId =
      _httpConnectionId;
    jsonData.qa__api_tdata[0].pageGenerators[0].qa__export._connectionId =
      _httpConnectionId;
    flow = await io.api.createImpOrExpAndFlowsThruAPI(jsonData);
    flowId = flow.get(jsonData.qa__api_tdata[0].createFlow.name)["flowId"];
  });
  test.afterEach(async ({io,page}, testInfo) => {
    // Delete Flow
    await io.api.deleteFlowsWithId([flowId]);
    test.step("*** Delete Flows Using UI***", async ()=>{});
    // Delete Integration
    await io.api.deleteIntegrationRecursively(jsonData.qa__api_tdata[0].createIntegrations.name);
    // *Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(  jsonData.apiConnections[0].importJSON, _httpConnectionId);
  });

  test("TC_C1101", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Rest Zendesk Connection");
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.CLICKONCONNECTION, "Rest Zendesk Connection");
    test.step("clicked on connection", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("clicked on close", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.homePagePO.SEARCH_INTEGRATION_WDIO, "NEW INTEGRATION");
    await test.step("***Searched With Integration Name (Automation Flows)***",async ()=>{});
    await io.homePage.click("//span[contains(text(),'connection down')]");
    test.step("***Clicked on Connection Down Link***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    test.step("***Clicked On Action Menu***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    test.step("***Clicked On Edit Connection***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BASIC_PASSWORD, decrypt(jsonData.testData[0].importJSON.http.auth.basic.qa__password)
    );

    test.step("*** Save the connection ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageReady();

    let status = await page.$$(selectors.flowBuilderPagePO.STATUS);
    var status1 = [];
    for(let i of status) {
      let text = await i.textContent();
      if(text != "") {
        status1.push(text);
      }
    }
    await io.assert.expectToBeValue(String(status1), "Online", "");
    test.step(" Verified Offline connection should be updated and should be changed to online Status ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
  });
});
