import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C45300_Verify_HelpText_XML_TC_C59393", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T16942 @Zephyr-IO-T18454 @Env-All TC_C45300_Verify_HelpText_XML_TC_C59393", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    
    test.step("*** Selecting ftp adapter ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.loadingTime();
    
    test.step("*** Choosing the desired ftp connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
    
    test.step("*** Entering the Import Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C45300");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    
    await io.homePage.fillWebPage(selectors.exportsPagePO.FILE_TYPE, "xml");
    test.step("*** Choosing File Type as XML ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HELPICON);
    test.step("*** Clicked on help text ***", async ()=>{});
    var helpText = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    test.step("*** Getting help text ***", async ()=>{});
    expect(String(helpText)).toContain("Please provide a sample file that this transfer would need to process. We will use the sample file to auto-set various fields (where possible), and also help you map data in a subsequent step.");
    test.step("*** Verified XML help text ***", async ()=>{});

    //TC_C59393-Verify close button and field path for new HelpText component
    expect(String(helpText)).toContain("Field path:");
    expect(String(helpText)).toContain("import.uploadFile");
   
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
  });
});
