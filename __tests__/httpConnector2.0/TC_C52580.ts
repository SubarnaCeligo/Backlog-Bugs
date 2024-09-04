
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("TC_C52580", () => {
  const connectionName = "Orderful Test Connection";
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(connectionName);
  });
  test("@Zephyr-IO-T17172 @Env-All TC_C52580", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** click on create connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Select orderful connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    await io.homePage.loadingTime();
    test.step("*** Select HTTP type ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.HTTP_2DOT0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Enter the connection name ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      connectionName
    );
    test.step("*** Enter the token details ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      decrypt(process.env["ORDERFUL_Token"])
    );
    test.step("*** Test the created connection***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.TEST_CONNECTION
    );
    await io.homePage.loadingTime();
    var connecText = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      "Your connection is working great! Nice Job!"
    );
    await io.assert.expectToBeTrue(connecText, "");
await test.step(
      "Verified user should be able to test the connection successfully and save test"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("***Searching created connection ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.HOME_SEARCH);
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      connectionName
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("***Validating the connection ***", async ()=>{});
    var data = await io.homePage.getText(
      selectors.integrationPagePO.SELECTSTACKLIST
    );
    await expect(data).toContain(connectionName);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
