import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T18956 from "@testData/FlowDebugger/T18956.json";


test.describe("@ZephyrIO-T18956", () => {
    test("@ZephyrIO-T18956 @Env-All Response Mapping Showing different headers with Mock response and without mock response.", async ({io, page}) => {

        //Create a flow and check response mapping headers
        await io.createResourceFromAPI(T18956, 'FLOWS');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DATA_PROCESSOR);
        await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
        await io.assert.verifyElementContainsText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "headers");
        await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER );

        //Open export and remove mock response
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.IMPORT,0);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MOCKRESPONSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKRESPONSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCKRES1);
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Meta+A');
        await page.keyboard.press('Backspace');
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();

        //Open response mappings and verify headers again
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DATA_PROCESSOR,0);
        await io.flowBuilder.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
        await io.assert.verifyElementContainsText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "headers");
        await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER );

    });
  });