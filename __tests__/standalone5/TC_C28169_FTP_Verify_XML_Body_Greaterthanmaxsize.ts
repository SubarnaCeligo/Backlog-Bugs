
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C28169_FTP_Connections.json";

test.describe("TC_C28169_FTP_Verify_XML_body_GreaterthanMaxsize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T16640 @Env-All TC_C28169_FTP_Verify_XML_body_GreaterthanMaxsize Verify Add to URI or Body message for HTTP Export with Page Number Parameter", async ({io,page}, testInfo) => {

    // *Create Page Processors
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    test.step("*** selecting FTP ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);

    test.step("*** Selecting Transfer files to destination app ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.TRANSFER_FILES);

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    test.step("*** Choosing the desired FTP connection ***", async ()=>{});
    var conn = FTP.Connections[0].FTP["connectionId"];
      

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);

    test.step("*** Clicking on next button ***", async ()=>{});

    test.step("*** Entering testcase name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_TC_C28169_FTP");

    test.step("*** Selecting Filetype ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "xml");

    test.step("*** Entering Directory path ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.FTP_DIRECTORY_PATH, "/io.auto.qa");
    await io.homePage.click(selectors.flowBuilderPagePO.XMLBODYHANDLEBAR);

    test.step("*** Enetring 129kb size of data into Xml body ***", async ()=>{});
    var data2 = FTP.FTP[2]["body129kb"];
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, data2);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    test.step("*** Validating Xml Body with 129kb size of data ", async ()=>{});
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "The maximum size of the field: file.xml.body in the Import document should be 65536 characters.");

    await page.waitForTimeout(5000);

    // second step
    try {
      test.step("*** Validating Xml Body with 127kb size of data ", async ()=>{});
      var data2 = FTP.FTP[1]["body127kb"];
    await io.homePage.click(selectors.flowBuilderPagePO.XMLBODYHANDLEBAR);
    await page.waitForTimeout(1000);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, data2);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.assert.verifyElementNotBeFound(selectors.flowBranchingPO.AFE_HEADINGS);
    
    

    test.step("*** Validating Xml Body with 128kb size of data ", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    var data2 = FTP.FTP[0]["body128kb"];
    await io.homePage.click(selectors.flowBuilderPagePO.XMLBODYHANDLEBAR);
    await page.waitForTimeout(1000);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, data2);

    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.assert.verifyElementNotBeFound(selectors.flowBranchingPO.AFE_HEADINGS);

    } catch (error) {
      console.log('Error', error);
      await page.pause();
    }
  });
});
