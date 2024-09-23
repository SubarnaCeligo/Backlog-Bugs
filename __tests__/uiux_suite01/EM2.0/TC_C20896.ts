import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C20896 from '@testData/EM2.0/C20896.json';

test.describe("C20896 Verify user can able to toggle notification at flow level", () => {
    let id
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(id)
    });
    test("@Zephyr-IO-T279 @Env-All C20896 Verify user can able to toggle notification at flow level", async ({ io, page }) => {
        id = await io.createResourceFromAPI(C20896, "FLOWS");
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_SETTINGS);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR, "Notify me of flow error not present");
        await io.assert.verifyElementAttributeContainsText(`${selectors.flowBuilderPagePO.NOTIFY_ME_ON_FLOW_ERROR} ${selectors.basePagePO.FALSE} .MuiRadio-root`, 'class', 'Mui-checked');
    });
});