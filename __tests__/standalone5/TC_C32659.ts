import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/GENERAL/TC_C32615.json'

test.describe("TC_C32659_Verify_the_Preview _button", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Env-All @Zephyr-IO-T5863 @Zephyr-IO-T5856 @Zephyr-IO-T5866 C32614 C32569 C32659 TC_C32659_Verify_the_Preview _button", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
    await io.homePage.loadingTime();


    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    test.step("*** Clicking on Preview Buttonl***", async ()=>{});


    var input3 = await io.homePage.isVisible(selectors.flowBuilderPagePO.PREVIEW);
    await io.assert.expectToBeTrue(input3,"")
    test.step("*** Verified the Preview button for  lookup mapping    ***", async ()=>{});
    var input4 = await page.$$(selectors.flowBuilderPagePO.INPUT);
    var isVis1=await input4[1].isVisible();
    await io.assert.expectToBeTrue(isVis1,"")
    test.step("*** Verified the Input panel in the Lookup mapping ***", async ()=>{});
    var input8 = await page.$$(selectors.flowBuilderPagePO.INPUT);
    var isVis2=await input8[2].isVisible();
    await io.assert.expectToBeTrue(isVis2,"")

    //C32614
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.AFE_PREVIEW_PANEL, `"record": {`);
    
    //C32569
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SCRIPT_DATA, `{ "test-key": "test-value"}`);
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA, "test-key");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.SCRIPT_DATA, "test-value");

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();

    //C32659
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.AFE_PREVIEW_PANEL, `record": {`);
  });
});
