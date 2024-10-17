
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103853", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24729 @Env-All TC_C103853 Verify the Help text of Use JWT field", async ({io,page}, testInfo) => {
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
    await io.homePage.click(
      selectors.connectionsPagePO.JWTENABLE
    );
    await io.homePage.click(
      selectors.connectionsPagePO.JWT_ENABLE_HELP
    );
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const helpText = await io.homePage.getText(
      selectors.flowBuilderPagePO.HELP_BUBBLE
    );
    await expect(helpText).toContain(
      "Use this field if OAuth authentication incorporates an additional JWT assertion as a component of the OAuth specification. Employ this path {{{iClient.jwt.token}}} to obtain the JWT Token, which is eventually utilized in the request body of the token URL to generate an access token."
    );
    await test.step(
      "*** Verified User should able to see Use JWT Help text ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24730 @Env-All TC_C103854 Verify the signature method field is showing", async ({io,page}, testInfo) => {
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
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    const signature = await page.locator(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    expect(signature).toBeVisible();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified Signature method field should shown test.afterEach when we check the Use JWT field ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24731 @Env-All TC_C103855 Verify the Help text of Signature method", async ({io,page}, testInfo) => {
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
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.JWT_SIGNATURE_HELP
    );
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const helpText = await io.homePage.getText(
      selectors.flowBuilderPagePO.HELP_BUBBLE
    );
    await expect(helpText).toContain(
      "Select the required method to sign the API call. For HMAC signature options, the secret key appears. For all other options, a private key is requiredES256ES384ES512HMAC-SHA256HMAC-SHA384HMAC-SHA512PS256PS384PS512RSA-SHA256RSA-SHA384RSA-SHA512"
    );
    await test.step(
      "*** Verified User should able to see Use Signature Method Help text ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24732 @Env-All TC_C103856 Verify the default value of Signature method", async ({io,page}, testInfo) => {
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
    await io.homePage.loadingTime();
    const jwtSignature = await io.homePage.getText(
      selectors.connectionsPagePO.JWTSIGNATURE,
    );
    expect(jwtSignature).toContain("Please select");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified User should able to see Please select dropdown should select by default ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24733 @Env-All TC_C103857 Verify the Dropdown values of Signature Method", async ({io,page}, testInfo) => {
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
    await io.homePage.selectTextfromDropDown(page, "es256")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "es384")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "es512")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "hmac-sha256")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "hmac-sha384")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "hmac-sha512")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "ps256")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "ps384")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "ps512")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha256")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha384")
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha512")
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** VerifiedUser should able to see all dropdowns of Signature method ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
