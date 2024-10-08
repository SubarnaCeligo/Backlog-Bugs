
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C99586", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T25614 @Env-All TC_C99586 Verify the code challenge method dropdown values", async ({io,page}, testInfo) => {
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
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD_FIELD
    );
    const options1 = await io.homePage.getText(selectors.myAccountPagePO.SELECTTYPE);
    expect(options1).toContain("SHA-256");
    expect(options1).toContain("Plain");
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "SHA-256"
    );
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
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "authorizecodewithpkce")
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD_FIELD
    );
    const options2 = await io.homePage.getText(selectors.myAccountPagePO.SELECTTYPE);
    expect(options2).toContain("SHA-256");
    expect(options2).toContain("Plain");
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "SHA-256"
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified Code challenge method dropdown values in iclient pages  ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T25615 @Env-All TC_C99587 Verify default value is SHA-256 in code challenge method field", async ({io,page}, testInfo) => {
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
    const codeChallengeMethod1 = await io.homePage.getText(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD_FIELD
    );
    expect(codeChallengeMethod1).toContain("SHA-256");
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
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "authorizecodewithpkce")
    const codeChallengeMethod2 = await io.homePage.getText(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD_FIELD
    );
    expect(codeChallengeMethod2).toContain("SHA-256");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified Default value should be  SHA-256 in code challenge method ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T25616 @Env-All TC_C99588 Verify Help text for Code challenge method field", async ({io,page}, testInfo) => {
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
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD
      + " " + selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );
    const helpText1 = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    expect(helpText1).toContain("Algorithm used for generating code challenge.");
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
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "authorizecodewithpkce")
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_PKCE_CODE_CHALLENGE_METHOD
      + " " + selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );
    const helpText2 = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    expect(helpText2).toContain("Algorithm used for generating code challenge.");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await test.step(
      "*** Verified Code challenge method Help text in  iclient pages  ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
