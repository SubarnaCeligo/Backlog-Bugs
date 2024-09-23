
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import confluence from "@testData/HTTPConnector2.0/TC_C63266.json";

test.describe("TC_C63266_C63267", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21733 @Env-All TC_C63266 Verify whether in connections list Handlebars present in the connection is calculated the value for new connection", async ({io,page}, testInfo) => {
    test.step("*** Navigating to connections page", async ()=>{});
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.loadingTime();
    test.step("*** Clicking on the create connection ***", async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    test.step("*** Selecting the Confluence Cloud ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.CONFLUENCE_CLOUD_CONNECTION
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Entering the connection name ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      confluence.connection_name
    );
    test.step("*** Entering the sub domain ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.ZENDESK_SUBDOMAIN,
      confluence.confluence_instanceURL
    );
    test.step("*** Entering the username ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.BASICUSERNAME,
      confluence.confluence_username
    );
    test.step("*** Entering the api token ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.BASIC_PASSWORD,
      confluence.confluence_Token
    );
    test.step("*** Saving the confluence connection ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("*** Searching created connection ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      confluence.connection_name
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiValue = await io.homePage.getText(selectors.basePagePO.TABLE_ROWS);
    expect(apiValue).toContain(confluence.confluence_api);
    test.step("*** Validated the connection api value in the connection list for new connection ***", async ()=>{});
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(confluence.connection_name);
  });
  test("@Zephyr-IO-T21734 @Env-All TC_C63267 Verify whether in connections list Handlebars present in the connection is calculated the value for existing connection", async ({io,page}, testInfo) => {
    test.step("*** Navigating to connections page", async ()=>{});
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Searching the existing connection ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "CONFLUENCE CLOUD CONNECTION"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiValue = await io.homePage.getText(selectors.basePagePO.TABLE_ROWS);
    expect(apiValue).toContain(confluence.confluence_api);
    test.step("*** Validated the connection api value in the connection list for existing connection ***", async ()=>{});
  });
});
