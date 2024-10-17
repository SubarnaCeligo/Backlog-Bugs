import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C45692 from "@testData/Mapper2.0/TC_C45692.json";

test.describe("TC_C45692", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T2356 TC_C45692", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C45692, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/assets/" + TC_C45692.pageGenerators[0].qa__export.qa__path);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Click on the import mappings***", async ()=>{});

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(
      selectors.flowBuilderPagePO.AUTO_PREVIEW
    );
    await io.homePage.loadingTime();

    test.step("Clicked on Auto preview on mapper2.0 page.", async ()=>{});
    var result = await io.homePage.copyResourceData(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT
    );
    let data = result.replace(/[\r\n ]+/g, "").toString();

    await test.step('Handle expression result value :"VanillaScent" set to options[*].name', async ()=>{});
    await io.assert.expectToContainValue('"url":"https://www.celigo.com/"',data, "");

    await test.step('Hardcoded value:"https://www.celigo.com/" set to options[*].images[*].url', async ()=>{});
    await io.assert.expectToContainValue('"value":"Aristole"',data, "");

    await test.step('Static lookup result value : "Aristole" set to options[*].variations[*].value', async ()=>{});
  });
});
