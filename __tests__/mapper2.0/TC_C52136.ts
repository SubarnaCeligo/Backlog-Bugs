
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C52136.json";

test.describe("TC_C52136", () => {
  test("@Env-All @Zephyr-IO-T22499 TC_C52136", async ({io,page}, testInfo) => {
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
    await fileInput.setInputFiles("testData/assets/" + TC.pageGenerators[0].qa__export.qa__path);
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

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Clicking on source field data type ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button",
      1
    );

    await test.step("*** Validating data type dropdown is be displayed String array ***", async ()=>{});
    // var ele = await io.homePage.isVisible(
    //   selectors.mappings.MAPPER2DOT0PO.DATATYPESLISTITEM + " li"
    // );
    let ele = await (await page.locator(selectors.mappings.MAPPER2DOT0PO.DATATYPES)).nth(4).isVisible();
    await io.assert.expectToBeTrue(ele, "");

    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();

    test.step("*** Clicking on source field data type ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button",
      2
    );

    await test.step("*** Validating data type dropdown is be displayed Number array ***", async ()=>{});
    var ele1 = await (await page.locator(selectors.mappings.MAPPER2DOT0PO.DATATYPES)).nth(5).isVisible();
    await io.assert.expectToBeTrue(ele1, "");

    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );

    await io.homePage.loadingTime();

    test.step("*** Clicking on source field data type ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button",
      3
    );

    await test.step("*** Validating data type dropdown is be displayed Boolean array ***", async ()=>{});
    var ele2 = await (await page.locator(selectors.mappings.MAPPER2DOT0PO.DATATYPES)).nth(6).isVisible();
    await io.assert.expectToBeTrue(ele2, "");

    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );

    await io.homePage.loadingTime();
  });
});
