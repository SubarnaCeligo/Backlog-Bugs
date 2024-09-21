import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C50648.json";

test.describe("TC_C50648", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(TC.PostBody.name);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T23341 @Env-All TC_C50648_Verify_userAble_To_CreateConnection_ByProviding_TokenPaths_in_StringArray", async ({io,page}, testInfo) => {
    test.step("** Getting response from post request ***", async ()=>{});
    await io.api.postCall( "v1/connections",  JSON.stringify(TC.PostBody));
    test.step("** Creating Connection from post request ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("** Navigating to Home Page ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("** Refreshing Home Page ***", async ()=>{});
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C50648_Connection");
    await io.homePage.loadingTime();
    var connName = await io.homePage.getText(selectors.myAccountPagePO.CONN_NAME);
    await io.assert.expectToBeValue(String(connName), "TC_C50648_Connection", "");
    test.step("*** Verified Connection should be created in IO ***", async ()=>{});
    var connNameStatus = await io.homePage.getText(selectors.basePagePO.CONNSTATUS);
    await io.assert.expectToContainValue("Online",String(connNameStatus), "");
    test.step("*** Verified Connection should be Online ***", async ()=>{});
    test.step("*** Verified Should be able to create a connection in IO having multiple values in  Paths to encrypted field ***", async ()=>{});
  });
});
