
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103840", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24718 @Env-All TC_C103840 Verify the fields when user select HMAC signature method", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.THREEPL_CONNECTION
    );
    test.step("*** Selected 3PL Central as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
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
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified User should able to see all fields related to HMAC signature method ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24719 @Env-All TC_C103841 Verify the signature field and dropdown values", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.THREEPL_CONNECTION
    );
    test.step("*** Selected 3PL Central as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    const defaultSignature = await io.homePage.getText(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    expect(defaultSignature).toContain("Please select");
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
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified User should able to see signature field and dropdown values ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24720 @Env-All TC_C103842 Verify user able see JWT field in HTTP 2.0 framework", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.THREEPL_CONNECTION
    );
    test.step("*** Selected 3PL Central as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    const checkbox = await page.locator(
      selectors.connectionsPagePO.JWTENABLE
    );
    expect(checkbox).toBeVisible();
    const checkboxState = await checkbox.getAttribute("data-state");
    if (checkboxState) {
      expect(checkboxState).toContain("unchecked");
      await checkbox.click();
      expect(await checkbox.getAttribute("data-state")).toContain("checked");
    } else {
      const checkboxInput = await page.locator(
        selectors.connectionsPagePO.ENABLEJWT
      );
      expect(await checkboxInput.inputValue()).toBe("false");
      await checkbox.click();
      expect(await checkboxInput.inputValue()).toBe("true");
    }
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified User should able to see Use JWT field ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24721 @Env-All TC_C103843 Verify the fields when user select RS/PS/ES signature method Verify the fields when user select RS/PS/ES signature method", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.THREEPL_CONNECTION
    );
    test.step("*** Selected 3PL Central as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "es256");
    const privateKey = await page.locator(
      selectors.connectionsPagePO.JWT_PRIVATE_KEY
    );
    expect(privateKey).toBeVisible();
    const privateKeyLabel = await io.homePage.getText(
      selectors.connectionsPagePO.JWT_PRIVATE_KEY + " label"
    );
    expect(privateKeyLabel).toContain('*');
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
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "ps256")
    expect(privateKey).toBeVisible();
    expect(payload.first()).toBeVisible();
    expect(headers.first()).toBeVisible();
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha256")
    expect(privateKey).toBeVisible();
    expect(payload.first()).toBeVisible();
    expect(headers.first()).toBeVisible();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified User should able to see fields related to RS/PS/ES signature method ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24722 @Env-All TC_C103844 Verify user able to create iclient through connection", async ({io,page}, testInfo) => {
    const iClientName = "TC_C103844 Zoom iClient";
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Zoom")).click();
    test.step("*** Selected Okta as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "oauth")
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    await page.locator(selectors.basePagePO.NAME).nth(1).fill(iClientName);
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
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RESOURCES
    );
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENTSTAB
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      iClientName
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
      "*** Verified User should able to create ilcient ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
