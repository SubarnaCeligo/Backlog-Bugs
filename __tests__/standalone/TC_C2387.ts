
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2387_mysql_connection_type", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4385 TC_C2387_mysql_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.MYSQL);
    await io.homePage.loadingTime();
    test.step("*** clicked on mysql adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "mysql_Connection");
    test.step("*** Naming the mysql Connection  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HOST, "localhost");
    test.step("*** Renaming the Host name  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.DATABASENAME, "mysqldev");
    test.step("*** Renaming the Database  name  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_RDBMS, "ao0BbjI9R3mMEX7");
    test.step("*** Renaming the Username   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.RDBMS_PASSWORD, "dq8JmmzVzceLTDr68xQ2");
    test.step("*** Renaming the Password    ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});

    const testStatusEl = await page.getByText("Your test was not successful. Check your information and try again");
    await testStatusEl.waitFor({ state: 'visible', timeout: 10000 });
    await expect(testStatusEl).toBeVisible();
    test.step("*** Validation of Connection is not succesfull and verifying the error  ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.HOME);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
