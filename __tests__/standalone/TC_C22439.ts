
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C22439", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5838 TC_C22439", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C22439_Token_purge_validation");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON,"TC_C22439_Token_purge_validation");
    await page.waitForTimeout(1000);
    test.step("*** Searching the created API Token ***", async ()=>{});

    test.step("*** API Token Is Created Successfully ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    test.step("*** Clicked On Edit API Token***", async ()=>{});

    await (await page.locator(selectors.connectionsPagePO.AUTOPURGETOKEN)).isVisible();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "3600000");
    const tokenVal = await page.locator(selectors.connectionsPagePO.AUTOPURGETOKEN).textContent();
    await expect(tokenVal).toBeTruthy();
    test.step("*** Selected 1hr purge time on Token***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    await page.waitForTimeout(3000);
    await (await page.locator(selectors.integrationPagePO.OPENACTIONSMENU)).first().isVisible();
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    await (await page.locator(selectors.integrationPagePO.EDIT)).isVisible();
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    test.step("*** Clicked On Edit API Token***", async ()=>{});

    await (await page.locator(selectors.connectionsPagePO.AUTOPURGETOKEN)).isVisible();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "14400000");
    const updatedTokenVal = await page.locator(selectors.connectionsPagePO.AUTOPURGETOKEN).textContent();
    await expect(updatedTokenVal).toEqual("4 Hours");
    test.step("*** Selected 4hr purge time on Token***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await (await page.locator(selectors.connectionsPagePO.REVOKEAPITOKEN)).isVisible();
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    
    const revokedEl = await page.getByText("Revoked").first();
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    await revokedEl.waitFor({ state: 'visible', timeout: 30000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    
    await expect(revokedEl).toBeVisible();
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
