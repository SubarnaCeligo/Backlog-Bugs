
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/Mapper2.0/TC_C51168_Verify_Preview_Source_Field_SetOn_Mapping_Setting.json";
import { allure } from "allure-playwright";

test.describe("TC_C51168_Verify_Preview_Source_Field_SetOn_Mapping_Setting", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22370 TC_C51168_Verify_Preview_Source_Field_SetOn_Mapping_Setting", async ({io,page}, testInfo) => {
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on mapping ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    test.step("*** Add the destination fields***", async ()=>{});
    await io.homePage.doubleClick(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );
    await page.keyboard.type("Name");
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    );

    test.step("*** Clicking on setting gear ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.SETTINGSICON_1
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
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE,
      1
    );

    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );

    var result = await io.homePage.copyResourceData(
      selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT
    );

    await io.assert.expectToContainValue("Name", result, "");
    await io.assert.expectToContainValue("4501132231", result, "");

    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );

    test.step("*** Navigate to homepage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
