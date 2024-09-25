import { test, expect } from "@celigo/ui-core-automation";
import TC from '@testData/FlowBuilder/T22924.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T22924", () => {
    let flow1; let flow2;
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(flow1.get(TC.qa__api_tdata[0].name)['flowId']);
        await io.api.deleteFlowViaAPI(flow2.get(TC.listener.qa__api_tdata[0].name)['flowId']);
    });
    test("@Bug-IO-34856 @Priority-P2 @Env-All @Zephyr-IO-T22924", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        //IO-T22924 Verify Real time NS export (Suite Bundle and Suite App 1.0) works accordingly the check box field check
        //Update flow
        flow1 = await io.api.createImpOrExpAndFlowsThruAPI(TC);
        flow2 = await io.api.createImpOrExpAndFlowsThruAPI(TC.listener);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flow2.get(TC.listener.qa__api_tdata[0].name)['flowId']);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
        await io.flowBuilder.loadingTime();

        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flow1.get(TC.qa__api_tdata[0].name)['flowId']);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.loadingTime();
        const lastRun1 = page.getByText('Last run');
        await lastRun1.waitFor({ state: 'visible', timeout: 600000 });
        //Listener flow
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flow2.get(TC.listener.qa__api_tdata[0].name)['flowId']);
        await io.flowBuilder.loadingTime();
        await io.homePage.reloadPage();
        const lastRun = page.getByText('Last run');
        for (let attempt = 1; attempt <= 3; attempt++) {
            if (await lastRun.isVisible()) {
                // console.log("True");
                break;
            } else {
                // console.log("False");
                await io.homePage.reloadPage();
                await new Promise(resolve => setTimeout(resolve, 300000)); // 10 minutes delay
            }
        }
        const status = await page.$(selectors.flowBuilderPagePO.JOB_ERRORS);
        var statusText = await status.textContent();
        await io.assert.expectToContainValue(
            "Success",
            statusText,
            "Status not found"
        );
    });
});