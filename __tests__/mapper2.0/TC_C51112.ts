import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51112.json";

test.describe("TC_C51112", () => {
  test("@Env-All @Zephyr-IO-T22343 TC_C51112", async ({io,page}, testInfo) => {
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
      "[aria-label='Hard-coded']"
    );
    var data = await io.homePage.isVisible(
      "[aria-label='Hard-coded']"
    );
    await io.assert.expectToBeTrue(data, "");
    var countLen = count.length;
    await io.assert.expectToBeValue(String(countLen), "3", "");

    test.step("*** Navigate to home ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
