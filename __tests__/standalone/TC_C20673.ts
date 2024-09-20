
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C20673", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5834 TC_C20673", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C20673_First_API_Token_Entry");
    test.step("*** Entered API Token Name ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON,"TC_C20673_First_API_Token_Entry");
    await page.waitForTimeout(1000);
    await io.homePage.clickByTextByIndex("TC_C20673_First_API_Token_Entry", 0);
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    
    var errormessage = await(await page.locator(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)
    ).textContent();
    console.log("errormessage", errormessage);
    await io.assert.expectToBeValue(String(errormessage), "A value must be provided", "");
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C20673_First_API_Token_Entry");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await page.waitForTimeout(1000);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C20673_First_API_Token_Entry");
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    
    const revokedEl = await page.getByText("Revoked").first();
    await revokedEl.waitFor({ state: 'visible', timeout: 30000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    await expect(revokedEl).toBeVisible();
    test.step("*** API Token Is Revoked Successfully ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await page.waitForTimeout(3000);
    test.step("*** Clicked On Delete API Token***", async ()=>{});
  });
});
