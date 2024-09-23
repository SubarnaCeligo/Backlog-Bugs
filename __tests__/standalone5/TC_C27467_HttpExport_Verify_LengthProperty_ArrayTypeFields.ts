
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Rest from "@testData/STANDALONE/TC_C34940_HTTPExportImport_Verify_AFETogglePresent.json";

test.describe("TC_C27467_HttpExport_Verify_LengthProperty_ArrayTypeFields", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5585 @Env-All TC_C27467 The length property should be shown for array type fields in the filters dropdown field", async ({io,page}, testInfo) => {
      if(process.env["ENVIRONMENT"] == "qaprod") {
        Rest.pageGenerators[0].qa__export.qa__connectionId = Rest.qaprod1_httpcon;
      }
      // *Create Page Generators
      test.step("*** Creating PageGenerator ***", async ()=>{});
      await io.pageGenerator("Allure", Rest);
  
      test.step("***Clicking on the add data proccessor***", async ()=>{});
      await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
  
      test.step("***Clicking on the Filter ***", async ()=>{});
      await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
  
      test.step("***Clicking on the Rule Filter Dropdown ***", async ()=>{});
      await io.homePage.click(selectors.flowBuilderPagePO.RULE_FILTER);
  
      await io.homePage.loadingTime();
  
      test.step("***Verifying the length property should shown for arraytype fields from rule filter ***", () => {});
      io.assert.verifyElementContainsText(selectors.flowBranchingPO.LOGICRULES_CONTAINER, 'record.domain_names.length')
      });
});
