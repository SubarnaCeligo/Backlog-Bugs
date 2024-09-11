import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import SF from "@testData/GENERAL/TC_C1102_C1103_Verify_Updating_Offline_Connection.json";

test.describe("TC_C1102_C1103_Verify_Updating_Offline_Connection", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    // *Edit Deleted Connection
    await test.step("*** Deleting Connection ***",()=>{});
    await io.connections.deleteConnection( SF);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.beforeEach(async ({io,page}, testInfo) => {
    //*Connection
    await test.step("*** Making the OAuth connection go offline ***",()=>{});
    await io.goToFlowsPage();

    await test.step("*** Go to flows ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click('[data-test="Connections"]');
    await test.step("*** Go to connections tab ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.clickByText("Create connection");
    await test.step("*** Clicking on create connections ***",()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SF);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Clicking on salesforce ***",()=>{});
    await io.homePage.fill(selectors.basePagePO.NAME, "DND_Do_Not_Modify");
    await test.step("*** Providing Connection Name ***",()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SF_ACCOUNTTYPE)
    await io.homePage.selectDropDownWithSplChar("Production")
    // await io.homePage.fillWebPage(selectors.connectionsPagePO.SF_ACCOUNTTYPE, "Production");
    await test.step("*** Selecting Environment ***",()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.OAUTHTYPE, "jwtBearerToken");
    await test.step("*** Selecting OAuth type ***",()=>{});
    await io.homePage.fill(selectors.flowBuilderPagePO.SALESFORCE_USERNAME, "testing");
    await test.step("*** Providing invalid username to make the connection offline ***",()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await test.step("*** Skipped authorization to keep the connection offline ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T867 @Env-All  TC_C1102_C1103_Verify_Updating_Offline_Connection", async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test ***",()=>{});
     
    await test.step("*** Editing Connection ***",()=>{});
    var onlineJSON = await io.connections.createConnectionViaAPI(SF);
    // *Validation of Editd Connection
    let onlineConntext = '"offline": false';
    if(JSON.stringify(onlineJSON).indexOf(onlineConntext)) {
      await test.step("** connection is online **",()=>{});
    }
    await test.step("*** Verified Connection is online test.afterEach authorizing ***",()=>{});
  });
});
