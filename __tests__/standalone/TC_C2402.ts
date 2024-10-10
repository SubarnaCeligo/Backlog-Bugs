
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2402_HTTP_Connection.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Env-All @Zephyr-IO-T4386 TC_C2402_HTTP_Connection", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});
    
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    test.step("*** clicked on HTTP adaptor ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP_Connection");
    test.step("*** Naming the HTTP  Connection  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://api.trinet.com/");
    test.step("*** Renaming the Base URL  name  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking Auth type dropdown   ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.MANUAL);
    test.step("*** Selecting the token as auth type    ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.TOKENVALUE, "jjglzFPL9VHXFGputIVMcGD02ZOOq0Vo");
    test.step("*** Renaming Token name  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.LOCATION);
    test.step("*** Clicking send Token Via  dropdown   ***", async ()=>{});
    await io.homePage.click("[data-value='header']");
    test.step("*** Selecting  The HTTP Header     ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.AUTH_SCHEME);
    test.step("*** Clicking On Header Scheme    ***", async ()=>{});
    await io.homePage.click("[data-value='Custom']");
    test.step("*** Selecting the Custom As header scheme ***", async ()=>{});
    var res = await io.homePage.getTextFromElement("[id='mui-component-select-/http/auth/token/scheme']", "Custom");
    await io.assert.expectToBeTrue(res, "");
    test.step("*** Verifying the Custom Field is selected or not  ***", async ()=>{});
    await io.homePage.fillWebPage("[data-test='http.customAuthScheme']", "apikey");
    test.step("*** Renaming the Custom auth scheme  ***", async ()=>{});
    var resk = await io.homePage.isVisible("[for='http.customAuthScheme']");
    await io.assert.expectToBeTrue(resk, "");
    test.step("*** Verifying the Custom auth scheme is present or not  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    
    var resultEl = await page.getByText("Your connection is working great! Nice Job!");
    resultEl.waitFor({ state: 'visible', timeout: 10000 });
    await expect(resultEl).toBeVisible();
    test.step("*** Validation of Connection is succesfull or not   ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close   ***", async ()=>{});
    
    var car = await page.$$(selectors.integrationPagePO.OPENACTIONSMENU);
    car[0].click()
    test.step("*** Clicking on  Action menu     ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    test.step("*** Deleting the Connection  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DELETE);
    test.step("*** Confirm delete ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
