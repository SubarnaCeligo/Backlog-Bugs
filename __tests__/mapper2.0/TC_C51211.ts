import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51211 from "@testData/Mapper2.0/TC_C51211.json";

test.describe("TC_C51211 verify when user modifies the parent node source it should not remove the child rows for [object]", () => {
  test("@Env-All @Zephyr-IO-T22381 verify when user modifies the parent node source it should not remove the child rows for [object]", async ({ io, page }) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C51211, 'FLOWS');
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
    test.step("*** Changing the parent resource ***", async () => {});

    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS, 0);
    await page.keyboard.type("$.fNamemn");
    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS, 0);
    await io.homePage.loadingTime();

    test.step("*** Validate the child mappings***", async () => {});
    var data: any[] = ["test", "test1", "test3", "test4"];
    const values = await page
      .locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER)
      .evaluateAll(elements => {
        return elements.map(element => (element as HTMLInputElement).value);
      });
    expect(values).toEqual(data);
  });
});
