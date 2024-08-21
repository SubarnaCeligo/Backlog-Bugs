import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T24908 from "../../testData/inputData/FlowDebugger/T24908.json";

test.describe('T24908 Verify For Test runs, lightning bolt icon should be shown on the selected source always (before, after and during test runs).', () => {
    let id;
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test('"@Zephyr-IO-T24908 @Env-All T24908 Verify For Test runs, lightning bolt icon should be shown on the selected source always (before, after and during test runs).', async ({ io, page }) => {
        id = await io.createResourceFromAPI(T24908, "FLOWS");
        await io.homePage.delay(2000);
        await io.flowBuilder.click(
            selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
          );
        const source2 = await page.locator(selectors.flowBuilderPagePO.SOURCE_DROPDOWN_LIST_ITEM);
        await source2.nth(1).click();
        await io.flowBuilder.waitForElementAttached('[aria-label="active source"]');
        io.assert.expectToBeTrue(await io.flowBuilder.isVisible('[aria-label="active source"]'), "Active source is not shown");
    });
});
