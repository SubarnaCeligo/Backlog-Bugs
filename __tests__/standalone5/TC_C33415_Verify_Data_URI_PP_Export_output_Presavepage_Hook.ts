
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C33416_Verify_TraceKey_PP_Export_output_Presavepage_Hook.json";
test.describe("TC_C33415_Verify_Data_URI_PP_Export_output_Presavepage_Hook", () => {
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
  test("@Zephyr-IO-T5525 @Env-All TC_C33415_Verify_Data_URI_PP_Export_output_Presavepage_Hook", async ({io,page}, testInfo) => {
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
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SCRIPT);
    await io.homePage.loadingTime();

    test.step("*** Entering the name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.NAME_INPUT, "preSavePage");
    test.step("Selecting preSave in insert function stub ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.FUNCTION_STUB, "preSavePage");
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Script edit ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ADD_SCRIPT, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Entering preSavePage Script ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.myAccountPagePO.LOGS, FTP.Script);

    test.step("*** Clicking on presave save and close butoon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on PP Export button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on Advance Section ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicking on DataURI Template handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Verifying Data URI Input data is Output of PresavePage applied", async ()=>{});
    var data = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("test",data, "");
    await io.assert.expectToContainValue("/api/v2/tickets/1.json",data, "");
    await io.assert.expectToContainValue("1",data, "");
    await io.assert.expectToContainValue("preSavePage",data, "");
    await io.assert.expectToContainValue("23",data, "");
    test.step("*** Clicking on Data URI Teamplate close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
