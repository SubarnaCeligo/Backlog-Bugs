import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119631 from "@testData/FlowDebugger/C119631.json"

test.describe('C119631', () => {
    test('@Env-All @Zephyr-IO-T19222 C119631', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C119631, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).first().click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.JOB_ERRORS);
        //Togglet button
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PANELICON);
        //List view
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LIST_VIEW_ERRORS);
        const text = await io.homePage.isVisible("text='Actions'")
        await io.assert.expectToBeValue(text.toString(), 'true', "Text is not found")
        //Togglet button
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PANELICON1);
        //split view
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SPLIT_VIEW_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SPLIT_VIEW_ERRORS);
        const text1 = await io.homePage.isVisible("text='Error details'")
        await io.assert.expectToBeValue(text1.toString(), 'true', "Text is not found")
        await io.flowBuilder.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    });
});
