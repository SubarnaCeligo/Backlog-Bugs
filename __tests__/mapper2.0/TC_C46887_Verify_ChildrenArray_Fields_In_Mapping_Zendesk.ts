
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import mapper from "@testData/Mapper2.0/TC_C46887_Verify_ChildrenArray_Fields_In_Mapping_Zendesk.json";
import { allure } from "allure-playwright";

test.describe("TC_C46887_Verify_ChildrenArray_Fields_In_Mapping_Zendesk", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T18007 TC_C46887_Verify_ChildrenArray_Fields_In_Mapping_Zendesk", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(mapper, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/assets/" + mapper.pageGenerators[0].qa__export.qa__path);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Navigatting to import mappings ***", async ()=>{});
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.flowBuilder.loadingTime();

    test.step("*** Changing to mapper 2.0 ***", async ()=>{});
    let mapperSourceField = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS))[0];
    await mapperSourceField.focus();
    await mapperSourceField.dblclick();
    await page.keyboard.type("children");
    await io.homePage.delay(2 * 1000);

    test.step("*** Validating child data and no case sensitive for mapping fileds ***", async ()=>{});
    var data: any[] = [
    "$",
    "books",
    "fName",
    "snaks",
    "dinner",
    "lunch",
    "children",
    "firstName",
    "siblings",
    "cousins",
  ];
    let resultsElements = await page.$$("[role='tree'] " + selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " > div > span");
    let result = true;
    for (let i = 0; i < resultsElements.length; i++) {
      let value = await resultsElements[i].textContent();
      if (!data.includes(value)) {
        result = false;
      }
      if (!result) {
        break;
      }
    }
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Clsoing the mappings ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
