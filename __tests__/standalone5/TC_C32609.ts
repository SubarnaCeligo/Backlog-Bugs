
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/GENERAL/TC_C32609.json'
// work done

test.describe("TC_C32609_Verify_the_column_name", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T5862 TC_C32609_Verify_the_column_name", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.click("[data-test='Mapper 1.0']");
    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText('body', 'Source record field');
    await io.assert.verifyElementContainsText('body', 'Destination record field');
  });
});
