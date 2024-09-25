
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_20084_Iclient_Sandbox", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4417 TC_20084_Iclient_Sandbox", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.SANDBOX_WDIO);
    test.step("*** clicked on Sandbox in Homepage ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.basePagePO.INPUT_NAME_SELECTOR, "Sandbox Iclient");
    await io.homePage.loadingTime();
    test.step("*** Name the Iclient ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE, 'clientcredentials');
    await io.homePage.loadingTime();


    await io.homePage.fillWebPage(selectors.connectionsPagePO.OAUTH2_CLIENT_ID_INPUT, "91338c8d-b533-487d-ac2c-3dbb04a556db");
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.OAUTHCLIENTSECRET, decrypt("NS1fSXY0ZWoyNS5GZi1BT0tIVTVtMFJ4X3d4LWJ5ZWkxcA==")
    );
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.ACCESS_TOKEN_URL, 'https://testurl.domain1.com');
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.basePagePO.VALIDDOMAIN, 'https://testurl.domain1.com');
    await io.homePage.loadingTime();
    
    await io.homePage.fillWebPage(selectors.connectionsPagePO.ACCESS_TOKEN, 'body');
    await io.homePage.loadingTime();

    test.step("*** Entered the ClientId, Domain and ClientSecret ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Iclient Saved ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await expect(page.getByText('Sandbox Iclient').first()).toBeVisible();
    test.step("*** Verified The iclient created in sandbox should be shown in the sandbox itself   ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
    test.step("*** clicked on Production in Homepage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
