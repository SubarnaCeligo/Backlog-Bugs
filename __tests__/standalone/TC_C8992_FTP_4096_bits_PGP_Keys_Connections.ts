
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C8992_FTP_4096_bits_PGP_Keys_Connections.json";
test.describe("TC_C8992_FTP_4096_bits_PGP_Keys_Connections", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await io.connections.deleteConnection( FTP.expectedJSON.name);
  });
  test("@Env-All @Zephyr-IO-T11427 TC_C8992_FTP_4096_bits_PGP_Keys_Connections", async ({io,page}, testInfo) => {
    //*Create Connection
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, FTP.expectedJSON.name);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HOSTNAME, FTP.expectedJSON.hostURI);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME, FTP.expectedJSON.username);
    await io.homePage.fillWebPage(selectors.connectionsPagePO.FTP_PASSWORD, FTP.expectedJSON.password);
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.FTPPORT);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FTPPORT, FTP.expectedJSON.port);
    await io.homePage.click(selectors.flowBuilderPagePO.USE_PGP);
    await io.homePage.enterHugeData(selectors.flowBuilderPagePO.FTPPUBLICHKEY, FTP.expectedJSON.pgp.publicKey);
    await io.homePage.enterHugeData(selectors.flowBuilderPagePO.FTPPRIVATEKEY, FTP.expectedJSON.pgp.privateKey);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FTPPASSPHASE, FTP.expectedJSON.pgp.passPhrase);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var expec = await io.homePage.isVisible(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.assert.expectToBeTrue(expec, "");
  });
});
