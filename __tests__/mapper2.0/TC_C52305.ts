
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52305.json";

test.describe("TC_C52305", () => {
  test("@Env-All @Zephyr-IO-T22547 TC_C52305 | Verify the mapping when user has required field(parent node) and it has some non-required children nodes and required children nodes", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on created import ***", async ()=>{});
    await io.homePage.click(
      await selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    let filepath = FTP.pageGenerators[0].qa__export.qa__path;
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

    test.step("*** Expand the Fields ***", async ()=>{});
    await io.homePage.click(
      await selectors.basePagePO.EXPAND_ALL
    );
    await io.homePage.loadingTime();

    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION
    );

    test.step("*** Flter with mapping fields***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Required fields"
    );

    test.step("*** Click on apply button***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await test.step("*** Verifying when user select required fields filter test show required fields ***", async ()=>{});
    var data: any[] = ["cart"];
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


    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
