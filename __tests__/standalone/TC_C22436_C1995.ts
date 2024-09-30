
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,encrypt,randomNumber} from "@celigo/aut-utilities";
import connec from "@testData/STANDALONE/TC_C22436.json";

test.describe("TC_C22436_C1995", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5835 @Zephyr-IO-T5815 TC_C22436_C1995", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked on API token button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C22436_C1995_Token_Operation");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    test.step("*** API Token Is Created Successfully ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON,"TC_C22436_C1995_Token_Operation");
    await page.waitForTimeout(1000);

    await io.homePage.click(selectors.flowBuilderPagePO.SHOW_TOKEN);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COPY_TOKEN);

    test.step("***Token Is Displayed In Clear Text***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COPY_TOKEN);
    test.step("***Copied Token To ClipBoard***", async ()=>{});

    const tokencopied = await page.evaluate(() => navigator.clipboard.readText()); 
    
    let connMap = await io.api.loadConnections();
    const connId = await connMap.get('NETSUITE CONNECTION')

    var endpoint = "v1/connections/" + connId;
    test.step("*** Getting request data form NS connection response***", async ()=>{});

    const encryptedToken = encrypt("Bearer " + tokencopied);
    var responseData = await io.api.getCall(endpoint, undefined, encryptedToken);
    var responsedetails = JSON.stringify(responseData);

    await io.assert.expectNotToBeNull(responsedetails, "");

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON,"TC_C22436_C1995_Token_Operation");
    await page.waitForTimeout(1000);

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
