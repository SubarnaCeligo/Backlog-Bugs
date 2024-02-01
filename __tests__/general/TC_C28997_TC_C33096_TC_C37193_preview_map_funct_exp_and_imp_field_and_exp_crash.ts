
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C28997_TC_C33096_TC_C37193_preview_map_funct_exp_and_imp_field_and_exp_crash.json";

test.describe("TC_C28997_TC_C33096_TC_C37193", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigate to Home Page ***",()=>{});
  });
  test("TC_C28997_TC_C33096_TC_C37193", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);


    var id = await io.api.getFlowId(FTP.name);

    await io.flowBuilder.navigateToTheFlow( id);
    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.isPageLoaded();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C28997_TC_C33096_TC_C37193_exp");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageLoaded();

    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.isPageReady();

    var checkBox = await(await page.locator(selectors.flowBuilderPagePO.AUTO_PREVIEW + " input")
    ).getAttribute("value");
    if(checkBox == "true")
      await io.homePage.click(selectors.flowBuilderPagePO.AUTO_PREVIEW);

    var checkBox1 = await(await page.locator(selectors.flowBuilderPagePO.AUTO_PREVIEW + " input")
    ).getAttribute("value");

    await io.assert.expectToBeValue(checkBox1, "false", "");

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);

    await io.homePage.isPageLoaded();

    var input_val = await io.assert.isTextMatched(selectors.importPagePO.INPUT_OF_MAPPING, '  "a": 1');
    await io.assert.expectToBeTrue(input_val, "");
    var output_val = await io.assert.isTextMatched(selectors.importPagePO.OUTPUT_OF_MAPPING, '    "firstname": 1');
    await io.assert.expectToBeTrue(output_val, "");

    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.LOOKUP);
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP);
    await io.homePage.isPageLoaded();

    var loc = await io.homePage.getText(selectors.importPagePO.STATIC_LOOKUP_HEADING_EXP)
    var loc1 = await io.homePage.getText( selectors.importPagePO.STATIC_LOOKUP_HEADING_IMP)
    await io.assert.expectToBeValueInArray(loc, "Export field value", "");
    await io.assert.expectToBeValueInArray(loc1, "Import field value", "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
