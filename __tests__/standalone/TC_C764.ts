
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import DB from "@testData/Flows/create/sqldatabase/TC_C2169.json"

test.describe("Import DBAdaptors validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
   // await allureReporter.addIssue("https://celigo.atlassian.net/browse/IO-27763");
  });
  // skipping this test as there a bug for delete an empty flow, we are able to view error message
  test("@Env-All @Zephyr-IO-T9338 TC_C764", async ({io,page}, testInfo) => {
    test.step("*** clicked on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** clicked on import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** selecting mysql as import ***", async ()=>{});
    await io.homePage.click("[data-test='MySQL'] div");
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = "MYSQL CONNECTION";
    
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** selecting connection ***", async ()=>{});
    
    await io.homePage.click(selectors.importPagePO.MARIADB_PER_RECORD);
    
    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);
    test.step("*** clicked on lookup button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.DBLOOKUP);
    test.step("*** entering the query ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.QUERY, "select * from Dummy_Table");
    test.step("*** Lookup Table Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.RESOURCE_PATH, "Dummy");
    test.step("*** Lookup Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.NAME_FIELD, "Lookup");
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.click(selectors.flowBuilderPagePO.DBLOOKUP);
    test.step("*** Validating the Lookup is saveing or not ***", async ()=>{});

    const nameEl = await page.getByText("Lookup").first();
    await nameEl.waitFor({ state: 'visible', timeout: 10000 });
    await expect(nameEl).toBeVisible();
    test.step("*** Validation is completed ***", async ()=>{})

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEXBUTTON);
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    
    test.step("*** Deleted the created flow ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Zephyr-IO-T9302 @Zephyr-IO-T9298 TC_C2169_C1723", async ({io,page}, testInfo) => {

    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** clicked on create flow ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** selecting mysql as import ***", async ()=>{});
    await io.homePage.click("[data-test='MySQL'] div");
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var conn = "MYSQL CONNECTION";
    
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** selecting connection ***", async ()=>{});
    
    await io.homePage.click(selectors.importPagePO.MARIADB_PER_RECORD);

    test.step("*** Clicked on handlebar ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);
    test.step("*** Clicked on AFE 1.0 ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Providing AFE data query ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "insert into Dummy {{data.id}}");
    test.step("*** Clicked on preview button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Validating the preview is wokring not, so that test will automatically validate the Data option for AFE 1.0 ***", async ()=>{});
    var Result = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue( "insert·into·Dummy", String(Result), "");
    test.step("*** Verified ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Closed that window ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** discarding the changes ***", async ()=>{});
  });
});
