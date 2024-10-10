import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52307.json";

test.describe("TC_C52070", () => {
  test("@Env-All @Zephyr-IO-T22535 TC_C52070", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS,
    );
    await page.keyboard.type("test");
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    );
    await page.keyboard.type("123");
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING
    );

    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION
    );
    await io.homePage.loadingTime();

    const allFields = await page.getByText("All fields").nth(0);
    let isChecked = await allFields.isChecked();
    await io.assert.expectToBeTrue(isChecked, "");

    test.step("*** Flter with mapping fields***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );
    test.step("*** Click on apply button***", async ()=>{});
    await io.homePage.clickByText(
      "Apply"
    );
    await io.homePage.loadingTime();

    await test.step("*** Validate the mappings tree structure ***", async ()=>{});
    var data: any[] = ["test"];
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

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
