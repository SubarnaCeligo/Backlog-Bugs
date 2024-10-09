
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51110.json";

test.describe("TC_C51110", () => {
  test("@Env-All @Zephyr-IO-T22341 TC_C51110 | Verfiy adding the expression as value in source field in multiple sources array data", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    await test.step("*** Validate the mapping fileds are Handlebar expressions ***", async ()=>{});
    var count: any[] = await page.$$(
      "[aria-label='Handlebars expression']"
    );
    var data = await io.homePage.isVisible(
      "[aria-label='Handlebars expression']"
    );
    await io.assert.expectToBeTrue(data, "");
    var countLen = count.length;
    await io.assert.expectToBeValue(String(countLen), "4", "");

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
