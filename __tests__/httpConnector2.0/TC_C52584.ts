
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C52584 Verify creating connection using invalid credentials", () => {
  const connectionName = "Orderful_test_connection";
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(connectionName);
  });
  test("@Zephyr-IO-T17176 @Env-All TC_C52584 Verify creating connection using invalid credentials", async ({io,page}, testInfo) => {
    test.step("*** Click on connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Click on create new resource ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    test.step("*** Select the required application ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    await io.homePage.loadingTime();
    test.step("*** Entering The connection name ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      connectionName
    );
    test.step("*** Entering Invalid token ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      "12345"
    );
    test.step("*** Save the connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("***Searching created connection ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      connectionName
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("***Validating the connection status ***", async ()=>{});
    var data = (await io.homePage.getText(selectors.basePagePO.CONNSTATUS)).toString();
    await io.assert.expectToContainValue("Offline",data, "");
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
