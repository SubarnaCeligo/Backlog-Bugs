
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C33386_Verify_QueryBuilder_RDBMSImport_output_Premap_Hook.json";

test.describe("TC_C33385_Verify_ExistingDataLookup_RDBMSImport_output_Premap_Hook", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowID]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Env-All @Zephyr-IO-T5541 TC_C33385_Verify_ExistingDataLookup_RDBMSImport_output_Premap_Hook", async ({io,page}, testInfo) => {
    flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    test.step("***Clicking on the add data proccessor***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);

    test.step("***Clicking on the Hooks ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
    await io.homePage.loadingTime();

    test.step("*** Clicking on the create script ***", async ()=>{});
    await io.homePage.clickButtonByIndex( selectors.flowGroupingPagePO.PREMAPCREATESCRIPT, 0);
    await io.homePage.loadingTime();

    test.step("*** Entering the name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.NAME_INPUT, "premap");

    test.step("*** Selecting preMap in insert function stub ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.FUNCTION_STUB, "preMap");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Script edit ***", async ()=>{});
    await io.homePage.clickButtonByIndex( selectors.flowGroupingPagePO.PREMAPCREATESCRIPT, 1);
    await io.homePage.loadingTime();

    test.step("*** Entering premap Script ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.myAccountPagePO.LOGS, FTP.Script);

    test.step("*** Clicking on premap save and close butoon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Mysql Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);

    test.step("*** Selecting Dynamic Query from Lookup type dropdown ***", async ()=>{});
    await io.homePage.click("[id='COMPOSITE']");
    await io.homePage.click("[data-test='rdbms.lookupType']");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.DYNAMICLOOKUP);
    await io.homePage.loadingTime();

    test.step("*** Adding New Lookup ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADD_LOOKUP);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on SQL Query handlebar ***", async ()=>{});
    await io.homePage.click("[data-test='_query']");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying Query Builder data is Output of Premapscript applied ***", async ()=>{});

    var data = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("test",String(data), "");
    await io.assert.expectToContainValue("Drug @ Name",String(data), "");
    await io.assert.expectToContainValue("Naproxen and Esomeprazole Magnesium",String(data), "");
    await io.assert.expectToContainValue("#Number",String(data), "");
    await io.assert.expectToContainValue("6495195850",String(data), "");
    await io.assert.expectToContainValue("premap",String(data),"");
    await io.assert.expectToContainValue("23",String(data), "");

    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
