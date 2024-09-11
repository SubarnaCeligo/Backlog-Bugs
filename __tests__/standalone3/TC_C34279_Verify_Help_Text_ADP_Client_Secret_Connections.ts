import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34279_Verify_Help_Text_ADP_Client_Secret_Connections", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1900 @Env-All TC_C34279_Verify_Help_Text_ADP_Client_Secret_Connections", async ({io,page}, testInfo) => {
    //create connection
    test.step("*** Navigate to Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Adding new connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Selecting ADP as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ADP_CONNECTION);
    await io.homePage.loadingTime()
    await io.homePage.click( selectors.flowBuilderPagePO.FULFILLMENTCLIENTSECRETHELPTEXT);
    await io.homePage.loadingTime()
    var hlptxt = await io.homePage.getText(selectors.connectionsPagePO.CONNHELPTEXT)
    await io.assert.expectToContainValue("Generate a CSR file and send it to your ADP representative to receive the client ID and Client secret to enter for your connection.Multiple layers of protection are in place, including AES 256 encryption, to keep your connection’s secret safe. When editing this form later, you must enter this value again; it is stored only when the connection is saved and never displayed as text",String(hlptxt), "");
    test.step("*** Verified Client Secret Help text ***", async ()=>{});
  });
});
