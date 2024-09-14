
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C2006", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5826 TC_C2006", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked on API token button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C2006_Token audit validationoperation");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    test.step("*** API Token Is Created Successfully ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2006_Token audit validationoperation");
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    test.step("*** Clicked On audit API Token***", async ()=>{});

    const textEl = await page.getByText("Audit log: TC_C2006_Token audit validationoperation");
    await textEl.waitFor({ state: 'visible', timeout: 30000 });
    await expect(textEl).toBeVisible();
    test.step("*** API Token Is audited Successfully ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    await io.homePage.loadingTime();
    test.step("*** Clicked on API token button ***", async ()=>{});
    
    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2006_Token audit validationoperation");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    
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
