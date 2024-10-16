import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C52075 from "@testData/Mapper2.0/TC_C52075.json";

test.describe("TC_C52075", () => {
  test("@Env-All @Zephyr-IO-T22539 TC_C52075", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C52075, 'FLOWS');
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
    await fileInput.setInputFiles("testData/assets/" + TC_C52075.pageGenerators[0].qa__export.qa__path);
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

    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION
    );
    await io.homePage.loadingTime();

    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );
    test.step("*** Selected Mapping field ***", async ()=>{});

    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Required fields"
    );
    test.step("*** Selected Required field ***", async ()=>{});

    test.step("*** clicking on Apply button ***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );

    await test.step("*** Validate the mappings tree structure ***", async ()=>{});
    var data: any[] = ["customer", "email", "first_name", "last_name", "test2"];
    let resultsElements = await page.$$(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    let result = true;
    for (let i = 0; i < resultsElements.length; i++) {
      let value = await resultsElements[i].getAttribute("value");
      if (value != data[i]) {
        result = false;
      }
      if (!result) {
        break;
      }
    }
    await io.assert.expectToBeTrue(result, "");

    test.step("*** Navigate to home page***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
