
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/GENERAL/TC_C32615.json'

test.describe("TC_C32615_Verify_the_Column _names", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T5896 TC_C32615_Verify_the_Column _names", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click("//button[@data-test='addDataProcessor']");

    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
    await io.homePage.loadingTime();
    
    await io.assert.verifyElementContainsText('body', 'Import response field');
    await io.assert.verifyElementContainsText('body', 'Source record field');
  });
});