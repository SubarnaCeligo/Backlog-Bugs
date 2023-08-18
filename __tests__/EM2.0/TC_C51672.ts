import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51672 Verify the 'HTTP response' tab in the 'Error details' drawer", () => {
    test.only("C51672 Verify the 'HTTP response' tab in the 'Error details' drawer", async ({io, page}) => {
        const id = await io.fillForm(C51661,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached("text='HTTP response'");
        await io.flowBuilder.click("text='HTTP response'");
        await io.flowBuilder.waitForElementAttached('[data-test="Body"]');
        expect(await io.flowBuilder.isVisible('[data-test="Body"]')).toBe(true);
        expect(await io.flowBuilder.isVisible('[data-test="Headers"]')).toBe(true);
        expect(await io.flowBuilder.isVisible('[data-test="Other"]')).toBe(true);
        expect(await io.flowBuilder.isVisible('text="Add to batch"')).toBe(true);
        expect(await io.flowBuilder.isVisible('text="Resolve & next"')).toBe(true);
        expect(await io.flowBuilder.isVisible('[aria-label="Selected errors are added to a batch, on which you can perform bulk retry and resolve actions."]')).toBe(true);
    });
});