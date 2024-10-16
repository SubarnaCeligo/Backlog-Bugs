import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C44447 from "@testData/Mapper2.0/TC_C44447.json";

test.describe("TC_C44447", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T2357 TC_C44447", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    await io.createResourceFromAPI(TC_C44447, 'FLOWS');

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await page.locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input").fill("$.tickets[*]");
    test.step("Added value in Source field.", async ()=>{});

    await page.locator(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input").fill("tickets");
    test.step("Added value in Destination field.", async ()=>{});

    await io.homePage.click(
      "[data-test='refreshExtracts']"
    );
    test.step("Clicked on Refresh field option.", async ()=>{});

    let data = await page.locator(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input").getAttribute("value");
    await io.assert.expectToBeValue(String(data), "tickets", "");

    await test.step("*** Unsaved mapping rows are not deleted test.afterEach clicking on Refresh Field option.***", async ()=>{});
  });
});
