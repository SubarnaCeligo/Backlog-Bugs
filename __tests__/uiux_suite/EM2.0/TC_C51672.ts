import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51672 from '../../../testData/EM2.0/C51672.json';

test.describe("C51672 Verify the 'HTTP response' tab in the 'Error details' drawer", () => {
    test("C51672 Verify the 'HTTP response' tab in the 'Error details' drawer", async ({io, page}) => {
        const id = await io.fillFormUI(C51672,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await io.flowBuilder.waitForElementAttached("text='HTTP response'");
        await io.flowBuilder.click("text='HTTP response'");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.BODY);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.BODY)).toBe(true);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.HEADERS)).toBe(true);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.OTHER)).toBe(true);
        expect(await io.flowBuilder.isVisible('text="Add to batch"')).toBe(true);
        expect(await io.flowBuilder.isVisible('text="Resolve & next"')).toBe(true);
        expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.ADD_TO_BATCH_HOVER_LABEL)).toBe(true);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2dot0PO.BODY, "Body not being displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2dot0PO.HEADERS, "Headers not being displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2dot0PO.OTHER, "Other not being displayed");
        await io.assert.verifyElementDisplayedByText('Add to batch', "Add to batch not being displayed");
        await io.assert.verifyElementDisplayedByText('Resolve & next', "Resolve & next not being displayed");
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2dot0PO.ADD_TO_BATCH_HOVER_LABEL, "Add to batch hovel label no being displayed");
    });
});