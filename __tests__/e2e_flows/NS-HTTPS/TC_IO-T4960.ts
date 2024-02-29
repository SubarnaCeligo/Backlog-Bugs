import { test, expect } from "@celigo/ui-core-automation";
import IO_T4960 from '@testData/FlowBuilder/IO_T4960.json';
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify resume button for script debugger in NS export and HTTP import flow", () => {
    let flowMap;
    let preSavePage;
    test.beforeEach(async ({ io, page  }) => {
        preSavePage = await io.api.createScriptViaAPI(SCRIPT.preSavePage);
    });
    test.afterEach(async ({ io, page  }) => {
        await io.api.deleteFlowViaAPI(flowMap.get('NS - fetch listner log Test')['flowId']);
        await io.api.deleteScriptViaAPI(preSavePage);
    });
    test("Verify we can resume the paused logs by clicking resume button for script debugger on FB page", async ({ 
        io, page
    }, testInfo) => {
        //Jira - https://celigo.atlassian.net/browse/IOAUT-7521
        //Create a flow with NS export and HTTP import
        IO_T4960.qa__api_tdata[0].pageGenerators[0].qa__export.hooks.preSavePage._scriptId = preSavePage;
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T4960, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get('NS - fetch listner log Test')['flowId']);
        await page.pause();
        await io.flowBuilder.saveandRunFlow(testInfo.title);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPTS);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ACTIONS_SELECTOR, 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_EXECUTION_LOGS);

        //Open Script debugger
        await io.flowBuilder.clickByText("Last 15 minutes");
        await io.flowBuilder.clickByText("Yesterday");
        await io.flowBuilder.clickByText("Apply");
        
        //Verfiy Fetchlogs displayed
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.PAUSEFETCH,"Fetching is not displayed");

        //Pause the logs
        await io.flowBuilder.click(selectors.myAccountPagePO.PAUSEFETCH);
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.RESUMEFETCH,"Resume Fetching is not displayed");

        //Resume the logs
        await io.flowBuilder.click(selectors.myAccountPagePO.RESUMEFETCH);
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.PAUSEFETCH,"Fetching is Resumed");
    });
});