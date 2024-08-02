import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C112351 from '@testData/FlowDebugger/C112351.json';

test.describe("C112351", () => {
    test("@Env-All @Zephyr-IO-T14154 C112351", async ({ io, page }) => {
        await io.createResourceFromAPI(C112351, "FLOWS");
        //Disable the flow
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        // await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 0);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click()
        await io.homePage.loadingTime()
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        var rows = await page.$(selectors.flowBuilderPagePO.JOB_ERRORS);
        var text = await rows.textContent();
        await io.assert.expectToContainValue("Success", text, "Error is found");
    });
});