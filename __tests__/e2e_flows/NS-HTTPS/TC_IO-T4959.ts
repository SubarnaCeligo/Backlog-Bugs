import { test, expect } from "@celigo/ui-core-automation";
import IO_T4959 from '@testData/FlowBuilder/IO_T4959.json';
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_IO-T4959_IO-T4958_IO-T4956_IO-T4954_IO-T4955", () => {
    let flowMap;
    let preMap;
    test.beforeEach(async ({ io, page  }) => {
        preMap = await io.api.createScriptViaAPI(SCRIPT.preMap);
    });
    test.afterEach(async ({ io, page  }) => {
        await io.api.deleteFlowViaAPI(flowMap.get(IO_T4959.qa__api_tdata[0].name)['flowId']);
        await io.api.deleteScriptViaAPI(preMap);
    });
    test("@Env-All @Zephyr-IO-T4959 Verify the fetching progress bar indicator is shown for listener logs and script logs", async ({ 
        io, page
    }) => {
        //IO-T4959
        //Create a flow with NS export and HTTP import 
        IO_T4959.qa__api_tdata[0].pageProcessors[0].qa__import.hooks.preMap._scriptId = preMap;
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T4959, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get(IO_T4959.qa__api_tdata[0].name)['flowId']);

        //Open listener Logs
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER_LOGS_TIME);
        await io.flowBuilder.clickByText("Yesterday");
        await io.flowBuilder.clickByText("Apply");
        await page.getByText("Fetching logs...", { exact: false }).waitFor({ state: `visible`, timeout: 10000 })
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER_LOGS_TIME);
        await io.flowBuilder.clickByText("Custom");
        let buttonList = await page.$$(selectors.flowBuilderPagePO.CALENDER_DAY_SELECTOR);
        // Filter the enabled buttons
        let enabledButtons = [];
        for (const button of buttonList) {
            const isDisabled = await button.evaluate(button => button.classList.contains('rdrDayDisabled'));
            if (!isDisabled) {
                enabledButtons.push(button);
            }
        }

        expect(enabledButtons.length).toBeGreaterThan(10);
        await enabledButtons[0].click();
        await enabledButtons[enabledButtons.length-7].click();
        await io.flowBuilder.clickByText("Apply");

        //Verfiy Script Log fetching progress is visible
        await page.getByText("Fetching logs... 2% completed", { exact: false }).waitFor({ state: `visible`, timeout: 30000 })

        //IO-T4956
        await io.flowBuilder.click(selectors.myAccountPagePO.PAUSEFETCH);
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.RESUMEFETCH,"Resume Fetching is not displayed");

        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSELOGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

        //Open Script debugger
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPTS);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ACTIONS_SELECTOR, 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_EXECUTION_LOGS);

        await io.flowBuilder.clickByText("Last 15 minutes");
        await io.flowBuilder.clickByText("Yesterday");
        await io.flowBuilder.clickByText("Apply");
        
        //Verfiy Script Log displayed
        await page.getByText("Fetching logs...", { exact: false }).waitFor({ state: `visible`, timeout: 30000 })
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.PAUSEFETCH,"Pause button is missing with fetching logs");

        //IO-T4958 verify the fetching percentage is shown as expected for listener logs & Script logs
        await io.flowBuilder.clickByText("Yesterday");
        await io.flowBuilder.clickByText("Custom");
        buttonList = await page.$$(selectors.flowBuilderPagePO.CALENDER_DAY_SELECTOR);

        // Filter the enabled buttons
        enabledButtons = [];
        for (const button of buttonList) {
            const isDisabled = await button.evaluate(button => button.classList.contains('rdrDayDisabled'));
            if (!isDisabled) {
                enabledButtons.push(button);
            }
        }
        expect(enabledButtons.length).toBeGreaterThan(10);
        await enabledButtons[0].click();
        await enabledButtons[enabledButtons.length-7].click();
        await io.flowBuilder.clickByText("Apply");

        //Verfiy Script Log fetching progress is visible
        await page.getByText("Fetching logs... 2% completed", { exact: false }).waitFor({ state: `visible`, timeout: 30000 })
    });
});