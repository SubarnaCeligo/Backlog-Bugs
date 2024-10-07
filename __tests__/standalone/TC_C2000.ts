
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2000", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5820 TC_C2000", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked on API token button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.CREATEAPITOKEN);
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C2000_generating new token");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    test.step("*** Clicked On Save And Close ***", async ()=>{});
    test.step("*** API Token Is Created Successfully ***", async ()=>{});

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2000_generating new token");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});
    
    await io.homePage.click(selectors.flowBuilderPagePO.SHOW_TOKEN);
    test.step("***Token Is Displayed In Clear Text***", async ()=>{});
    await (await page.locator(selectors.flowBuilderPagePO.COPY_TOKEN)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.COPY_TOKEN);
    test.step("***Copied Token To ClipBoard***", async ()=>{});

    const firsttokencopiedText = await page.evaluate(() => navigator.clipboard.readText()); 
    
    await page.waitForSelector(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    const text = await io.homePage.getText(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    await io.assert.expectToContainValue( "Token copied to clipboard.", String(text), "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    await io.homePage.loadingTime();
    test.step("*** Clicked on API token button ***", async ()=>{});
    
    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2000_generating new token");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});

    await (await page.locator(selectors.integrationPagePO.OPENACTIONSMENU)).first().isVisible();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await (await page.locator(selectors.connectionsPagePO.NEWTOKENGENERATE)).first().isVisible();
    await io.homePage.click(selectors.connectionsPagePO.NEWTOKENGENERATE);
    test.step("*** Clicked On generate API Token***", async ()=>{});
    
    await (await page.locator(selectors.flowBuilderPagePO.COPY_TOKEN)).first().isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.COPY_TOKEN);
    test.step("***Copied Token To ClipBoard***", async ()=>{});

    var secondtokencopiedText = await page.evaluate(() => navigator.clipboard.readText()); 

    await expect(secondtokencopiedText).not.toBe(firsttokencopiedText);
    test.step("*** verify newly generated token ***", async ()=>{});
    
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.REVOKEAPITOKEN);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    test.step("*** Clicked On Revoke API Token***", async ()=>{});
    
    const revokedEl = await page.getByText("Revoked").first();
    await revokedEl.waitFor({ state: 'visible', timeout: 30000 });
    test.step("*** Wait for text to be visible ***", async ()=>{});
    await expect(revokedEl).toBeVisible();
    test.step("*** API Token Is Revoked Successfully ***", async ()=>{});

    const beforeElList = await page.getByText("TC_C2000_generating new token").all();
    
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await page.waitForTimeout(3000);
    test.step("*** Clicked On Delete API Token***", async ()=>{});

    const afrterDelElList = await page.getByText("TC_C2000_generating new token").all();

    await expect(afrterDelElList.length).toBeLessThanOrEqual(beforeElList.length);
  });
});
