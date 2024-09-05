
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C1085 from "@testData/STANDALONE/TC_C1085.json";

test.describe("TC_C1085_Verify_Able_to_Share_Stack", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6728 TC_C1085_Verify_Able_to_Share_Stack", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Stacks");
    await io.homePage.loadingTime();
    test.step("Clicked on stack button", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    test.step("*** Clcik on create stack***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, TC_C1085.name);
    test.step("*** Enter the name***", async ()=>{});
    
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "Server");
    test.step("*** Choose the type***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.integrationPagePO.HOST, TC_C1085.Host);
    test.step("*** Enter Host URI***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Save and close stack***", async ()=>{});
    
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, TC_C1085.name);
    test.step("*** Search the stack ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.STACKSHARE);
    test.step("*** Share the stack ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.INVITEUSER);
    await io.homePage.fillWebPage("[data-test='email']", TC_C1085.Email);
    test.step("*** Invite the user ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.SAVEINVITE);
    await io.homePage.loadingTime();
    test.step("*** Validating the invite status ***", async ()=>{});
    
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.TEST_RUN_STATUS)
    await io.assert.expectToContainValue( "Pending", String(data),"");
    
    test.step("*** Closing the invite ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.DELETESTACKINVITE);
    await io.homePage.click("[data-test='Remove']");
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    test.step("*** Delete the stack ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to home page ***", async ()=>{});
  });
});
