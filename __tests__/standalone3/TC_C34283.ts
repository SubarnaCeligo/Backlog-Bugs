import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C34283", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1904 @Env-All TC_C34283", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ADP_CONNECTION);
    test.step("*** clicked onADP Workforce Now adaptor ***", async ()=>{});
    await io.homePage.loadingTime();

    //Name:
    await io.homePage.click(selectors.flowBuilderPagePO.NAMEGDRIVE);
    test.step("*** Clicking on ? ***", async ()=>{});
    var name = await io.homePage.getText(selectors.connectionsPagePO.CONNHELPTEXT)
    await io.assert.expectToContainValue("Enter a unique name for your connection so that you can easily reference it from other parts of the application.",String(name), "");
    test.step("*** verified Help Text For Name ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);
    
    //Account type:
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNTTYPE);
    test.step("*** Clicking on ? ***", async ()=>{});
    var type = await io.homePage.getText(selectors.connectionsPagePO.CONNHELPTEXT)
    await io.assert.expectToContainValue( "Select Production if your API endpoint starts with https://api.adp.com. Select UAT if it starts with https://uat-api.adp.com.",String(type), "");
    test.step("*** verified Help Text For Account Type ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    //Client ID:
    await io.homePage.click(selectors.flowBuilderPagePO.CLIENTID);
    test.step("*** Clicking on ? ***", async ()=>{});
    var id = await io.homePage.getText(selectors.connectionsPagePO.CONNHELPTEXT)
    await io.assert.expectToContainValue( "Generate a CSR file and send it to your ADP representative to receive the Client ID and client secret to enter for your connection.", String(id), "");
    test.step("*** verified Help Text For Client ID ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    //SSL certificate:
    await io.homePage.click(selectors.flowBuilderPagePO.SSLCERT);
    test.step("*** Clicking on ? ***", async ()=>{});
    var ssl = await io.homePage.getText(selectors.connectionsPagePO.CONNHELPTEXT)
    await io.assert.expectToContainValue( "Select a certificate in PEM format.",String(ssl), "");
    test.step("*** verified Help Text For SSL certificate ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    //Client secret
    await io.homePage.click(selectors.flowBuilderPagePO.CLIENTSECRET);
    test.step("*** Clicking on ? ***", async ()=>{});
    var sec = await io.homePage.getText(selectors.connectionsPagePO.CONNHELPTEXT)
    var nameText = await JSON.stringify(sec);
    await io.assert.expectToContainValue( "Generate a CSR file and send it to your ADP representative to receive the client ID and Client secret to enter for your connection.Multiple layers of protection are in place, including AES 256 encryption, to keep your connection’s secret safe. When editing this form later, you must enter this value again; it is stored only when the connection is saved and never displayed as text.",nameText, "");
    test.step("*** verified Help Text For Client secret ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    //SSL client key
    await io.homePage.click(selectors.flowBuilderPagePO.CLIENTKEY);
    test.step("*** Clicking on ? ***", async ()=>{});
    var key = await io.homePage.getText(selectors.connectionsPagePO.CONNHELPTEXT)
    await io.assert.expectToContainValue( "Select a .KEY private key file.", String(key),"");
    test.step("*** verified Help Text For SSL client key ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    //SSL passphrase
    await io.homePage.click("[id='http.encrypted.passphrase'] .MuiIconButton-root");
    test.step("*** Clicking on ? ***", async ()=>{});
    var pass = await io.homePage.getText(selectors.connectionsPagePO.CONNHELPTEXT)
    await io.assert.expectToContainValue( "Select Production if your API endpoint starts with https://api.adp.com. Select UAT if it starts with https://uat-api.adp.com.",String(pass), "");
    test.step("*** verified Help Text For SSL passphrase ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBTN);

    test.step("*** Clickng on close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
