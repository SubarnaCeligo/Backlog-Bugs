
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103892", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24739 @Env-All TC_C103892 Verify user able to create iClient through Resource iClient", async ({io,page}, testInfo) => {
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
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C103892 ICLIENT"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha256")
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.JWT_PRIVATE_KEY,
      "test"
    );
    test.step("*** entered the Private Key ***", async ()=>{});
    await io.homePage.fill(
      selectors.connectionsPagePO.ACCESS_TOKEN_URL,
      "test"
    );
    await io.homePage.click(
      selectors.basePagePO.CONFIGUREOAUTH
    );
    await io.homePage.click(
      selectors.connectionsPagePO.ACCESS_TOKEN
    );
    await io.homePage.selectTextfromDropDown(page, "header")
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH_SCHEMES
    );
    await io.homePage.selectTextfromDropDown(page, "Bearer")
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C103892 ICLIENT"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified User should able to create iClient ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24740 @Env-All TC_C103893 Verify user able to give all the secret key, payload, header values", async ({io,page}, testInfo) => {
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
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.JWT_PRIVATE_KEY,
      "test"
    );
    test.step("*** entered the Private Key ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.PAYLOAD_JWT,
      "test"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.JWT_HEADERS_FIELD,
      '{"alg":"RS256"}'
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified User should able to see Help text for Private key ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24741 @Env-All TC_C103894 Verify User not able to see Client Id & Client Secret & Valid domain name fields", async ({io,page}, testInfo) => {
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
    const clientid = await page.locator(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID
    );
    expect(clientid).toBeHidden();
    const clientsecret = await page.locator(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET
    );
    expect(clientsecret).toBeHidden();
    const valid = await await page.locator(
      selectors.basePagePO.VALIDDOMAIN
    );
    expect(valid).toBeHidden();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified User should not be able to see those fields ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24742 @Env-All TC_C103895 Verify the payload and Header field values", async ({io,page}, testInfo) => {
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
    await io.homePage.loadingTime();
    const payload = await page.locator(
      selectors.connectionsPagePO.PAYLOAD_JWT
    ).nth(1);
    expect(await payload.textContent()).toContain('{"exp":"expiration-as-integer","sub":"{sub}","iss":"{iss}","aud":"{aud}"}');
    const headers = await page.locator(
      selectors.connectionsPagePO.JWT_HEADERS_FIELD
    ).nth(1);
    expect(await headers.textContent()).toContain('{"typ":"JWT","alg":"HS256"}');
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified User should able to see payload and Header values ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24743 @Env-All TC_C103896 Verify the Use JWT field when we select other Grant type other than Client credentials", async ({io,page}, testInfo) => {
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
    await io.homePage.selectTextfromDropDown(page, "authorizecode")
    const jwtCheckbox = await page.locator(
      selectors.connectionsPagePO.JWTENABLE
    );
    expect(jwtCheckbox).toBeVisible();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "authorizecodewithpkce")
    expect(jwtCheckbox).toBeHidden();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "password")
    expect(jwtCheckbox).toBeHidden();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified Use JWT field should not shown for these 2 Grant type fields  ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to home page ***", async ()=>{});
  });
});
