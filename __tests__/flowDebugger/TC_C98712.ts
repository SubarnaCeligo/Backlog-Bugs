import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98712 from '../../testData/inputData/FlowDebugger/C98712.json';
import SCRIPT from "@testData/FlowDebugger/C98712_script.json"

test.describe("TC_C98712 On moving from javascript mode to rules mode, test run results don't clear up", () => {
    let outputFilter;

    test.beforeEach(async ({ io }) => {
        outputFilter = await io.api.createScriptViaAPI(SCRIPT.outputFilter);
    });

    test.afterEach(async ({ io }) => {
        await io.api.deleteScriptViaAPI(outputFilter);
    });

    test("@Zephyr-T2488 @Env-All @Priority-P2 TC_C98712 VOn moving from javascript mode to rules mode, test run results don't clear up", async ({ io, page }) => {
        C98712.pageGenerators[0].qa__export.filter.script._scriptId = outputFilter;
        await io.createResourceFromAPI(C98712, "FLOWS");
        
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await page.getByText("Completed").nth(1).waitFor({ state: "visible", timeout:360000 });
        let testRunRunningLonger = await io.flowBuilder.isVisible(selectors.basePagePO.CLOSE_BUTTON);
        if (testRunRunningLonger){
            await io.flowBuilder.click(selectors.basePagePO.CLOSE_BUTTON);
        }
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);

        await io.homePage.addStep("*** Clicking on output filter ***")
        await io.flowBuilder.click(selectors.basePagePO.OUTPUTFILTER);

        await io.homePage.addStep("*** Clicking on rules ***")
        await io.flowBuilder.clickByText('Rules');
        await io.homePage.loadingTime();

        await io.homePage.addStep("*** Validating no test run results message ***")
        const noTestRunMessage = await page.locator(':text("No results to show since rules were not used in the last test run. Switch to JavaScript to see test run results.")').isVisible();
        expect(noTestRunMessage).toBeTruthy();

    });
});