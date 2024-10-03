
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/STANDALONE/TC_C28992.json";

test.describe("TC_C28992", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T1907 @Env-All TC_C28992", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    test.step("*** Clicking on import mapping ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mapping settings***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on the Mapper lookup ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.LOOKUP);
    await io.homePage.isPageReady();

    test.step("*** Clicking on lookup name help text icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUPHELPTEXT);
    
    const lookuphelptext = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    await io.assert.expectToBeValue(String(lookuphelptext), "Enter a unique name so that you can identify this lookup later.Was this helpful?", "");
    test.step("*** Verified the  help text is as expected for Lookup ***", async ()=>{});

    test.step("*** Choosing default lookup ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.DEFAULTLOOKUP);
   
    await io.homePage.click( selectors.flowBuilderPagePO.LOOKUPDEFAULTHELPTEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    var lookupdefaulthelptext = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT)
    await io.assert.expectToContainValue("This holds the default value to be set for the extract field.Was this helpful?", String(lookupdefaulthelptext),"");
    test.step("*** Verified the  help text is as expected for Lookup ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page", async ()=>{});
  });
});
