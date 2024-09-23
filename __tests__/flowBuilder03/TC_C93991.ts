import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93991 from "@testData/FlowBuilder/C93991.json";

test.describe('C93991 Verify user is able to unset hooks/transform filters/input output filters scripts', () => {
    test('"@Zephyr-IO-T3646 @Env-All C93991 Verify user is able to unset hooks/transform filters/input output filters scripts', async ({ io, page }) => {
        await io.createResourceFromAPI(C93991, "FLOWS");
        await io.homePage.delay(2000);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 1);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 0);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 1);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 0);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        await io.assert.expectToBeFalse(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER), "Drawer is not closed");
    });
});