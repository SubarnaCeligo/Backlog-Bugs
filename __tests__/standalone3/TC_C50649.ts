import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C50649.json";

test.describe("TC_C50649", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });

  test("@Zephyr-IO-T23342 @Env-All TC_C50649", async ({io,page}, testInfo) => {
    test.step("*** Creating Connection ***", async ()=>{});
    var connId = await io.connections.createConnectionViaAPI(TC.connectionData.qa__api_tdata[0].createConnections);

    //Get Request
    await io.api.getCall( "v1/connections/" + connId,  async ()=>{});

    //Put Request
    await io.api.putCall( "v1/connections/" + connId,  JSON.stringify(TC.updatedBody));
    test.step("** Updating Connection from put request ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("** Navigating to Home Page ***", async ()=>{});
    await io.homePage.reloadPage();
    test.step("** Refreshing Home Page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C50649");
    await io.homePage.loadingTime();
    var connName = await io.homePage.getText(selectors.myAccountPagePO.CONN_NAME);
    await io.assert.expectToBeValue(String(connName), "TC_C50649", "");
    test.step("*** Verified Connection should be created in IO ***", async ()=>{});
    var connNameStatus = await io.homePage.getText(selectors.basePagePO.CONNSTATUS);
    await io.assert.expectToContainValue("Online",String(connNameStatus), "");
    test.step("*** Verified Connection should be Online ***", async ()=>{});
    test.step("*** Verified Should be able to update the token subschema through Postman ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
});
