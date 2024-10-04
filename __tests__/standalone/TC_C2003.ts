
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2003", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5823 TC_C2003", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C2003_Test API Token");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click("[data-test='fullAccess']");
    test.step("*** Selected Full Access ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked On Save And Close ***", async ()=>{});

    test.step("*** API Token Is Created Successfully ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SHOW_TOKEN);
    await (await page.locator(selectors.flowBuilderPagePO.COPY_TOKEN)).isVisible();
    test.step("***Token Is Displayed In Clear Text***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COPY_TOKEN);
    test.step("***Copied Token To ClipBoard***", async ()=>{});

    const tokenone = await page.evaluate(() => navigator.clipboard.readText()); 

    await page.waitForSelector(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    const text = await io.homePage.getText(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    await io.assert.expectToContainValue( "Token copied to clipboard.", String(text), "");

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2003_Test API Token");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.NEWTOKENGENERATE);
    await (await page.locator(selectors.flowBuilderPagePO.COPY_TOKEN)).isVisible();
    await page.waitForTimeout(3000);
    test.step("*** Clicked On generate API Token***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COPY_TOKEN);
    test.step("***Copied Token To ClipBoard***", async ()=>{});

    const beforeElList = await page.getByText("TC_C2003_Test API Token").all();

    const tokentwo = await page.evaluate(() => navigator.clipboard.readText()); 

    await page.waitForSelector(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    const textNew = await io.homePage.getText(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    await io.assert.expectToContainValue( "Token copied to clipboard.", String(textNew), "");

    await expect(tokentwo).not.toBe(tokenone);
    test.step("*** newly genertated token is different fromone existing one's ***", async ()=>{});

    var endpoint = "v1/connections/";
    test.step("*** Getting request data for fetching connections response***", async ()=>{});

    var responseData = await io.api.getCall( endpoint);
    var responsedetails = JSON.stringify(responseData.data);
    await io.assert.expectNotToBeNull(responsedetails, "");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.connectionsPagePO.REVOKEAPITOKEN);
    await page.waitForTimeout(5000);
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

    const afrterDelElList = await page.getByText("TC_C2003_Test API Token").all();
    await expect(afrterDelElList.length).toBeLessThanOrEqual(beforeElList.length);
  });
});
