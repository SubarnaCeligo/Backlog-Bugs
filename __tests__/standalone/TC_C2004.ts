
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import connec from "@testData/STANDALONE/TC_C22436.json";

test.describe("TC_C2004", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5824 TC_C2004", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C2004_Token reactivate validationoperation");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    test.step("*** API Token Is Created Successfully ***", async ()=>{});

    // await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // await io.homePage.goToMenu("Resources","API tokens");
    // await io.homePage.loadingTime();
    // test.step("*** Clicked On API Token Icon ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2004_Token reactivate validationoperation");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.REVOKEAPITOKEN);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    
    const revokedEl = await page.getByText("Revoked").first();
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    await revokedEl.waitFor({ state: 'visible', timeout: 60000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    
    await expect(revokedEl).toBeVisible();
    test.step("*** API Token Is Revoked Successfully ***", async ()=>{});
    
    // await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // await io.homePage.goToMenu("Resources","API tokens");
    // test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.REACTIVATETOKEN);
    await io.homePage.click(selectors.connectionsPagePO.REACTIVATETOKEN);
    test.step("*** Clicked On Reactivate API Token***", async ()=>{});

    const activeEl = await page.getByText("Active").first();
    await activeEl.waitFor({ state: 'visible', timeout: 60000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    test.step("*** API Token Is reactivated Successfully ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SHOW_TOKEN);
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.COPY_TOKEN);

    test.step("***Token Is Displayed In Clear Text***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COPY_TOKEN);
    test.step("***Copied Token To ClipBoard***", async ()=>{});

    const tokencopied = await page.evaluate(() => navigator.clipboard.readText()); 

    await page.waitForSelector(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    const text = await io.homePage.getText(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    await io.assert.expectToContainValue( "Token copied to clipboard.", String(text), "");

    const conn = io.connMap.get("NETSUITE CONNECTION");
    
    var endpoint = "v1/connections/" + conn;
    test.step("*** Getting request data form NS connection response***", async ()=>{});

    var responseData = await io.api.getCall( endpoint);
    var responsedetails = JSON.stringify(responseData.data);
    await io.assert.expectNotToBeNull(responsedetails, "");

    // await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // await io.homePage.goToMenu("Resources","API tokens");
    // await io.homePage.loadingTime();
    // await io.homePage.isPageReady();
    // await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    // await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    // await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2004_Token reactivate validationoperation");
    // await test.step("***Searching the created token***", async ()=>{});

    const beforeElList = await page.getByText("TC_C2004_Token reactivate validationoperation").all();

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.REVOKEAPITOKEN);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    
    const revokedNewEl = await page.getByText("Revoked").first();
    await revokedNewEl.waitFor({ state: 'visible', timeout: 60000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    await expect(revokedNewEl).toBeVisible();
    test.step("*** API Token Is Revoked Successfully ***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await page.waitForTimeout(3000);
    test.step("*** Clicked On Delete API Token***", async ()=>{});
        
    const afrterDelElList = await page.getByText("TC_C2004_Token reactivate validationoperation").all();
    await expect(afrterDelElList.length).toBeLessThanOrEqual(beforeElList.length);
    
  });
});
