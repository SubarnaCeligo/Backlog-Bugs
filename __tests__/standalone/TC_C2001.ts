
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2001", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5821 TC_C2001", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked on API token button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_2001_Token reactivate validation");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    test.step("*** API Token Is Created Successfully ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked on API token button ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_2001_Token reactivate validation");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    await page.waitForTimeout(2000);
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    
    const revokedEl = await page.getByText("Revoked").first();
    await revokedEl.waitFor({ state: 'visible', timeout: 30000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    await expect(revokedEl).toBeVisible();
    test.step("*** API Token Is Revoked Successfully ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked on API token button ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_2001_Token reactivate validation");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.REACTIVATETOKEN);
    await page.waitForTimeout(3000);
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    const activeEl = await page.getByText("Active");
    await expect(activeEl).toBeVisible();
    test.step("*** API Token Is reactivated Successfully ***", async ()=>{});
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    await io.homePage.loadingTime();
    test.step("*** Clicked on API token button ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON,"TC_2001_Token reactivate validation");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    
    const newRevokedEl = await page.getByText("Revoked");
    await newRevokedEl.waitFor({ state: 'visible', timeout: 30000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    await expect(newRevokedEl).toBeVisible();
    test.step("*** API Token Is Revoked Successfully ***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await page.waitForTimeout(3000);
    test.step("*** Clicked On Delete API Token***", async ()=>{});
                
    const noResultsEl = await page.getByText("Your search didn’t return any matching results. Try expanding your search criteria.");
    await noResultsEl.waitFor({ state: 'visible', timeout: 30000 });
    await expect(noResultsEl).toBeVisible();
    test.step("*** API Token Is Deleted Successfully ***", async ()=>{});
  });
});
