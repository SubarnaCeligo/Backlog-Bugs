
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C25180_S3_Verify_Help_Text_PGP_Cryptographic_Connections", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1872 TC_C25180_S3_Verify_Help_Text_PGP_Cryptographic_Connections", async ({io,page}, testInfo) => {
    //create connection
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Adding new connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();

    test.step("*** Selecting Amazon S3 as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.AMAZONS3);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Advance option ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** Clicking on Enable PGP Cryptographic ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.USE_PGP);

    await io.homePage.click(selectors.flowBuilderPagePO.PGP_PUBLIC_KEY);
    test.step("*** Click on pgp_public_key help text***", async ()=>{});

    var pgppublickeyhelptext =
      "Enter the public key to use for encryption and verifying signatures";
    var verifytext1 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( pgppublickeyhelptext, String(verifytext1), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    test.step("*** Verified pgp_public_key Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.PGP_PRIVATE_KEY);
    test.step("*** Click on pgp_private_key help text***", async ()=>{});

    var pgpprivatekeyhelptext =
      "Enter the private key to use for decryption and signing files";
    var verifytext2 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( pgpprivatekeyhelptext, String(verifytext2), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified pgp_private_key Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.PRIVATEKEY_PASSPHRASE);
    test.step("*** Click on privatekey_passphrase help text***", async ()=>{});

    var privatekeypassphrasehelptext = "Enter the private key’s passphrase";
    var verifytext3 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( privatekeypassphrasehelptext, String(verifytext3), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified privatekey_passphrase Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COMPRESSIONALGORITHM);
    test.step("*** Click on compressionAlgorithm help text***", async ()=>{});

    var compressionAlgorithmhelptext =
      "Select an algorithm to use to compress files during encryption and decompress files during decryption. If this field is empty, files are left uncompressed.";
    var verifytext4 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( compressionAlgorithmhelptext, String(verifytext4), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified compressionAlgorithm Help text***", async ()=>{});

    await io.homePage.click(`[id="pgp.asciiArmored"] ${selectors.flowBuilderPagePO.HELP_TEXT_ICON}`);
    test.step("*** Click on asciiArmored help text***", async ()=>{});

    var asciiArmoredhelptext =
      'In an Export step, this setting indicates the incoming file format for parsing. In an Import step, it dictates the output format of the encrypted file. Select “Yes” for text (ASCII-armored) format. Select "No" for binary format.';

    var verifytext5 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await io.assert.expectToContainValue( asciiArmoredhelptext, String(verifytext5), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Verified asciiArmored Help text***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
