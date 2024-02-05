
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import conn from "@testData/GENERAL/TC_C1097_TC_C1098_connections_downlink.json";
import FTP from "@testData/GENERAL/TC_C1097_TC_C1098_connections_downlink_1.json";

test.describe("TC_C1097_TC_C1098", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C1097_TC_C1098", async ({io,page}, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Don't use");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();
    var intId = await io.api.getIntegrationId("Don't use");

    var connId = await io.connections.createConnectionViaAPI(conn);
    FTP.qa__api_tdata[0].pageGenerators[0].qa__export._connectionId =
      connId._id;
    FTP.qa__api_tdata[0].createFlow._integrationId = intId;
    await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    var id = await io.api.getFlowId(FTP.name);

    FTP.qa__api_tdata[0].pageGenerators[0].qa__export._connectionId = "";
    FTP.qa__api_tdata[0].createFlow._integrationId = "";

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.navigateTo(io.connectorUrl + "integrations/" + intId + "/flowBuilder/" + id);
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.isPageLoaded();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.isPageLoaded();

    var loc = await page.$$(selectors.integrationPagePO.INTEGRATIONNAME);
    looping: for(var i = 0; i < loc.length; i++) {
      if((await loc[i].textContent()) == "Don't use") {
        await(await page.locator(selectors.basePagePO.CONNECTION_DOWNLINK)
        ).click();
        break looping;
      }
    }
    var url_conn = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(url_conn, "connections", "");

    var connectionName = await(await page.locator(selectors.myAccountPagePO.ACCESSTOKEN)
    ).textContent();
    await io.assert.expectToBeValue(String(connectionName), "Don't use", "");
    await io.assert.expectToBeValue(String(selectors.importPagePO.STATUS), "Offline", "");

    await io.homePage.click(selectors.myAccountPagePO.ACCESSTOKEN);
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.click(selectors.myAccountPagePO.OFFLINECONNECTION);
    await io.homePage.fillWebPage(selectors.connectionsPagePO.FTP_PASSWORD, decrypt(await process.env["FTP_UPLOAD_SECRET"])
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.isPageLoaded();

    await io.assert.expectToBeValue(String(selectors.importPagePO.STATUS), "Online", "");

    // await io.deleteFlowThroughApi(id);
    await io.integrationPage.deleteAllFlowsInIntegration("Don't use");
    // await io.api.deleteIntegration(intId);
    await io.integrationPage.deRegisterAllConnectionsInIntegration("Don't use");
    await io.integrationPage.deleteIntegrationfromUI("Don't use");
    
    // await io.connections.deleteConnection(connId._id);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
