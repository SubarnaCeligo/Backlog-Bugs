
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C51212 from "@testData/Mapper2.0/TC_C51212.json";

test.describe("TC_C51212", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22382 TC_C51212_verify if a new source is added to the [object] field, it should auto include the child destination fields populated from other sources.", async ({io,page}, testInfo) => {
    let flowID = await io.createResourceFromAPI(TC_C51212, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/assets/" + TC_C51212.pageGenerators[0].qa__export.qa__path);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    await io.homePage.loadingTime();
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    test.step("*** Open import mapping***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    await test.step("*** Add a new sources with comma spearated ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING,
      0
    );
    await io.homePage.clickButtonByIndex(
      "[placeholder='Destination field']",
      3
    );
    await page.keyboard.type("test");
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button",
      3
    );
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      7
    );
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input",
      3
    );
    await page.keyboard.type(
      "$.fName,$.mother.fName,$.siblings[*].children[*].fName"
    );
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS,
      3
    );

    await test.step("*** Validate the auto populated child records for new sources with comma seperated***", async ()=>{});

    await test.step("*** Validate the mappings tree structure ***", async ()=>{});
    let data: any[] = [
      "$.fName",
      "$.children[*].firstName",
      "$.siblings[*].fName",
      "$.fName",
      "$.mother.fName",
      "$.siblings[*].children[*].fName",
    ];
    await io.homePage.loadingTime();
    let resultsElements = await page.$$("[role='tree'] " + selectors.flowBuilderPagePO.TAB_LIST + " button");
    let result = true;
    for (let i = 0; i < resultsElements.length - 1; i++) {
      let value = await resultsElements[i].textContent();
      if (value != data[i]) {
        result = false;
      }
      if (!result) {
        break;
      }
    }
    await io.assert.expectToBeTrue(result, "");

    test.step("*** Closing the import mappings***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
