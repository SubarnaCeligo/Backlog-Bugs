
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108193", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24172 @Env-All TC_C108194 Verify User able to create connection using Token Auth type", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C108193"
    );
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.HTTP_BASE_URI,
      " https://pricemole.io"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "token")
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      "123456"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.LOCATION
    );
    await io.homePage.selectTextfromDropDown(page, "header")
    await io.homePage.click(
      selectors.connectionsPagePO.AUTH_SCHEME
    );
    await io.homePage.selectTextfromDropDown(page, "Bearer")
    await io.homePage.click(
      selectors.flowBuilderPagePO.CONFIGURE_REFRESH_TOKEN
    );
    await io.homePage.click(
      selectors.basePagePO.CONFIGURETOKENAUTH
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.REFRESH_TOKEN,
      "123456"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.REFRESH_HTTP_METHOD
    );
    await io.homePage.selectTextfromDropDown(page, "POST")
    await io.homePage.fill(
      selectors.flowBuilderPagePO.REFRETOKRELURL,
      "/users/sign_in.json"
    );
    await io.homePage.findElementByDataTest("header");
    await page.locator(
      selectors.flowBuilderPagePO.PATH_TO_TOKEN
      + " " + selectors.flowBranchingPO.INPUT
    ).first().fill(
      "{{{responseHeaders.authorization}}}"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.HOW_TO_TESTCONNECTION
    );
    await io.homePage.click(
      selectors.connectionsPagePO.PING_METHOD
    );
    await io.homePage.selectTextfromDropDown(page, "GET")
    await io.homePage.fill(
      selectors.flowBuilderPagePO.RELATIVEURIFIELD,
      "/api/products.json"
    );
    await io.homePage.click(
      selectors.basePagePO.TEST_CONNECTION
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified User should able to create connection  ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24171 @Env-All TC_C108193 Verify User able to create connection using Custom Auth type ", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C108194"
    );
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.HTTP_BASE_URI,
      " https://pricemole.io"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "custom")
    await io.homePage.click(
      selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
     selectors.connectionsPagePO.REFRESH_TOKEN,
      "123456"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.REFRESH_HTTP_METHOD
    );
    await io.homePage.selectTextfromDropDown(page, "POST")
    await io.homePage.fill(
      selectors.flowBuilderPagePO.REFRETOKRELURL,
      "/users/sign_in.json"
    );
    await io.homePage.findElementByDataTest("header");
    await page.locator(
      selectors.flowBuilderPagePO.PATH_TO_TOKEN
      + " " + selectors.flowBranchingPO.INPUT
    ).first().fill(
      "{{{responseHeaders.authorization}}}"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.HOW_TO_TESTCONNECTION
    );
    await io.homePage.click(
      selectors.connectionsPagePO.PING_METHOD
    );
    await io.homePage.selectTextfromDropDown(page, "GET")
    await io.homePage.fill(
      selectors.flowBuilderPagePO.RELATIVEURIFIELD,
      "/api/products.json"
    );
    await io.homePage.click(
      selectors.basePagePO.TEST_CONNECTION
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified User should able to create connection  ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
