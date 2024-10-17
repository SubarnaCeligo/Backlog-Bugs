
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C29270.json";

test.describe("TC_C29270", () => {
  let flowID;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowID]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Zephyr-IO-T1894 @Env-All TC_C29270", async ({io,page}, testInfo) => {
    // *Create Page Generators
    test.step("*** Creating flow ***", async ()=>{});
    flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.ZOOM_OUT);
    await io.homePage.click(selectors.flowBuilderPagePO.ZOOM_OUT);
    await io.homePage.click(selectors.flowBuilderPagePO.ZOOM_OUT);
    await io.homePage.click(selectors.flowBuilderPagePO.ZOOM_OUT);
    await io.homePage.loadingTime();

    test.step("*** Clcik on created import ***", async ()=>{});
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 0);
    await io.homePage.loadingTime();

    test.step("*** Click on the setting gear icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS);
    await io.homePage.loadingTime();

    test.step("*** Click on the mapping type ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
    await io.homePage.loadingTime();

    test.step("*** Click on the look up ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "Lookup");
    await io.homePage.loadingTime();

    test.step("*** Click on the dynamic look up ***", async ()=>{});
    await io.homePage.click("[data-test='dynamic'] button");
    await io.homePage.loadingTime();

    test.step("*** Click on the look up name help icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUPHELPTEXT);
    test.step("*** Validate the text in the help icon ***", async ()=>{});
    let namehelptext = await io.homePage.getText(selectors.flowBuilderPagePO.HELP_BUBBLE);
    await expect(namehelptext).toContain("Enter a descriptive and unique name to identify this lookup for future use.");
    test.step("*** Close the import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.loadingTime();
    test.step("*** Clcik on created import ***", async ()=>{});
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 1);
    await io.homePage.loadingTime();

    test.step("*** Click on the setting gear icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS);
    await io.homePage.loadingTime();

    test.step("*** Click on the dynamic look up ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.LOOKUP);
    await io.homePage.loadingTime();

    await io.homePage.click("[data-test='dynamic'] button");
    await io.homePage.loadingTime();
    test.step("*** Click on the look up name help icon ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUPHELPTEXT);
    test.step("*** Validate the text in the help icon ***", async ()=>{});
    
    namehelptext = await io.homePage.getText(selectors.flowBuilderPagePO.HELP_BUBBLE);
    await expect(namehelptext).toContain("Enter a unique name so that you can identify this lookup later.");
    test.step("*** Close the import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.loadingTime();
    test.step("*** Clcik on created import ***", async ()=>{});
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 2);
    await io.homePage.loadingTime();

    test.step("*** Click on the setting gear icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS);

    await io.homePage.loadingTime();

    test.step("*** Click on the mapping type ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
    await io.homePage.loadingTime();

    test.step("*** Click on the look up ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "Lookup");
    await io.homePage.loadingTime();

    test.step("*** Click on the dynamic look up ***", async ()=>{});
    await io.homePage.click("[data-test='dynamic'] button");

    test.step("*** Click on the look up name help icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUPHELPTEXT);

    test.step("*** Validate the text in the help icon ***", async ()=>{});
    namehelptext = await io.homePage.getText(selectors.flowBuilderPagePO.HELP_BUBBLE);
    await expect(namehelptext).toContain("Enter a descriptive and unique name to identify this lookup for future use.");
    test.step("*** Close the import mappings ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.loadingTime();
    test.step("*** Clcik on created import ***", async ()=>{});
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 3);
    await io.homePage.loadingTime();

    test.step("*** Click on the setting gear icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS);
    await io.homePage.loadingTime();

    test.step("*** Click on the dynamic look up ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.LOOKUP);
    await io.homePage.loadingTime();

    await io.homePage.click("[data-test='dynamic'] button");

    test.step("*** Click on the look up name help icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUPHELPTEXT);
    test.step("*** Validate the text in the help icon ***", async ()=>{});

    namehelptext = await io.homePage.getText(selectors.flowBuilderPagePO.HELP_BUBBLE);
    await expect(namehelptext).toContain("Enter a unique name so that you can identify this lookup later.");
    test.step("*** Close the import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
