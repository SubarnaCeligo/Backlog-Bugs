
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C27985_AFE_connection_check", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T4605 @Env-All TC_C27985_AFE_connection_check", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** Navigating to the connection page ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.integrationPagePO.CLOSEBYTEXT, "Create connection");
    await io.homePage.loadingTime();
    test.step("*** Clicking on create connections ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Http ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    test.step("***  clicking on the how to test connection section  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CONNECTION_RELATIVE_URI);
    test.step("***  clicking on the handlebar pen ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    test.step("*** clicking on preview resource body***", async ()=>{});
    var paste = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue( "connection", paste,"");
    test.step("*** verifying the connection setting displayed  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    
    test.step("*** clicking close right drawer ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking close button ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
