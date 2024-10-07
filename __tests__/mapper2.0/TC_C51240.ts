
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51240 from "@testData/Mapper2.0/TC_C51240.json";

test.describe("TC_C51240", () => {
  test("@Env-All @Zephyr-IO-T22403 TC_C51240 | verify if user modify a row in source tab and refresh the page", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C51240, 'FLOWS');
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
    const filepath = TC_C51240.pageGenerators[0].qa__export.qa__path;
    await fileInput.setInputFiles("testData/assets/" + filepath);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Edit the source mappings***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS,
      0
    );
    // await page.keyboard.type("Control+A");
    // await page.keyboard.type("Delete");
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');

    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS,
      0
    );
    test.step("*** Refresh the Page***", async ()=>{});
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    await test.step("*** Validate the mappings tree structure ***", async ()=>{});
    var data: any[] = ["test", "test1", "test2", "test4", "test5"];
    let resultsElements = await page.$$(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    let result = true;
    for (let i = 0; i < resultsElements.length - 1; i++) {
      let value = await resultsElements[i].getAttribute("value");
      if (value != data[i]) {
        result = false;
      }
      if (!result) {
        break;
      }
    }
    await io.assert.expectToBeTrue(result, "");

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
