import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C40123 from "@testData/STANDALONE/TC_C40123.json";

test.describe("TC_C40115_Creating_Valid_Amazon_redshift_connection", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test.afterEach(async ({io,page}, testInfo) => {
    // *Deleted Connection
    test.step("*** Deleting Cloned Flow ***", async ()=>{});
    await io.connections.deleteConnection(TC_C40123.TC_40115_Name);
  });
  test("@Zephyr-IO-T7559 @Env-All TC_C40115_Creating_Valid_Amazon_redshift_connection", async ({io,page}, testInfo) => {
    test.step("*** Select the standalone integarion ***", async ()=>{});
    test.step("*** Click on the resources and connections***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Select the adapter ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Enter the name of the connection ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, TC_C40123.TC_40115_Name);
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
   await io.homePage.loadingTime()
   const isBorrowCurrencyVisiible = await io.homePage.isVisible(selectors.connectionsPagePO.BORROWCONCURRENCY)
   if(!isBorrowCurrencyVisiible){ 
   await io.homePage.click(selectors.importPagePO.ADVANCED);
   }
    test.step("*** Select the borrow concurrency***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.BORROWCONCURRENCY);

    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "AMAZON REDSHIFT CONNECTION");
    test.step("*** Save and close the connection***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Select the created connection ***", async ()=>{});
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, TC_C40123.TC_40115_Name);
    await io.homePage.loadingTime();
    test.step("*** Verify the amazon redshift Rest application ***", async ()=>{});
    var data = await io.homePage.getText(selectors.connectionsPagePO.CONNECTION_STATUS);
    await io.assert.expectToContainValue("Online",String(data), "");
  });
});
