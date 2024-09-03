
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import jsonData from "@testData/STANDALONE/TC_C106460.json";

test.describe("TC_C106460", () => {
  let _integrationId;
  var flows, _flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    test.step("*** Deleting Integrations which might not get deleted due to error in previous test case run ***", async ()=>{});
    await io.api.deleteIntegrationRecursively(jsonData.qa__api_tdata[0].createIntegrations.name);
  });

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting Resources created for the test case ***", async ()=>{});
    await io.api.deleteFlowsWithId([_flowId]);
    await io.api.deleteIntegration(_integrationId);
  });

  test("TC_C106460 @Zephyr-IO-T23743 @Env-All", async ({ io, page }, testInfo) => {
    test.step("*** Creating Integration ***", async ()=>{});
    _integrationId = await io.api.createIntegrationThruAPI(jsonData);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    jsonData.qa__api_tdata[0].createFlow._integrationId = _integrationId;

    test.step("*** Creating Flow ***", async ()=>{});
    //*Create Flows
    flows = await io.api.createImpOrExpAndFlowsThruAPI(jsonData, true);
    await test.step("Created Flow " + flows.get(jsonData.flowname)["flowName"] +
        " With ID " +
        flows.get(jsonData.flowname)["flowId"],async ()=>{}
    );
    _flowId = flows.get(jsonData.qa__api_tdata[0].createFlow.name).flowId;

    //Run Flow
    await io.api.checkJobStatusFromAPI( jsonData.name, _flowId, [0, 0, 20]);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();

    //TC_C106460 Verify if user click on open errors from home page where all open errors are in same flow.
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION_WDIO, "TC_C106460");
    test.step("***   Searched With Integration Name TC_C106460   ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.integrationPagePO.CLICKONERRORS, "20 errors");
    await io.homePage.loadingTime();
    const alertText = "All open errors in this integration are in this flow.";
    var result = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      alertText
    );
    await io.assert.expectToBeTrue(result, "Notification text is not matching");
    test.step("*** Verified pop-up should show : 'All open errors in this integration are in this flow.' ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.integrationPagePO.CLICKONERRORS, "10 errors");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** clicking on close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** clicking on close ***", async ()=>{});
    var data = await io.homePage.isVisible(await selectors.homePagePO.TILE_VIEW);
    await io.assert.expectToBeTrue(data, "");
    test.step("***   Verified After closing drawer page should re-direct to Home page   ***", async ()=>{});
    await io.homePage.loadingTime();

    test.step("*** Deleting all flows in Integration ***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
