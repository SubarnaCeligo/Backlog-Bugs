
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2831", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1849 TC_C2831", async ({io,page}, testInfo) => {
    //create connection
    test.step("*** Navigate to Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Adding new connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();

    test.step("*** Selecting Amazon FTP as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    test.step("*** Clicking on Enable PGP Cryptographic ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.USE_PGP);

    await io.homePage.click(selectors.flowBuilderPagePO.PGP_PUBLIC_KEY);
    test.step("*** Click on pgp_public_key help text***", async ()=>{});

    const pgppublickeyhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(pgppublickeyhelptext)).toContain("Enter the public key to use for encryption and verifying signatures");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified pgp_public_key Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.PGP_PRIVATE_KEY);
    test.step("*** Click on pgp_private_key help text***", async ()=>{});

    const pgpprivatekeyhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(pgpprivatekeyhelptext)).toContain("Enter the private key to use for decryption and signing files");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified pgp_private_key Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.PRIVATEKEY_PASSPHRASE);
    test.step("*** Click on privatekey_passphrase help text***", async ()=>{});

    const privatekeypassphrasehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(privatekeypassphrasehelptext)).toContain("Enter the private key’s passphrase");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified privatekey_passphrase Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COMPRESSIONALGORITHM);
    test.step("*** Click on compressionAlgorithm help text***", async ()=>{});

    const compressionAlgorithmhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(compressionAlgorithmhelptext)).toContain("Select an algorithm to use to compress files during encryption and decompress files during decryption. If this field is empty, files are left uncompressed.");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified compressionAlgorithm Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ASCIIARMORED);
    test.step("*** Click on asciiArmored help text***", async ()=>{});

    const asciiArmoredhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(asciiArmoredhelptext)).toContain("In an Export step, this setting indicates the incoming file format for parsing. In an Import step, it dictates the output format of the encrypted file. Select “Yes” for text (ASCII-armored) format. Select \"No\" for binary format");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified asciiArmored Help text***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
