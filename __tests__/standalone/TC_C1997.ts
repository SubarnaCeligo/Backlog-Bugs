
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import connec from "@testData/STANDALONE/TC_C22436.json";

test.describe("TC_C1997", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T5817 TC_C1997", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Clicked On API Token Icon ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Clicked On Create API Token Button ***", async ()=>{});
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_C1997_TokenPostOperation");
    test.step("*** Entered API Token Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.AUTOPURGETOKEN, "never");
    await io.homePage.click(selectors.connectionsPagePO.FULLACCESS);
    test.step("*** Selected custom Access ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONNECTION);
    await page.waitForTimeout(2000);
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.NEW_ERROR_VIEW_OPTION);
    test.step("*** Click on connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    test.step("*** Click On Done ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Clicked On Save And Close ***", async ()=>{});
    test.step("*** API Token Is Created Successfully ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","API tokens");
    await io.homePage.loadingTime();
    test.step("*** Clicked on API token button ***", async ()=>{});
    
    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C1997_TokenPostOperation");
    await io.homePage.loadingTime();
    await test.step("***Searching the created token***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SHOW_TOKEN);
    test.step("***Token Is Displayed In Clear Text***", async ()=>{});
    
    await (await page.locator(selectors.flowBuilderPagePO.COPY_TOKEN)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.COPY_TOKEN);
    test.step("***Copied Token To ClipBoard***", async ()=>{});

    const tokencopied = await page.evaluate(() => navigator.clipboard.readText()); 

    await page.waitForSelector(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    const text = await io.homePage.getText(selectors.flowGroupingPagePO.ALERT_MESSAGE);
    await io.assert.expectToContainValue( "Token copied to clipboard.", String(text), "");

    var conn = connec.QA_connection.SF_conn;
    if(process.env["ENVIRONMENT"] == "staging" || process.env["ENVIRONMENT"] == "iaqa") {
      conn = connec.Staging_connections.SF_conn;
    }
    var endpoint = "v1/connections/" + conn + "/export";
    test.step("*** Getting request data form SF connection response***", async ()=>{});

    var conn1 = connec.SF_qa;
    if(process.env["ENVIRONMENT"] == "staging" || process.env["ENVIRONMENT"] == "iaqa") {
      conn1 = connec.SF_Staging;
    }
    const responseData = await io.api.postCall( endpoint,  JSON.stringify(conn1), );
    test.step("*** validating the the response from POST SF route***", async ()=>{});
    var responsedetails = JSON.stringify(responseData.data);
    await io.assert.expectNotToBeNull(responsedetails, "");

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C1997_TokenPostOperation");
    const beforeElList = await page.getByText("TC_C1997_TokenPostOperation").all();
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
    await page.waitForTimeout(5000);
    await io.homePage.loadingTime();
    test.step("*** Clicked On Delete API Token***", async ()=>{});

    const afrterDelElList = await page.getByText("TC_C1997_TokenPostOperation").all();
    await expect(afrterDelElList.length).toBeLessThanOrEqual(beforeElList.length);
  });
});
