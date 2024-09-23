import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C56827 from '../../../testData/inputData/Flows/C56827.json';

test.describe("C56827 Verify purge all logs of the script option is disabled when there are no logs or when logs are deleted", () => {
    test("@Env-All @Zephyr-IO-T14584 C56827 Verify purge all logs of the script option is disabled when there are no logs or when logs are deleted", async ({io, page}) => {
        const id = await io.createResourceFromAPI(C56827, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPTS);
        await io.flowBuilder.click(`.MuiTableBody-root tr ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_EXECUTION_LOGS);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.REFRESH_RESOURCE, 0);
        await io.flowBuilder.clickByText('Apply');
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.RUN_FLOW, 0);
        const lastRun = page.getByText('Last run');
        await lastRun.waitFor({state: 'visible', timeout: 180000});
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.REFRESH_RESOURCE, 1);
        await io.flowBuilder.waitForElementAttached(`${selectors.basePagePO.MUI_TABLE_BODY_ROOT} tr`);
        let executionLogRows = await page.locator(`${selectors.basePagePO.MUI_TABLE_BODY_ROOT} tr`).all();
        expect(executionLogRows.length).toBeGreaterThanOrEqual(1);
        await io.flowBuilder.clickByText('More');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PURGE_SCRIPT_LOGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PURGE_ALL_LOGS);
        await io.assert.verifyElementIsDisplayed(selectors.flowGroupingPagePO.ALERT_MESSAGE, 'Purge log sucess notification not displayed');
        await io.assert.verifyElementText(selectors.flowGroupingPagePO.ALERT_MESSAGE, 'All logs of this script successfully purged.');
        executionLogRows = await page.locator(`${selectors.basePagePO.MUI_TABLE_BODY_ROOT} tr`).all();
        await io.assert.expectToBeValue('0', (executionLogRows.length).toString(), 'All Logs not purged');
    });
  });
