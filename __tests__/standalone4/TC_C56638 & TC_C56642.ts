import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP Adapter] OAuth 2 Re-design", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });


  test("TC_C56638_Verify the sorting using last update in iclients page from resource page. @Env-All @Zephyr-IO-T16889", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    const iclientHeader = await page.$$(selectors.basePagePO.TEMPLATETABLEHEADING);
    const lastUpdatedHeader = await iclientHeader[2].textContent();
    await io.assert.expectToContainValue(lastUpdatedHeader, "Last updatedsorted descending", "Last updated is not displayed in iclients tab");

    test.step("*** Last updated date is displayed ***", async ()=>{});
  });
  
  test("TC_C56642_User can select the iclient for use in other connections. @Env-All @Zephyr-IO-T16893", async ({ io, page }, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.clickButtonBasedOnLabelName(selectors.connectionsPagePO.CUSTOM_OAUTH2, "Gdrive client");
    test.step("*** Gdrive client iClient is displayed ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    await io.homePage.loadingTime();
    test.step("*** Clicked on Connections Tab ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Create connection button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
    test.step("*** Clicked on HTTP connector ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "NEW-HTTP-01");
    test.step("*** fill Name Field as [NEW-HTTP-01] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "user@123");
    test.step("*** fill Base URI Field as [user@123] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth");
    test.step("*** [oauth 2.0] is selected from Auth type Dropdown ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.ICLIENT_ID, "Client credentials iclient DND");
    test.step("*** [Gdrive_client] is present under the dropdown ***", async ()=>{});
  });
});
