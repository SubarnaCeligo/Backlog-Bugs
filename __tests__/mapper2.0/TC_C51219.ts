import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51219 from "@testData/Mapper2.0/TC_C51219.json";

test.describe("TC_C51219", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22386 TC_C51219 | Verify when user type in mapping rows and clicked outside on the mapper screen , then it should create new rows in other sources", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C51219, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.isPageReady();

    test.step("*** Clicking on destination field***", async ()=>{});
    let mapperDestinationField = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(1);
    await mapperDestinationField.focus();
    await mapperDestinationField.dblclick();

    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');

    await page.keyboard.type("something");
    await test.step("*** Entered the text in the destination field***", async ()=>{});

    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input",
      0
    );

    await io.homePage.clickButtonBasedOnLabelName(
      "[role='tree'] " + selectors.flowBuilderPagePO.TAB,
      "$.children[*]"
    );

    await test.step("*** Switching to diffrent sources mapping tab ***", async ()=>{});
    let newField = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(2);

    const value = await newField.getAttribute("value");

    await io.assert.expectToBeValue(String(value), "something", "");

    await test.step("*** Verified the text 'something' is present in the destination in new tab ***", async ()=>{});
  });
});
