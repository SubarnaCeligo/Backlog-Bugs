
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51978_C51979_Verify_Setting_Page_Should_Show_Tabs_According_To_Configuration.json";

test.describe("TC_C51978_C51979_Verify_Setting_Page_Should_Show_Tabs_According_To_Configuration", () => {
  test("@Env-All @Zephyr-IO-T22478 @Zephyr-IO-T22479 TC_C51978_C51979_Verify_Setting_Page_Should_Show_Tabs_According_To_Configuration", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

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
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Clicking on import mapping ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Changing the parent resource ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    );
    await io.homePage.loadingTime();

    await test.step("*** Validate the source mappings in settings tab According to Configuration***", async ()=>{});
    var data: any[] = [
      "$.fName",
      "$.father.fName",
      "$.siblings[*].children[*].fName",
      "$.cousins[*].lName",
      "$.mother.fName",
    ];;
    let resultsElements = await page.$$("[id='extractsArrayHelper'] [role='tab']");
    let result = true;
    for (let i = 0; i < resultsElements.length; i++) {
      let value = await resultsElements[i].textContent();
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
