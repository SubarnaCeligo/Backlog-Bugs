import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C49907.json";

test.describe("TC_C49907_C49906_C49905", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Delete created Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(HTTP.apiConnections[0].updatedBody2.name);
  });
  test("@Zephyr-IO-T10029 @Zephyr-IO-T10030 @Zephyr-IO-T10031 @Env-All TC_C49907_C49906_C49905", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test ***", async ()=>{});
    var conn = await io.connections.createConnectionViaAPI(HTTP.apiConnections[0].importJSON);

    var Response = await io.api.putCall("v1/connections/" + conn,  HTTP.apiConnections[0].updatedBody);
    const errorMsg = await Response.json();
    await io.assert.expectToContainValue("`dummy` is not a valid enum value for path `http.auth.token.refreshResponseMediaType`.", JSON.stringify(errorMsg), "");
    test.step("Verifying Error received ", async ()=>{});

    //C49906
    io.api.putCall
    await io.api.putCall( "v1/connections/" + conn,  HTTP.apiConnections[0].updatedBody1);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, HTTP.apiConnections[0].updatedBody1.name);
    await io.homePage.loadingTime();

    let status = await page.$$(selectors.flowBuilderPagePO.STATUS);
    var status1 = [];
    for(let i of status) {
      let text = await i.textContent();
      if(text != "") {
        status1.push(text);
      }
    }
    await io.assert.expectToContainValue("Online", String(status1), "");
    test.step(" Verified Connection should be online when 'refreshResponseMediaType': 'json' is set ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});

    //C49905
    await io.api.putCall( "v1/connections/" + conn,  HTTP.apiConnections[0].updatedBody2);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, HTTP.apiConnections[0].updatedBody2.name);

    await io.homePage.loadingTime();

    let status2 = await page.$$(selectors.flowBuilderPagePO.STATUS);
    var status3 = [];
    for(let i of status2) {
      let text = await i.textContent();
      if(text != "") {
        status3.push(text);
      }
    }
    await io.assert.expectToContainValue("Online", String(status3), "");
    test.step(" Verified Connection should be online when 'refreshResponseMediaType': 'xml' is set ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
