
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C1084_Verify_able_to_delete_stack", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("@Env-All @Zephyr-IO-T6727 TC_C1084_Verify_able_to_delete_stake", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Stacks");
    await io.homePage.loadingTime();
    test.step("Clicked on stack button", async ()=>{});

    test.step("*** Clcik on create stack***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC1084_Auto_2024");
    test.step("*** Enter the name***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    test.step("*** Choose the type***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "Server");
    await io.homePage.loadingTime();

    await io.homePage.fill(selectors.integrationPagePO.HOST, "celigo.com");
    test.step("*** Enter Host URI***", async ()=>{});
    
    test.step("*** Save and close stack***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC1084_Auto_2024");
    await io.homePage.loadingTime();     
    test.step("***Searching the created stack ***", async ()=>{});

    const beforeElList = await page.getByText("TC1084_Auto_2024").all();

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await page.waitForTimeout(5000);
    await io.homePage.loadingTime();
    test.step("*** Delete the stack ***", async ()=>{});

    const afrterDelElList = await page.getByText("TC1084_Auto_2024").all();
    await expect(afrterDelElList.length).toBeLessThanOrEqual(beforeElList.length);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to home page ***", async ()=>{});
  });
});
