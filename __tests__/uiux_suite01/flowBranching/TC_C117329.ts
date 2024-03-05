import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C117329 from "@testData/flowbranching/C117329.json"

test.describe('C117329', () => {
    test('C117329', async ({ io, page }) => {
        const id = await io.flowbranching.createFlowBranchFromAPI(C117329);
        await io.flowBuilder.navigateTo(
            process.env.IO_Integration_URL + "flowBuilder/" + id
        );
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBranchingPO.ROUTERS);
        await io.flowBuilder.delay(1000);
        expect(await page.screenshot()).toMatchSnapshot("Branching_UX.png");
    });
});
