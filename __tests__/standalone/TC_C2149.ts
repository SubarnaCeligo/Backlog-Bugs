
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C2149", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1840 TC_C2149", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.MICROSOFT_SQL);
    test.step("*** clicked on MSSQL  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.INSTANCENAMEHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    var instancenamehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(instancenamehelptext).toContain(`For Microsoft SQL (MS SQL) only--this field specifies the instance name to connect to. The SQL Server Browser service must be running on the database server, and UDP port 1434 on the database server must be reachable. If you set this field you cannot set the "port" field as well, as "instanceName" and "port" are mutually exclusive connection options.`);
    
    await io.homePage.click(selectors.flowBuilderPagePO.PORTHELPTEXT);

    var porthelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await expect(String(porthelptext)).toContain("The server port to connect to. The default value varies depending on the type of database you are connecting to.");

    test.step("*** Verified the help texts for port and instance should be available. ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
