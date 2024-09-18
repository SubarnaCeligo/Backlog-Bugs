
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52309.json";

test.describe("TC_C52309_copy_source_as_is_as_yes_parent_extracts_mapped_fields_filter_is_selected", () => {
  test("@Env-All @Zephyr-IO-T22551 TC_C52309_copy_source_as_is_as_yes_parent_extracts_mapped_fields_filter_is_selected", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await test.step("*** Clicking on field mappings gear icon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      0
    );
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.YES
    );
    
    test.step("*** Clicking on save and close ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Click on the Filter option***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION,
    );

    await io.homePage.clickButtonBasedOnLabelName(
      "ul li label",
      "Mapped fields"
    );
    test.step("*** Selected Mapping field ***", async ()=>{});

    await io.homePage.clickByText(
      "Apply"
    );
    await io.homePage.loadingTime();
    test.step("*** clicking on Apply button ***", async ()=>{});

    await test.step("*** Verifying copy source as-is as yes parent extracts mapped fields filter is selected ***", async ()=>{});
    var ele = await io.homePage.isVisible(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );
    await io.assert.expectToBeTrue(ele, "");

    test.step("*** Navigate to Home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
