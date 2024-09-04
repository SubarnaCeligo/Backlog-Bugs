import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C23427 from "@testData/ScriptDebugger/C23427.json"
import SCRIPT from "@testData/FlowDebugger/C115532_script.json"
import { randomNumber } from "@celigo/aut-utilities";

test.describe('C23427 Verify Message column is present in the script debugger', () => {
    let preSavePage;
    let id;
    test.beforeEach(async ({ io, page  }) => {
        preSavePage = await io.api.createScriptViaAPI(SCRIPT.C23427_preSavePage);
    });
    test.afterEach(async ({ io, page  }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteScriptViaAPI(preSavePage);
    });
    test('@Zephyr-IO-T3496 @Env-All C23427 Verify Message column is present in the script debugger', async ({ io, page }) => {
        C23427.pageGenerators[0].qa__export.hooks.preSavePage._scriptId = preSavePage;
        C23427.name = C23427.name + randomNumber();
        id = await io.createResourceFromAPI(C23427, "FLOWS");
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPTS);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ACTIONS_SELECTOR, 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_EXECUTION_LOGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_NOW);
        let flowID = await io.api.getFlowId(C23427.name);
        await io.api.verifyFlowStatusThroughAPI(
          "C23427",
          flowID,
          [0, 1, 0]
        );
        // await io.flowBuilder.delay(20000);
        await io.flowBuilder.clickByText("Refresh");
        let ediColumns = (await io.homePage.getText(selectors.dashboardPagePO.EDI_COLUMNS)).toString();
        await io.assert.expectToContainValue('Message', ediColumns, 'Message column is not displayed');
    });
});
