
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103886", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T24734 @Env-All TC_C103886 Verify the 3 fields when we select HAMAC signature method from Dropdown", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the iclient option ***", async ()=>{});
    await (
      await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "hmac-sha256")
    const secret = await page.locator(
      selectors.connectionsPagePO.JWT_SECRET_KEY
    );
    expect(secret).toBeVisible();
    const secretLabel = await io.homePage.getText(
      selectors.basePagePO.JWT_SECRET_LABEL
    );
    expect(secretLabel).toContain('*');
    const payload = await page.locator(
      selectors.connectionsPagePO.PAYLOAD_JWT
    );
    expect(payload.first()).toBeVisible();
    const payloadLabel = await io.homePage.getText(
      selectors.connectionsPagePO.JWT_PAYLOAD_LABEL
    );
    expect(payloadLabel).toContain('*');
    const headers = await page.locator(
      selectors.connectionsPagePO.JWT_HEADERS_FIELD
    );
    expect(headers.first()).toBeVisible();
    const headersLabel = await io.homePage.getText(
      selectors.connectionsPagePO.JWT_HEADERS_LABEL
    );
    expect(headersLabel).not.toContain('*');
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified 3 new fields should be added when we select and signature method ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24735 @Env-All TC_C103887 Verify the Help texts for 3 fields 1)Secret Key 2)Payload 3)Header", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the iclient option ***", async ()=>{});
    await (
      await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "hmac-sha256")
    await io.homePage.click(
      selectors.connectionsPagePO.JWT_SECRET_KEY
      + " " + selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const secretHelpText = await io.homePage.getText(
      selectors.connectionsPagePO.HELP_BUBBLE
    );
    await expect(secretHelpText).toContain(
      "Use this key as a secret password that generates the JWT signature"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
    await io.homePage.click(
      selectors.connectionsPagePO.PAYLOAD_JWT
      + " " + selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const payloadHelpText = await io.homePage.getText(
      selectors.connectionsPagePO.HELP_BUBBLE
    );
    await expect(payloadHelpText).toContain(
      "The JSON object contains the message sent to the application. This is used along with the secret key to ensure no alteration to the message along the way"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
    await io.homePage.click(
      selectors.connectionsPagePO.JWT_HEADERS_FIELD
      + " " + selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const headersHelpText = await io.homePage.getText(
      selectors.connectionsPagePO.HELP_BUBBLE
    );
    await expect(headersHelpText).toContain(
      'The JWT header is a JSON object that typically consists of two properties:alg (Algorithm): Specifies the algorithm used to sign the token. It can be HMAC SHA256, RSA SHA256, or others depending on the chosen cryptographic algorithm.typ (Type): Indicates the token type, typically set to "JWT" for JSON Web Tokens'
    );
    await io.homePage.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified User shouldd able to see Help texts for 3 fields ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24736 @Env-All TC_C103888 Verify Handle bars are working fine at Payload and Header", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the iclient option ***", async ()=>{});
    await (
      await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "hmac-sha256")
    await io.homePage.click(
      selectors.connectionsPagePO.JWT_PAYLOAD_HANDLEBAR
    );
    await io.homePage.loadingTime();
    const payload = await io.homePage.getText(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY
    );
    expect(payload).toContain(
      '{"exp":"expiration-as-integer","sub":"{sub}"'
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.connectionsPagePO.JWT_HEADERS_HANDLEBAR
    );
    await io.homePage.loadingTime();
    const headers = await io.homePage.getText(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY
    );
    expect(headers).toContain(
      '{"typ":"JWT","alg":"HS256"}'
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified Handlebars should work fine for Payload and Header ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24737 @Env-All TC_C103890 Verify the 3 fields when we select RS/PS/ES signature method from Dropdown", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the iclient option ***", async ()=>{});
    await (
      await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha256")
    const privateKey = await page.locator(
      selectors.connectionsPagePO.JWT_PRIVATE_KEY
    );
    expect(privateKey).toBeVisible();
    const payload = await page.locator(
      selectors.connectionsPagePO.PAYLOAD_JWT
    );
    expect(payload.first()).toBeVisible();
    const headers = await page.locator(
      selectors.connectionsPagePO.JWT_HEADERS_FIELD
    );
    expect(headers.first()).toBeVisible();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified User should able to see 3 fields after selecting RS/PS/ES signature methods ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24738 @Env-All TC_C103891 Verify the Help Text of Private Key", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the iclient option ***", async ()=>{});
    await (
      await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha256")
    await io.homePage.click(
      selectors.connectionsPagePO.JWT_PRIVATE_KEY
      + " " + selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );
    test.step("*** Clicking on the question mark ***", async ()=>{});
    var helpText = await io.homePage.getText(
      selectors.connectionsPagePO.HELP_BUBBLE
    );
    await expect(helpText).toContain(
      "Copy the private key from the portal you want to use to authenticate the connection. Before you add it to integrator.io, you must replace all newline characters (\\n) throughout the private key. The private key must be in PEM format. You can convert PFX certificates or convert from a PPK file." +
        "1. Paste the private key into a text editor." +
        "2. Find \\n." +
        "3. Delete the \\n characters and press Enter or Return. Repeat this for each instance of \\n." +
        "4. Ensure -----BEGIN PRIVATE KEY----- appears before the key, and -----END PRIVATE KEY----- appears after the key." +
        "5. Copy and paste the reformatted private key (including the begin and end declarations) into integrator.io."
    );
    await io.homePage.click(
      selectors.connectionsPagePO.HELPTEXT_CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified User should able to see Help text for Private key ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
