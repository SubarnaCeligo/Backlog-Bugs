
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import AS2 from "@testData/STANDALONE/TC_C14963_Verify_MDNSignature_Field_AS2_connection.json";

test.describe("TC_C14963_Verify_MDNSignature_Field_AS2_connection", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection( AS2);
  });
  test("@Env-All @Zephyr-IO-T4408 TC_C14963_Verify_MDNSignature_Field_AS2_connection", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connections in Homepage ***", async ()=>{});
    
    await io.homePage.loadingTime();

      await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.homePage.loadingTime();
      test.step("*** clicked on create connection ***", async ()=>{});

      await io.homePage.click(selectors.connectionsPagePO.AS2_CONNECTOR);
      await io.homePage.loadingTime();
      test.step("*** clicked on AS2 adaptor ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, AS2.importJSON.name);
      test.step("*** Name the AS2 connection ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.IDENTI, AS2.importJSON.as2.partnerId);
      test.step("*** entered the AS2 Identifier ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.MDNSIGNING, AS2.importJSON.as2.partnerStationInfo.mdn.mdnSigning);
      test.step("*** entered the MDN signing ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.MDNENCODING, AS2.importJSON.as2.userStationInfo.mdn.mdnEncoding);
      test.step("*** entered the MDN Encoding ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.DECRYPTALGO, AS2.importJSON.as2.userStationInfo.encryptionType);
      test.step("*** entered the Decrypt Algorithm ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNVERI, AS2.importJSON.as2.userStationInfo.mdn.mdnSigning);
      test.step("*** entered the Signature Verification ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.ENCOMEMESG, AS2.importJSON.as2.partnerStationInfo.encoding);
      test.step("*** entered the Incoming Message Encoding ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.PUBLICCERT, AS2.importJSON.as2.unencrypted.userPublicKey);
      test.step("*** entered the Public Certificate ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.PRIATEKEY, AS2.importJSON.as2.unencrypted.userPublicKey);
      test.step("*** entered the Private Key ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.PARTNERURL, AS2.importJSON.as2.partnerStationInfo.as2URI);
      test.step("*** entered the Partner AS2 URL ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.PARTID, AS2.importJSON.as2.partnerId);
      test.step("*** entered the AS2 Identifier ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.ENCRYPTTYPE, AS2.importJSON.as2.userStationInfo.encryptionType);
      test.step("*** Checking the MDN signature verification ***", async ()=>{});

      await io.homePage.click(selectors.connectionsPagePO.MDNSIGNATURE_CHECKBOX);
      test.step("*** verifying the MDN signature verification checked ***", async ()=>{});

      var data = await io.homePage.isVisible(selectors.connectionsPagePO.MDNVERIFYALGRITHM);
      await io.assert.expectToBeTrue(data, "");

      test.step("*** entered the Encryption Type ***", async ()=>{});
      await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNING, AS2.importJSON.as2.userStationInfo.mdn.mdnSigning);

      test.step("*** entered the Signing ***", async ()=>{});
      await io.homePage.fillWebPage(selectors.connectionsPagePO.PARTNERCERT, AS2.importJSON.as2.unencrypted.userPublicKey);
      test.step("*** entered the Partner Certificate ***", async ()=>{});

      await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTHTYPE, "none");
      test.step("*** entered the Auth Type ***", async ()=>{});

      test.step("*** Saving the connection ***", async ()=>{});
      await io.homePage.click(selectors.basePagePO.SAVE);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.basePagePO.CLOSE);
      
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, AS2.importJSON.name);
    await io.homePage.loadingTime();
    await io.homePage.clickByText(AS2.importJSON.name);
    await io.homePage.loadingTime();
    test.step("*** Editing the saved connection ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.MDNSIGNATURE_CHECKBOX);
    test.step("*** unchecking the MDN signature check box ***", async ()=>{});

    test.step("*** entered the Private Key ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.PRIATEKEY, AS2.importJSON.as2.unencrypted.userPublicKey);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, AS2.importJSON.name);
    await io.homePage.loadingTime();
    
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    test.step("*** deleting the pinned integration ***", async ()=>{});
    
    var resource = await io.homePage.isVisible(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.assert.expectToBeTrue(resource, "");
    test.step("*** Verifying connection saved successfully ***", async ()=>{});
  });
});
