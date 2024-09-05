
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1083_stack_edit", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6725 TC_C1083_stack_edit", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("***Clicked On Profile Options***", async ()=>{});
    
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("***Clicked On Profile Menu***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const checked = await (await io.homePage.getElement(`${selectors.flowBuilderPagePO.DEVELOPER_MODE} input`)).isChecked();
    
    if (checked == true) {
      test.step("***Checked The Developer Mode***", async ()=>{});
    } else {
      await io.homePage.click(selectors.flowBuilderPagePO.DEVELOPER_MODE);
      test.step("***Checked The Developer Mode***", async ()=>{});
    }
    
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Stacks");
    await io.homePage.loadingTime();
    test.step("Clicked on stack button", async ()=>{});
    
    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_AuditLog_Stack_DND");
    await io.homePage.loadingTime();     
    test.step("***Searching the created stack ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    test.step("*** clicking on the edit stack ***", async ()=>{});    
    
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_AuditLog_Stack_DND_TC_C1083");
    test.step("*** filling the text field***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** save and close***", async ()=>{});

    const isExists = page.getByText('TC_AuditLog_Stack_DND_TC_C1083').first();
    await expect(isExists).toBeVisible();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_AuditLog_Stack_DND_TC_C1083");
    await io.homePage.loadingTime();     
    test.step("***Searching the created stack ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    test.step("*** clicking on the edit stack ***", async ()=>{});    
    
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_AuditLog_Stack_DND");
    test.step("*** filling the text field***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** save and close***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to home page ***", async ()=>{});
  });
});
