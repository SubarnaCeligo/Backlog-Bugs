import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C40117_Invalid_Creds_for_AmazonRedshift_Connection", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T7560 @Env-All TC_C40117_Invalid_Creds_for_AmazonRedshift_Connection", async ({io,page}, testInfo) => {
    test.step("*** Checking for connection option is displayed ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await(await page.locator(selectors.basePagePO.ADD_NEW_RESOURCE)).click();
    test.step("*** Clicking on the AmazonRedshift ***", async ()=>{});
    await(await page.locator(selectors.connectionsPagePO.AMAZON_REDSHIFT)).click();
    await io.homePage.loadingTime()
    test.step("*** Providing Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "C40117_Connection_Name");
    test.step("*** Providing region id ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AMAZONREDSHIFT_REGION, "us-east-1");
    test.step("*** providing invalid access key Id ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AMAZONREDSHIFT_ACCESSKEY, "abcd");
    test.step("*** providing invalid secret access key ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AMAZONREDSHIFT_SECRETACCESSKEY, "efgh");
    test.step("*** providing username ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_RDBMS, "celigo_qa");
    test.step("*** providing database name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.DATABASENAME, "qa");
    test.step("*** providing cluster name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AMAZONREDSHIFT_CLUSTERNAME, "integrator-dev-cluster");

    test.step("*** Clicking on save button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
    test.step("*** validating the error message ***", async ()=>{});
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "Your test was not successful. Check your information and try again");
    test.step("*** validated the error message ***", async ()=>{});
    test.step("*** Clicked on cancel button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked on cancel button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
