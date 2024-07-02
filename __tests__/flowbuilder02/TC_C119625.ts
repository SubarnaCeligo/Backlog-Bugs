import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C119625 from '../../testData/inputData/FlowBuilder/C119625.json';

test.describe("TC_C119625", () => {
    test.describe.configure({ retries: 1 })
    test("C119625 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.createResourceFromAPI(C119625, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR);
        //Output filter
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,0);
        await io.flowBuilder.click(selectors.basePagePO.OUTPUTFILTER);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PREVIEW);
        const Symbol = await page.$(selectors.flowBranchingPO.LOGICRULES_CONTAINER);
        expect(await Symbol.screenshot()).toMatchSnapshot("OutputRule-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.homePage.addStep("*** Checked the Extra line is not showing using screenshot ***");
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        //Input filter
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR,1);
        await io.flowBuilder.click(selectors.basePagePO.INPUTFILTER);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PREVIEW);
        const Symbol1 = await page.$(selectors.flowBranchingPO.LOGICRULES_CONTAINER);
        expect(await Symbol1.screenshot()).toMatchSnapshot("InputRule-chromium-linux.png", { maxDiffPixelRatio: 0.2 });
        await io.homePage.addStep("*** Checked the Extra line is not showing using screenshot ***");
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
    });
});