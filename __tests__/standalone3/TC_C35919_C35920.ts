import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Creating http connection with some conditions", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9875 @Zephyr-IO-T9876 @Env-All TC_C35919_TC_C35920_http_connection", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Navigating to the connection page ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on add new connection and selecting adaptor as HTTP ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C35919_C35920_Slack_HTTP_Connection");
    test.step("*** Giving name to the connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASE_URL, "https://slack.com/api");
    
    test.step("*** Writing base url ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.MEDIA_TYPE, "urlencoded");
    
    test.step("*** Selecting the media type as URL Encoded ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE, "token");
    
    test.step("*** Selecting authorization as Token ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.TOKENVALUE, process.env["SLACK_TOKEN"]);
    
    test.step("*** Providind  Token Value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.LOCATION, "header");
    
    test.step("*** Selecting HTTP Header method to send token ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTH_SCHEME, "Bearer");
    
    test.step("*** Selecting Bearer as token schema ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HOWTOTESTCONN);
    
    test.step("*** Clicking on How to test Connection ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SUCCESSPATH, "     Ok");
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SUCCESSVALUE, "TrUE   ");
    
    test.step("*** Providing SuccessPath and Success Values ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    await io.homePage.loadingTime()
    var text = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICATION_ID, "Your connection is working great! Nice Job!");
    
    await io.assert.expectToBeTrue(text, "");
    test.step("*** Verifying that the connection is successful or not ***", async ()=>{});
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.SUCCESSPATH);
    
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.SUCCESSVALUE);
    
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    
    await io.homePage.loadingTime();
    test.step("*** Clearing SuccessPath and Success Value ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FAILPATH, "o k");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FAILVALUE, "FALse   ");
    test.step("*** Providing Va;ues for fail Path and fail values ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    var txt = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICATION_ID, "Your connection is working great! Nice Job!");
    await io.assert.expectToBeTrue(txt, "");
    test.step("*** Verifying that the connection is successful or not ***", async ()=>{});
    
    test.step("*** Close the windows ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    
  });
});
