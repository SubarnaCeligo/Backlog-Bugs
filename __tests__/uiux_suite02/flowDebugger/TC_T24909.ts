import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T24908 from "../../../testData/inputData/FlowDebugger/T24908.json";

test.describe('T24909 Verify For the Test runs, the lightning bolt appears on all sources that are executed as part of a flow run, and remains visible for the duration of the flow run.', () => {
    test.describe.configure({ retries: 2 })
    let id;
    test.afterEach(async ({ io }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test('"@Zephyr-IO-T24909 @Env-All @Priority-P2 T24909 Verify For the Test runs, the lightning bolt appears on all sources that are executed as part of a flow run, and remains visible for the duration of the flow run. UI_Backlog', async ({ io, page }) => {
        id = await io.createResourceFromAPI(T24908, "FLOWS");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

        const runTest = await page.locator(selectors.exportsPagePO.RUN_TEST).nth(0);
        expect(await runTest.screenshot()).toMatchSnapshot("RunTest.png",  {maxDiffPixelRatio: 0.2 });

        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN);
        const specificSourceRunButton = await page.locator(`${selectors.flowBuilderPagePO.SELECT_PAGE_GENERATOR_POPPER} ${selectors.exportsPagePO.RUN_TEST}`).nth(1);
        await expect(specificSourceRunButton).toHaveText("Run test");

        specificSourceRunButton.click();

        await io.flowBuilder.waitForElementAttached('[aria-label="active source"]');
        io.assert.expectToBeTrue(await io.flowBuilder.isVisible('[aria-label="active source"]'), "Active source is not shown");
    });
});
