import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Creating slack connection with some conditions", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9872 @Env-All TC_C35916", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Clicking on add new connection and selecting adaptor as HTTP ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Slack_celigo-labs");
    test.step("*** Giving name to the connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASE_URL, "https://slack.com/api");
    test.step("*** Writing base url ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.MEDIA_TYPE, "urlencoded");
    test.step("*** Selecting the media type as URL Encoded ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE, "token");
    test.step("*** Selecting authorization as Token ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.TOKENVALUE, "ghyrsyriujcdfiu");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.LOCATION, "body");

    test.step("*** Doing Token connection setup ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTPMETHOD);
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RELATIVEURI, "api.get");
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FAILPATHHTTP, "ok");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FAILVALUEHTTP, "false");
    test.step("*** Giving fail path and fail values ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.POPUPCONNECTION)
    var txt = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.POPUPCONNECTION, '{\n  "ok": false,\n  "error": "unknown_method",\n  "req_method": "api.get"\n}');
    await io.assert.expectToBeTrue(txt, "");
    test.step("*** Verifying the error ***", async ()=>{});
  });
});
