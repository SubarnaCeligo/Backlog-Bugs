
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2819", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("@Env-All @Zephyr-IO-T11422 TC_C2819", async ({io,page}, testInfo) => {
    //create connection
    test.step("*** Navigate to Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    await io.homePage.loadingTime();
    test.step("*** clicked on connection button", async ()=>{});

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** Adding new connection ***", async ()=>{});

    test.step("*** Selecting FTP as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    test.step("*** Selecting PGP encryption ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.USE_PGP);

    test.step("*** Validating the FTP public key ***", async ()=>{});
    var publicKey = await io.homePage.isVisible(selectors.flowBuilderPagePO.FTPPUBLICHKEY);
    await io.assert.expectToBeTrue(publicKey, "");

    test.step("*** Validating the FTP private key ***", async ()=>{});
    var privateKey = await io.homePage.isVisible(selectors.flowBuilderPagePO.FTPPRIVATEKEY);
    await io.assert.expectToBeTrue(privateKey, "");

    test.step("*** Validating the FTP pass phrase key ***", async ()=>{});
    var passphrase = await io.homePage.isVisible(selectors.flowBuilderPagePO.FTPPASSPHASE);
    await io.assert.expectToBeTrue(passphrase, "");

    test.step("*** Validating the FTP compress algorithm key ***", async ()=>{});
    var compressionAlgorithm = await io.homePage.isVisible(selectors.flowBuilderPagePO.FTPALGORITHM);
    await io.assert.expectToBeTrue(compressionAlgorithm, "");
  });
});
