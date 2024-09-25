
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C43219.json";

test.describe("TC_C43219", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Delete Flow Using UI ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("@Env-All @Zephyr-IO-T2411 TC_C43219 | Verify the default description must be empty", async ({io, page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on created import ***", async ()=>{});
    await io.homePage.click(
      await selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    let filepath = TC.pageGenerators[0].qa__export.qa__path;
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets${filepath}`);
    await io.homePage.loadingTime();

    test.step("*** Save and close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Click on add data processor options ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on auto populate fields ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.OPENACTIONSMENU,
      2
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.OPENAI.AUTOCREATE
    );
    await io.homePage.loadingTime();

    let srcNumArray = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS))[0];
    await srcNumArray.click();
    let sourceOption1 = (await page.$$(selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " span"))[4]
    await sourceOption1.click();
    await io.homePage.loadingTime();

    srcNumArray = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS))[1];
    await srcNumArray.click();
    sourceOption1 = (await page.$$(selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " span"))[1]
    await sourceOption1.click();
    await io.homePage.loadingTime();
    
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const flowJson = await io.api.getFlowById(flowID);
    test.step("*** Obtaining importId from flowJson ***", async ()=>{});
    const importId = flowJson.pageProcessors[0]._importId;
    
    const mappings = (await io.api.getImportById(importId)).mappings;
    expect(mappings[0].description).toBeUndefined();
  });
});
