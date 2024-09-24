
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C44400.json";
import { allure } from "allure-playwright";

test.describe("TC_C44400 ", () => {
  let flowId: string;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io, page}) => {
    test.step("*** Delete Flow Using UI ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2417 TC_C44400", async ({io, page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    // TC_C44400 | Verify the data type should be shown for every field mapping as per the configuration
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    let res = await io.mappings2dot0.verifyDataType2dot0(allure);
    await io.assert.expectToBeTrue(res, "");
    test.step("** Verified All Fields Having Data Types **", async ()=>{});
  });
});
