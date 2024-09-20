
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { encrypt ,randomNumber} from "@celigo/aut-utilities";
import connec from "@testData/STANDALONE/TC_C22436.json";

test.describe("TC_C1994", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5814 TC_C1994", async ({io,page}, testInfo) => {

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked on API token button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    // await io.homePage.loadingTime();
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "Token revoke validationoperation");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Token revoke validationoperation");
    await test.step("***Searching the created token***", async ()=>{});

    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    await page.waitForTimeout(3000);
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    const revokedEl = await page.getByText("Revoked").first();
    await revokedEl.waitFor({ state: 'visible', timeout: 30000 });
    await expect(revokedEl).toBeVisible();
    test.step("*** API Token Is Revoked Successfully ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SHOW_TOKEN);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.COPY_TOKEN);

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

    await expect(responseData).toBeUndefined();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources","API tokens");
    await io.homePage.loadingTime();
    test.step("*** Clicked On API Token Icon ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON,"Token revoke validationoperation");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await page.waitForTimeout(3000);
  });
});
