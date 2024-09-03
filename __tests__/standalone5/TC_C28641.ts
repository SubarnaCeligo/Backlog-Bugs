import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Creating http connection with some conditions", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T7466 TC_C28641", async ({ io, page }, testInfo) => {
    await io.homePage.goToMenu('Resources', 'Connections');
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on add new connection and selecting adaptor as HTTP ***", async () => { });
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "invalidHandlebars");
    test.step("*** Giving name to the connection ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASE_URL, "https://celigoqa.zendesk.com");
    await io.homePage.loadingTime();
    test.step("*** Writing base url ***", async () => { });

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE, "basic");
    test.step("*** Selecting authorization as Basic ***", async () => { });

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASICUSERNAME, "mounica.manavapati@celigo.com");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.BASIC_PASSWORD, "Y2VsaWdvMTIzNA==");

    await io.homePage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPMETHOD, "GET");
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RELATIVEURI, "{{#connection}}");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    await io.homePage.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR);
    await io.assert.verifyElementTextByIndex(selectors.basePagePO.NOTIFICTION_BAR, `Failed to generate request url from template: https://celigoqa.zendesk.com/{{#connection}}. Details: Parse error on line 1:
....com/{{#connection}}
-----------------------^
Expecting 'COMMENT', 'CONTENT', 'OPEN_RAW_BLOCK', 'OPEN_BLOCK', 'OPEN_INVERSE', 'OPEN_INVERSE_CHAIN', 'INVERSE', 'OPEN_ENDBLOCK', 'OPEN', 'OPEN_UNESCAPED', 'OPEN_PARTIAL', 'OPEN_PARTIAL_BLOCK', got 'EOF'.`, 1);
  });
});
