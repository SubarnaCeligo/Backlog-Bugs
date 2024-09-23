import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_51223.json";

test.describe("TC_C51223", () => {
  test.beforeEach(async ({io, page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22390 TC_C51223", async ({io, page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Adding a destination field value***", async ()=>{});
    let mapperDestinationField = (await page.$$(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER))[1];
    await mapperDestinationField.focus();
    await mapperDestinationField.dblclick();
    await page.keyboard.type("Destination 1");
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, 0);
    await io.homePage.delay(2000);

    test.step("*** Clicking on second tab ***", async ()=>{});
    await io.homePage.clickByIndex("[role='tree'] [role='tab']", 1);
    await io.homePage.loadingTime();

    test.step("*** Closing the mapping window ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Reopening the mapping window ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();

    await test.step("*** Verifying the earlier entered data in the first source field ***", async ()=>{});
    const dest1 = await ((await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    ))[1]).getAttribute("value");
    await io.assert.expectToBeValue(String(dest1), "Destination 1", "");

    test.step("*** Clicking on second tab ***", async ()=>{});
    await io.homePage.clickByIndex("[role='tree'] [role='tab']", 1);

    await test.step("*** Verifying the earlier entered data in the second source field ***", async ()=>{});
    const dest2 = await ((await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    ))[1]).getAttribute("value");

    await test.step("*** Verifying that the earlier entered draft fields are visible in the UI for the user ***", async ()=>{});
    await io.assert.expectToBeValue(String(dest2), "Destination 1", "");
  });
});
