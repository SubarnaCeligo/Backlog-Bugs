
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51237.json";

test.describe("TC_C51237", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22400 TC_C51237 | verify when user has 5 sources with comma separated value and if all the sources are removed and a 2 new source were added", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mapping ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Mapping Page open ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      0
    );
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      2
    );
    await page.locator(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER).nth(2).fill("$.mother,$.father");

    await test.step("*** Removed old source and added new source ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    const source1 = await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input").nth(1).getAttribute("value");
    const dest1 = await page.locator(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input").nth(1).getAttribute("value");
    await io.assert.expectToBeValue(String(dest1), "child", "");
    await io.assert.expectToBeValue(String(source1), "$.children.firstName", "");

    await io.homePage.clickButtonBasedOnLabelName("[role='tree'] [role='tab']", "$.father");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const source2 = await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input").nth(1).getAttribute("value");
    const dest2 = await page.locator(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input").nth(1).getAttribute("value");
    await io.assert.expectToBeValue(String(dest2), "child", "");
    await io.assert.expectToBeValue(String(source2), "", "");

    await test.step("*** Verifed in the new sources only first source retains its value and second source has only destination ***", async ()=>{});
  });
});
