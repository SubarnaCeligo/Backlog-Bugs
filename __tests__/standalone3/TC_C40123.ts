
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C40123 from "@testData/STANDALONE/TC_C40123.json";

test.describe("TC_C40123_Creating_Amazon_redshift_connection_through_integarion_tile", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    // *Deleted Connection
    test.step("*** Deleting Cloned Flow ***", async ()=>{});
    await io.connections.deleteConnection(TC_C40123.Name);
  });
  test("@Zephyr-IO-T7563 @Env-All TC_C40123_Validate_the_amazon_redshift_rest_application", async ({io,page}, testInfo) => {
    test.step("*** Select the standalone integarion ***", async ()=>{});
   await io.goToFlowsPage()
    await io.homePage.loadingTime()
    test.step("*** Click on the connections***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.loadingTime();
    test.step("*** Click on the create connection***", async ()=>{});
    await io.homePage.clickByText("Create connection");
    await io.homePage.loadingTime();
    test.step("*** Select the adapter ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    await io.homePage.loadingTime()
    test.step("*** Enter the name of the connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, TC_C40123.Name);
    test.step("*** Enter the Access key  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AMAZONREDSHIFT_ACCESSKEY, TC_C40123.Access_key);
    test.step("*** Enter the Secret key  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AMAZONREDSHIFT_SECRETACCESSKEY, decrypt(TC_C40123.secret_key)
    );
    test.step("*** Enter the User name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_RDBMS, TC_C40123.user_name);
    test.step("*** Enter the Database name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.DATABASENAME, TC_C40123.db);
    test.step("*** Enter the Cluster***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AMAZONREDSHIFT_CLUSTERNAME, TC_C40123.cluster);
    test.step("*** Click on the advance***", async ()=>{});
    const isVisible = await io.homePage.isVisible(selectors.connectionsPagePO.RDBMS_TARGET_CONCURRENCY_LEVEL)
    if(!isVisible){
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    }
    test.step("*** Select the concurrency***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.RDBMS_TARGET_CONCURRENCY_LEVEL);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "1");
    test.step("*** Save and close the connection***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Click on the resources and connections***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RESOURCES);
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Select the created connection ***", async ()=>{});
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, TC_C40123.Name);
    await io.homePage.loadingTime();
    test.step("*** Verify the amazon redshift Rest application ***", async ()=>{});
    var data = await io.homePage.getText(selectors.connectionsPagePO.CONNECTION_STATUS);
    await io.assert.expectToContainValue("Online",String(data), "");
  });
});
