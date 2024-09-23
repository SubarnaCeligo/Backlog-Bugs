import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51643 from "@testData/EM2.0/C51643.json"

test.describe("C51643 Verify the default view by clicking on the Error count in the (within a flow bubble, flow step drawer, run console, or run history)", () => {
    let errorFlowId
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(errorFlowId)
    });
    test("@Zephyr-IO-T19795 @Env-All C51643 Verify the default view by clicking on the Error count in the (within a flow bubble, flow step drawer, run console, or run history)", async ({io, page}) => {
        errorFlowId = await io.createResourceFromAPI(C51643, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51643', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible', timeout: 360000});
        await io.homePage.reloadPage()
        await io.homePage.loadingTime()
        await io.flowBuilder.clickByTextByIndex("1 error", 1);
        await expect(page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS)).toHaveAttribute('aria-selected', 'true');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_ROWS);
        const errorList = await page.$$(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_ROWS);
        expect(await errorList[0].getAttribute('class')).toContain('Mui-selected');
        await io.assert.verifyElementIsDisplayed(`#editRetry ${selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT}`,'Unable to locate Edit Retry Editor');
        await io.assert.verifyElementDisplayedByText('Error Details', 'Error details not displayed');
    });
});
