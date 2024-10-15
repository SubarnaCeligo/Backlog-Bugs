import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/GENERAL/TC_C32615.json'

test.describe("TC_C32568_Verify_the_Preview _button", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T5855 TC_C32568_Verify_the_Preview _button", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();


    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 0);
    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPT_DATA);
    await page.keyboard.type(`{ "test": "test-value"}`);
    await io.homePage.click(selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_FIRST);
    await page.keyboard.type('test');
    await page.keyboard.press('Tab');
    await io.homePage.click(selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_FIRST);
    await page.keyboard.press('Tab');
    await page.keyboard.type('test');

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.AFE_PREVIEW_PANEL, `{ "test": "test-value"}`);
  });
});
