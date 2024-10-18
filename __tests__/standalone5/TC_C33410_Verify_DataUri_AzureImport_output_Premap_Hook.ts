
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Azure from "@testData/STANDALONE/TC_C33410_Verify_DataUri_AzureImport_output_Premap_Hook.json";
test.describe("TC_C33410_Verify_DataUri_AzureImport_output_Premap_Hook", () => {
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
  test("@Env-All @Zephyr-IO-T5560 TC_C33410_Verify_DataUri_AzureImport_output_Premap_Hook", async ({io,page}, testInfo) => {
    flowID = await io.createResourceFromAPI(Azure, 'FLOWS');
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

    test.step("Selecting preMap in insert function stub ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.FUNCTION_STUB, "preMap");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Script edit ***", async ()=>{});
    await io.homePage.clickButtonByIndex( selectors.flowGroupingPagePO.PREMAPCREATESCRIPT, 1);
    await io.homePage.loadingTime();

    test.step("*** Entering premap Script ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.myAccountPagePO.LOGS, Azure.Script);
    test.step("*** Clicking on premap save and close butoon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Azure Import button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.importPagePO.IMPORT_TRANSFER, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Advanced dropdown ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.RELATIVEURL, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying Filename Input data is Output of Premapscript applied", async ()=>{});
    var data = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("test",data, "");
    await io.assert.expectToContainValue("Drug @ Name",data, "");
    await io.assert.expectToContainValue("Naproxen and Esomeprazole Magnesium",data, "");
    await io.assert.expectToContainValue("#Number",data, "");
    await io.assert.expectToContainValue("6495195850",data, "");
    await io.assert.expectToContainValue("premap",data, "");
    await io.assert.expectToContainValue("23",data, "");
    test.step("*** Clicking on Filename Handlebar close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
