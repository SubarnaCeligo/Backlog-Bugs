
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51120.json";

test.describe("TC_C51120", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22351 TC_C51120 | Verify source record field should be added to setting page when user selects Copying the source record field as-is to create the destination object or object array", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on created import ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      await selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    var filepath = "/FTP_uploads/TC_C51221.json";
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

    await test.step("*** Clicking on field mappings gear icon ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      0
    );

    await test.step("*** Change the destination type as Object ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DATATYPE
    );
    await io.homePage.click(
      "[data-value='object']"
    );
    
    await test.step("*** Choose Yes as copy an object from source ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.YES
    );

    await test.step("*** Validate the source field is present for Object destination type ***", async ()=>{});
    await io.homePage.loadingTime();
    var fieldStatus_Object = await io.homePage.isVisible(
      "#sourceField"
    );
    await io.assert.expectToBeTrue(fieldStatus_Object, "");

    test.step("*** Navigating to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
