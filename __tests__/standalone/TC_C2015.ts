
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C2015", () => {
  
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  
  test("@Env-All @Zephyr-IO-T1837 TC_C2015", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C2015");
    await io.homePage.clickByTextByIndex("TC_C2015_DND", 0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Choosing desired flow ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on import button ***", async ()=>{});

    test.step("*** launching query builder ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);

    test.step("*** Click on create look up ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.DBLOOKUP);
    await io.homePage.loadingTime();

    await io.homePage.click(`${selectors.mappings.LOOKUP_HELPTEXT}${selectors.flowBuilderPagePO.HELP_TEXT_ICON}`);
    var verifytext1 = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    await io.assert.expectToContainValue( "Use a dynamic search to look up data directly in the import application. For example, you can use this option if you have an email address in your export data and you want to run a search to find a system id value in the import application", String(verifytext1) ,"");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Validate the help text for lookup***", async ()=>{});
    
    await io.homePage.click(`${selectors.mappings.QUERY_HELPTEXT}${selectors.flowBuilderPagePO.HELP_TEXT_ICON}`);
    verifytext1 = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    await io.assert.expectToContainValue( "The query that fetches records to be exported", String(verifytext1),"");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Validate the help text for query***", async ()=>{});

    await io.homePage.click(`[id='_name'] button${selectors.flowBuilderPagePO.HELP_TEXT_ICON}`);
    verifytext1 = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    await io.assert.expectToContainValue("Enter a unique name so that you can identify this lookup later", String(verifytext1),"");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    test.step("*** Validate the help text for Name ***", async ()=>{});

    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER, 1);

    test.step("*** Navigating to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
