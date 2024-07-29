import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C115343 from "@testData/FlowDebugger/C115343.json"
import playload from "@testData/profile/updatePreference.json"

test.describe('C115343', () => {
    test.beforeEach(async ({ io }) => {
        //Set relative timestamp to true
        playload.showRelativeDateTime = true;
        const resp = await io.api.putCall('v1/preferences',playload);
    });
    test('@Env-All @Zephyr-IO-T14401 C115343 Verify [UX] Test run debug log page not showing properly aligned', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C115343, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TEST_RUN_DEBUG_LOGS);
        await io.flowBuilder.delay(1000);
        expect(await page.screenshot()).toMatchSnapshot("Debug-log-PLAYWRIGHT.png",{maxDiffPixelRatio: 0.2 });
    });
});
