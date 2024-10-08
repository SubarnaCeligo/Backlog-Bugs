
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C99584", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T25612 @Env-All TC_C99584 Verify PKCE for OAuth 2.0 Authorization", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
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
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    const pkce1 = await page.locator(
      selectors.connectionsPagePO.AUTHORIZE_CODE_WITH_PKCE
    );
    expect(pkce1).toBeVisible();
    await pkce1.click();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the iClients option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.ICLIENTS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    const pkce2 = await page.locator(
      selectors.connectionsPagePO.AUTHORIZE_CODE_WITH_PKCE
    );
    expect(pkce2).toBeVisible();
    await pkce2.click();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified PKCE field is added iclient pages ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T25613 @Env-All TC_C99585 Verify Code challenge method is added", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
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
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "authorizecodewithpkce")
    const codeChallengeMethod1 = await page.locator(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD_LABEL
    );
    expect(codeChallengeMethod1).toBeVisible();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the iClients option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.ICLIENTS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "authorizecodewithpkce")
    const codeChallengeMethod = await page.locator(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD_LABEL
    );
    expect(codeChallengeMethod).toBeVisible();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified Code challenge method field is added in iclient page ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
