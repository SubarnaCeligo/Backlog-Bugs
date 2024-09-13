import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C52756_C52764.json";
import { Validations } from "@celigo/aut-validations";


test.describe("TC_C52756_C52764", () => {
  let flowID;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io }) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowID]);
  });
  test("TC_C52756_C52764 @Zephyr-IO-T22563 @Zephyr-IO-T22566 @Env-All", async ({ io, page }, testInfo) => {
    test.step("*** Creating Flow via API ***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);

    flowID = flows.get(TC.name).flowId;
    await io.flowBuilder.navigateToTheFlow( flowID);

    test.step("*** Clicking on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/assets/FTP_uploads/TC_C52753.json");
    await io.homePage.loadingTime();


    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.INPUT_FILTER);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();

    test.step("*** Click on search button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SEARCH);

    test.step("*** Entering the search value ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.integrationPagePO.HOME_SEARCH, "test");

    await io.homePage.loadingTime();
    test.step("*** Validate the mappings test.afterEach the search ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "value", "test", 0);
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "value", "test1", 1);

    test.step("*** Click on the preview ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Validate the outpu data test.afterEach applying search ***", async ()=>{});
    var Inputdata: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    Inputdata = Inputdata.replace(/[\r\n ]+/g, "");
    console.log(Inputdata);
    let Validation1 = new Validations();
    var response1 = await Validation1.validateJSONData(TC.ExpectedData, JSON.parse(Inputdata)
    );
    await io.assert.expectToContainValue("passed",response1["overallStatus"], "");

    test.step("*** Click on close search ***", async ()=>{});
    await io.homePage.click('[aria-label="Close search"]');
    await io.homePage.loadingTime();
    
    test.step("*** Validate the mapping fields ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "value", "test", 0);
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "value", "test1", 1);
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "value", "auto", 2);
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "value", "auto2", 3);
    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigating to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
