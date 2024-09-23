import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C34783 from "@testData/FlowBuilder/C34783.json";

test.describe('C34783 UI is crashing when we select mapping option at page processor after refreshing the browser in Orchestration Flow.', () => {
    let id;
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.loadingTime()
        await io.homePage.loadingTime()
    });
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
    });

    test('@Env-All @Zephyr-IO-T9703 C34783 UI is crashing when we select mapping option at page processor after refreshing the browser in Orchestration Flow.', async ({ io, page }) => {
        // create a flow
        id = await io.createResourceFromAPI(C34783, "FLOWS");

        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_SETTINGS);

        // execute the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);

        // wait for the flow to complete
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUN_FLOW);

        // reload the page
        await io.flowBuilder.reloadPage();

        // open the mappings drawer
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);


        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.MAPPER1TOGGLEBUTTON, 'Import mapping is not displayed');
    });
});
