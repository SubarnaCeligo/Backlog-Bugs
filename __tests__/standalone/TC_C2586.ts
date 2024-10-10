
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2586", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1848 TC_C2586", async ({io,page}, testInfo) => {
    //create connection
    test.step("*** Navigate to Connections ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "AS2_DND");
    await io.homePage.clickByTextByIndex("AS2_DND", 0);
    await io.homePage.loadingTime();

    test.step("*** Clicking on name help icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NAME_HELPERTEXT);

    const namehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(namehelptext)).toContain("Enter a unique name for your connection so that you can easily reference it from other parts of the application.");
    test.step("*** Verified name Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AS2MODE_HELPERTEXT);
    test.step("*** Click on AS2 mode help text***", async ()=>{});

    const as2modehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(as2modehelptext)).toContain("Choose AS2 via HTTP or HTTPS for this connection.");
    test.step("*** Verified as2mode Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AS2IDENTIFIER_HELPERTEXT);
    test.step("*** Click on AS2 identifier help text***", async ()=>{});

    const as2identifierhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(as2identifierhelptext)).toContain("This is the AS2 Identifier your trading partners will use as the \"To\" identifier when sending you documents, and the identifier integrator.io will use as the \"From\" identifier when you send documents to your trading partners. This field must be unique across all integrator.io users to ensure that inbound documents from your trading partners are routed to the correct integration flows. In addition, you should use a different identifier for production vs. sandbox.");
    test.step("*** Verified as2 identifier Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AS2MDNSIGNING_HELPERTEXT);
    test.step("*** Click on MDN signing help text***", async ()=>{});

    const mdnsiginghelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(mdnsiginghelptext)).toContain("This field describes what signing algorithm, if any, integrator.io will use when sending back MDNs to your trading partner.");
    test.step("*** Verified mdn sigining Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AS2DECRYPTIONALG_HELPERTEXT);
    test.step("*** Click on as2decryptionalg help text***", async ()=>{});

    const as2decryptionalghelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(as2decryptionalghelptext)).toContain("This is the algorithm we use while decrypting the message (this information is present in the MIME Message itself). So it is nothing more that verification of same.");

    await io.homePage.click(selectors.flowBuilderPagePO.AS2MDNENCODING_HELPERTEXT);
    test.step("*** Click on as2mdnencoding help text***", async ()=>{});

    const as2mdnencodinghelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(as2mdnencodinghelptext)).toContain("You can tell integrator.io which character encoding to use when we send an MDN back to your trading partner. You can choose between base64 or binary. Base64 will be the default.");
    test.step("*** Verified as2mdnencoding Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AS2PUBLICCERT_HELPERTEXT);
    test.step("*** Click on as2publiccert help text***", async ()=>{});

    const as2publiccerthelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(as2publiccerthelptext)).toContain("This is the key that you should share with your trading partner that they will use to encrypt EDI messages.");
    test.step("*** Verified as2publiccert Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AS2PRIVATEKEY_HELPERTEXT);
    test.step("*** Click on as2privatekey help text***", async ()=>{});

    const as2privatekeyhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(as2privatekeyhelptext)).toContain("This is the key that integrator.io will use to decrypt incoming messages from the trading partner, who should be using the above public key to encrypt messages. The private key is sensitive and should be guarded carefully just like any other credential.");
    test.step("*** Verified as2privatekey Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AS2PARTNERSCERT_HELPERTEXT);
    test.step
    
    const as2partnerscerthelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(as2partnerscerthelptext)).toContain("This has the partner certificate information required to encrypt the message to be sent to partner or verify the signature on receiving part.");
    test.step("*** Verified as2partnerscert Help text***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.AS2AUTHTYPE_HELPERTEXT);
    test.step("*** Click on as2authtype help text***", async ()=>{});

    const as2authtypehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(as2authtypehelptext)).toContain("The as2 adaptors currently support 2 types of authentication. Choose 'basic' authentication if your service implements the HTTP basic auth strategy. This auth method adds a base64 encoded username/password pair value in the 'authentication' HTTP request header.  Choose 'token' if your service relies on token-based authentication. The token may exist in the header, url or body of the http request. This method also supports refreshing tokens if supported by the service being called.");
    test.step("*** Verified as2authtype Help text***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
