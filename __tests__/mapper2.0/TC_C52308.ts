
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C52308 from "@testData/Mapper2.0/TC_C52308.json";

test.describe("TC_C52308", () => {
  test("@Env-All @Zephyr-IO-T22550 TC_C52308 | Verify mapped fields when 'Copy source as-is' applied for object data type", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C52308, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on created import ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      await selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    var filepath = TC_C52308.pageGenerators[0].qa__export.qa__path;
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets${filepath}`);
    await io.homePage.loadingTime();

    test.step("*** Save and close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the settings option***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      1
    );
    await io.homePage.loadingTime();

    await test.step("*** Validate the option Copy an object array from the source as-is is Yes***", async ()=>{});
    let ele = await page.locator(selectors.mappings.MAPPER2DOT0PO.YES + " [value='yes']");
    let result = await ele.isChecked();
    await io.assert.expectToBeTrue(result, "");

    test.step("*** Close the import mapping ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER, 2);
    await io.homePage.loadingTime();

    await test.step("*** Validate the mappings test.beforeEach the filter ***", async ()=>{});
    var data: any[] = ["test", "test1", "test3"];
    await test.step("*** Validate the mappings tree structure ***", async ()=>{});
    var data: any[] = ["test", "test1", "test3"];
    let resultsElements = await page.$$(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input",);
    resultsElements = resultsElements.slice(1, resultsElements.length);
    result = true;
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

    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION,
    );

    test.step("*** Flter with mapping fields***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );

    test.step("*** clicking on Apply button ***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );

    await io.homePage.loadingTime();

    await test.step("*** Validate the mappings tree structure ***", async ()=>{});
    data = ["test", "test3"];
    resultsElements = await page.$$(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input",);
    resultsElements = resultsElements.slice(1, resultsElements.length);
    result = true;
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

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
