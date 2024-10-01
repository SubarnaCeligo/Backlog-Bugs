import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C52130_C52132.json";

test.describe("TC_C52130_C52132", () => {
  test("@Env-All @Zephyr-IO-T22493 @Zephyr-IO-T22495 TC_C52130_C52132 | Verify if source record field is an handlebar expression, the data type should be String and user cannot change it", async ({io,page}, testInfo) => {
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
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await test.step("*** Validating Handlebar value in the source record field data type can't changed ***", async ()=>{});
    let Handlebardata = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button"
    );
    var ele = await Handlebardata[1].isEnabled();
    expect(ele).toBeFalsy();
    await io.homePage.loadingTime();

    await test.step("*** Validating multiple sources are provided in source field then data type is truncated ***", async ()=>{});
    let datatype = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button"
    );
    var text = await datatype[0].textContent();
    await io.assert.expectToContainValue("[object],object,object", text, "");
  });
});
