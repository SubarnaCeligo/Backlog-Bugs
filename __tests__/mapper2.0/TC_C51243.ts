import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51243.json";

test.describe("TC_C51243", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22405 TC_C51243 | verify the add multiple object array mappings and try to add new rows in the source tabs in each of the mapping.", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
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
    const filepath = "/FTP_uploads/TC_C51221.json";
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

    await io.homePage.clickButtonBasedOnLabelName(
      "[role='tree'] " + selectors.flowBuilderPagePO.TAB,
      "$.siblings[*].children[*]"
    );

    test.step("*** Add new row mapping ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING,
      4
    );
    let mapperDestinationField = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(5);
    await mapperDestinationField.focus();
    await mapperDestinationField.dblclick();
    await page.keyboard.type("test1");

    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING,
      5
    );

    mapperDestinationField = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(6);
    await mapperDestinationField.focus();
    await mapperDestinationField.dblclick();
    await page.keyboard.type("test2");

    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING,
      6
    );

    mapperDestinationField = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(7);
    await mapperDestinationField.focus();
    await mapperDestinationField.dblclick();
    await page.keyboard.type("test3");

    test.step("*** Click on Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );

    await io.homePage.clickButtonBasedOnLabelName(
      "[role='tree'] " + selectors.flowBuilderPagePO.TAB,
      "$.children[*]"
    );

    await test.step("*** Validating should not create a new row in the remaining sources which already has the same destination field ***", async ()=>{});
    const destinationFields = await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    );
    await io.assert.expectToBeValue(String(destinationFields.length), "10", "");

    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("*** Click On Save and close ***", async ()=>{});

    test.step("*** Navigating to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
