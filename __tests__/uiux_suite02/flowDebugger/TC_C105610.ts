import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C105619 from "@testData/FlowDebugger/C105619.json";

test.describe('C105610 Verify _parent data in post-response hook if one to many is enable', () => {
    test('@Zephyr-IO-T1641 @Env-All C105610 Verify _parent data in post-response hook if one to many is enable', async ({ io, page }) => {
        await io.createResourceFromAPI(C105619, "FLOWS");
        await io.homePage.delay(2000);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.loadingTime();
        const fileChooserPromise = page.waitForEvent("filechooser");
        await io.homePage.clickByText("Choose file");
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("testData/inputData/FlowDebugger/C105610_SampleFile.json");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.importsPage.click(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
        await io.importsPage.click(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.scriptsPO.ADD_SCRIPT);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, "postResponseMap");
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.basePagePO.SCRIPT_FUNCTION_ID, 'postResponseMap');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.flowBuilder.loadingTime();
        await expect(page.locator(selectors.flowBuilderPagePO.AFE_RESULT_PANEL)).not.toContainText('_PARENT:');
    });
});
