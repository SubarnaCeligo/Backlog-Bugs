
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C15501", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T1852 TC_C15501", async ({io,page}, testInfo) => {

    await io.homePage.goToMenu("Resources", "Exports");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("** Entered export Page **", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C15501_FTP_EXP");
    test.step("*** Searching export with name ***", async () => { });
    //Updated the locator
    await io.homePage.clickByTextByIndex("TC_C15501_FTP_EXP_DND", 0);
    test.step("*** Open export ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.CSVPARSERFILEHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    
    const parsehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)

    expect(parsehelptext).toContain("The CSV parser helper can be used to visualize and experiment with how integrator.io parses CSV files (or any other delimited text files) into the JSON records/rows that then get processed by your flow.");
    test.step("*** Verified the  help text is as expected for the CSV PARSE FILE ***", async ()=>{});
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("** Entered import Page **", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C15501_FTP_IMP");
    test.step("*** Searching import with name ***", async () => { });
    //Updated the locator
    await io.homePage.clickByTextByIndex("TC_C15501_FTP_IMP_DND", 0);
    test.step("*** Open import ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.CSVPARSERFILEHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
    
    const parsehelptext2 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)

    expect(parsehelptext2).toContain("The CSV generator helper can be used to visualize and experiment with how integrator.io builds CSV files (or any other delimited text files) from the JSON records/rows being processed by your flow.");
    test.step("*** Verified the  help text is as expected for the CSV PARSE FILE ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step(" Navigating to Home Page", async ()=>{});
  });
});
