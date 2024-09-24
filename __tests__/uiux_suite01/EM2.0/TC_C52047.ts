import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '@testData/EM2.0/TC_C51661.json';

test.describe("C52047 Verify the Open errors tab, when no results are returned for filter selections in both Current View & New View", () => {
    let id
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowsWithId(id)
    });
    test("@Zephyr-IO-T19828 @Env-All C52047 Verify the Open errors tab, when no results are returned for filter selections in both Current View & New View", async ({io, page}) => {
        id = await io.createResourceFromAPI(C51661,"FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', id);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({state: 'visible',timeout:360000});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_HEADERS);
        const classification = page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_HEADERS).filter({hasText: 'Classification'});
        const source = page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_HEADERS).filter({hasText: 'Source'});
  
        await classification.locator('button').nth(0).click();
        await page.locator(selectors.basePagePO.ARROW_POPPER).getByText('Governance').click();
        await io.flowBuilder.clickByText('Apply');
  
        await source.locator('button').click();
        await page.locator(selectors.basePagePO.ARROW_POPPER).getByText('Mapping', {exact: true}).click();
        await io.flowBuilder.clickByText('Apply');

        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.EM2DOT0PO.NO_FILTER_DATA_FOUND,"You don't have any errors that match the filters you applied.Clear all filters to see any errors for this step.");
  
    });
  });