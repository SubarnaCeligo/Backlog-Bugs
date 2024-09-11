
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/Mapper2.0/TC_C51242_Verify_Modification_mapping_setting_Sourcetab_NotAdd_NewRow.json";
import { allure } from "allure-playwright";

test.describe("TC_C51242_Verify_Modification_mapping_setting_Sourcetab_NotAdd_NewRow", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22404 TC_C51242_Verify_Modification_mapping_setting_Sourcetab_NotAdd_NewRow", async ({io,page}, testInfo) => {
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowBuilder.navigateToTheFlow(flowID);
    await io.homePage.loadingTime();

    test.step("*** Clicking on mapping ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    let currentRows = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS)).length;
    test.step("*** Clicking on setting gear ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.SETTINGSICON_1,
      2
    );

    test.step("*** Modfying mapping setting  ***", async ()=>{});
    await io.homePage.click(
      "#sourceField " + selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    );
    await io.homePage.clickButtonByIndex(
      "span[class=childTree-title] div span",
      1
    );

    test.step("*** Saving Mapping ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );

    await io.homePage.loadingTime();
    test.step("*** Validate the new row is not added ***", async ()=>{});
    let newRows = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS)).length;
    await io.assert.expectToBeTrue(currentRows == newRows, "");

    test.step("*** Navigate to homepage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
