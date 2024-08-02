import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C61343 from '@testData/Imports/TC_C61343.json';

test.describe("C61343 Verify Preview Error is automatically redirecting to Parsed", () => {
    test("@Env-All @Zephyr-IO-T15738 C61343 Verify Preview Error is automatically redirecting to Parsed", async ({io, page}) => {
        const id = await io.createResourceFromAPI(C61343,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C61343', id);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.HTTP_REQUEST);
        expect(await page.locator(selectors.importPagePO.HTTP_REQUEST).getAttribute('aria-pressed')).toBe('true');
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.HTTP_REQUEST);
        expect(await page.locator(selectors.importPagePO.PARSED_OUTPUT).getAttribute('aria-pressed')).toBe('true');
    });
});