import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51117_Verify_User_able_See_SourceRecord_Field_On_Setting_Standard_mapping.json";

test.describe("TC_C51117_Verify_User_able_See_SourceRecord_Field_On_Setting_Standard_mapping", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22348 TC_C51117_Verify_User_able_See_SourceRecord_Field_On_Setting_Standard_mapping", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Clicking on setting gear ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      0
    );
    await io.homePage.loadingTime();

    await test.step("*** Validating Source Field is displayed in setting ***", async ()=>{});
    let ele = await io.homePage.isVisible(
      selectors.mappings.MAPPER2DOT0PO.SOURCE_FIELD + " " + selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
    );
    await io.assert.expectToBeTrue(ele, "");

    test.step("*** Navigate to homepage ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
