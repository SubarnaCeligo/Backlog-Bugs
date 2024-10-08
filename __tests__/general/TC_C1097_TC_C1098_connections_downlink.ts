import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import conn from "@testData/GENERAL/TC_C1097_TC_C1098_connections_downlink.json";
import * as FTP from "@testData/GENERAL/TC_C1097_TC_C1098_connections_downlink_1.json";

test.describe("TC_C1097_TC_C1098", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T862 @Zephyr-IO-T863  @Env-All TC_C1097_TC_C1098", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime()
    await io.homePage.isPageReady()

    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime()
    await io.homePage.isPageReady()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Don't use");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();
    var intId = await io.api.getIntegrationId("Don't use");

    var connId = await io.connections.createConnectionViaAPI(conn);
    FTP.qa__api_tdata[0].pageGenerators[0].qa__export._connectionId =
      conn.name;
    FTP.qa__api_tdata[0].createFlow._integrationId = intId;
    await io.api.createImpOrExpAndFlowsThruAPI(FTP, true);
    var id = await io.api.getFlowId(FTP.name);

    FTP.qa__api_tdata[0].pageGenerators[0].qa__export._connectionId = "";
    FTP.qa__api_tdata[0].createFlow._integrationId = "";

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.connectorUrl + "integrations/" + intId + "/flowBuilder/" + id);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.homePagePO.SEARCH_INTEGRATION, "Don't use")
    await io.homePage.loadingTime();
    await io.homePage.clickByText('1 connection down');
    await io.homePage.loadingTime();
    var url_conn = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue( "connections", url_conn, "");

     
    var connectionName = await io.homePage.getText('tbody>tr:nth-child(1)>th>a')

    var status = await io.homePage.getText('tbody>tr:nth-child(1)>td:nth-child(2)')
    await io.assert.expectToBeValue( "Don't use", String(connectionName), "");
    await io.assert.expectToBeValue(String(status), "Offline", "");
  });
});
