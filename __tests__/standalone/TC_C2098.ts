
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2098_MSSQL_connection_type", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4384 TC_C2098_MSSQL_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
    await io.homePage.loadingTime();
    test.step("*** clicked on MSSQL adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "MSSQL_Connection");
    test.step("*** Naming the MSSQL Connection  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.VERSION);
    test.step("*** clicked on SQL Server version   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AZURE);
    test.step("*** Selected the Azure   ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.HOST, "integrator-staging.database.windows.net");
    test.step("*** Renaming the Host name  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.DATABASENAME, "integrator-staging-qa");
    test.step("*** Renaming the Database  name  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_RDBMS, "celigoqa");
    test.step("*** Renaming the Username   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.RDBMS_PASSWORD, "yMKp02tWkGtrldLK");
    test.step("*** Renaming the Password    ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.PORT, "1433");
    test.step("*** Renaming the Port  name   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICATION_ID, "Your test was not successful. Check your information and try again");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Connection is not succesfull and verifying the error  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
