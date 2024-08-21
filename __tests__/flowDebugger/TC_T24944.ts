import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107963 from '../../testData/inputData/FlowDebugger/C107963.json';
import exp from "constants";

test.describe("TC_T24944 Verify the run button when the flow is in Production mode", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("TC_T24944 @Zephyr-IO-T24944 @Env-All @Priority-P2 T24944 Verify the run button when the flow is in Production mode UI_Backlog", async ({ io, page }) => {
        await io.createResourceFromAPI(C107963, "FLOWS");
        await io.flowBuilder.loadingTime();

        const runFlow = await page.locator(selectors.flowBuilderPagePO.RUN_FLOW);
        expect(await runFlow.screenshot()).toMatchSnapshot("RunFlow.png",  {maxDiffPixelRatio: 0.2 });

        await io.flowBuilder.click(selectors.exportsPagePO.RUN_TEST_EXPORTS);
        const specificSourceRunButton = await page.locator(`${selectors.flowBuilderPagePO.SELECT_PAGE_GENERATOR_POPPER} ${selectors.flowBuilderPagePO.RUN_FLOW}`).nth(0);

        await expect(specificSourceRunButton).toHaveText("Run flow");
    });
});
