
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C1685_TC_C1087_Verify_Shared_Stack_Able_See_In_List_Delete_Shared_Stack", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6733 TC_C1685_TC_C1087_Verify_Shared_Stack_Able_See_In_List_Delete_Shared_Stack", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Stacks");
    test.step("Clicked on stack button", async ()=>{});
    await io.homePage.loadingTime();

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C1685_Auto_DND");
    await io.homePage.loadingTime();     
    test.step("***Searching the stack ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.STACKSHARE);
    test.step("*** Share the stack ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.INVITEUSER);
    await io.homePage.fillWebPage("[data-test='email']", "harish.reddy@celigo.com");
    test.step("*** Invite the user ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.SAVEINVITE);
    await io.homePage.loadingTime();
    test.step("*** Validating the invite status ***", async ()=>{});

    test.step("*** Closing the Share Stack window ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON);

    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C1685_Auto_DND");
    await io.homePage.loadingTime();     
    test.step("***Searching the stack ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.STACKSHARE);
    await io.homePage.loadingTime();
    test.step("*** Share the stack ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.DELETESTACKINVITE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Delete shared stack ***", async ()=>{});

    await io.homePage.click(selectors.flowBranchingPO.REMOVEDIALOG);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Remove user ***", async ()=>{});

    test.step("*** Validating Able to delete the stack shared ***", async ()=>{});
    const el = await page.getByText("harish.reddy@celigo.com");
    await expect(el).not.toBeVisible();

    test.step("*** Closing the Stack window ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON);

    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
