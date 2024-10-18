
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
  test("@Env-All @Zephyr-IO-T5862 @Zephyr-IO-T5848 @@Zephyr-IO-T5847 C32434 C32433 C32609 Verify the column name for Import mappings, vefiy auto preview button default state", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText('body', 'Source record field');
    await io.assert.verifyElementContainsText('body', 'Destination record field');

    // C32433
    await io.assert.checkElementState(selectors.flowBuilderPagePO.AUTO_PREVIEW,"isDisabled")
  });
});
