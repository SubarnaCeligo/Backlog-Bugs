
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/netsuite_standalone_imports.json";
const os = require('os');

test.describe("TC_14243_Verify_ErrorLogs_with_NS", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4400 TC_14243_Login Error", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connections in Homepage ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    await io.homePage.loadingTime();
    test.step("*** clicked on NetSuite adaptor ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.basePagePO.INPUT_NAME_SELECTOR, "Netsuite Connection");
    await io.homePage.loadingTime();
    test.step("*** Name the Netsuite connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.WSDLVERSION, "2018.1");
    await io.homePage.loadingTime();
    test.step("*** Selected the wsdlVersion ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.NETSUITE_AUTH, "token");
    await io.homePage.loadingTime();
    test.step("*** Selecting NetSuite Token Environment ***", async ()=>{});
    await io.homePage.fillWebPage('[data-test="netsuite.tokenEnvironment"]', "sandbox2.0");
    await io.homePage.loadingTime();
    test.step("*** Selecting NetSuite Token Environment ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.TOKENACCID, "TSTDRV1143616");
    test.step("*** Entering NetSuite account ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.NETSUITE_TOKENID, "test");
    test.step("*** Entering NS token id ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.NETSUITE_TOKEN_SECRET, "123");
    test.step("*** Entering NS token secret ***", async ()=>{});
    
    await io.connectionPage.click(selectors.connectionsPagePO.NETSUITE_ICLIENT);
    const dropdownOptions = await page.getByRole('menuitem').all();
    dropdownOptions[1].click();
    test.step("*** Selecting NS iClient ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await page.waitForTimeout(6000);
    test.step("*** Clicked on Test Connection ***", async ()=>{});

    var result = await page.getByText("Invalid login attempt.");
    await result.waitFor({ state: 'visible', timeout: 10000 });
    await expect(result).toBeVisible();
    test.step("*** Validating the error msg ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
  });

  // Need netsuite connection up for this
  
  test("Export Saved Search Error", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected NETSUITE as the adaptor ***", async ()=>{});

    test.step("*** Clicking on type of export ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    test.step("*** Choosing type of export from dropdown ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    const conn = NS["connectionId"];    
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired NETSUITE connection ***", async ()=>{});
    // await io.homePage.click(selectors.basePagePO.SAVE);
    // test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "NS Export");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    await page.waitForTimeout(1000);
    test.step("*** Refreshing the RecordType of NETSUITE ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE, "Account");
    test.step("*** Item Location Configuration Record type is selected ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORT_SAVED_SEARCH, "830");
    test.step("*** Selecting the desired saved search ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicked On Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowBuilder.click(selectors.importPagePO.PREVIEWDATA);

    const platform = os.platform();
    if (platform === 'darwin') {
      await page.keyboard.press('Meta+A'); 
      await page.keyboard.press('Meta+C');
    } else {
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Control+C');
    }

    const Error = await page.evaluate(() => navigator.clipboard.readText()); 
    await io.assert.expectToContainValue("That search or mass update does not exist", String(Error), "");
    test.step("*** Verified The Error in Export ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
  });
});
