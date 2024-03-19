import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/flowbranching/IO-T27451.json"

test.describe('C117329', () => {
    let branchScript; let id;
    test.beforeEach(async ({ io, page  }) => {
        branchScript = await io.api.createScriptViaAPI(TC.scriptSchema);
    });
    test.afterEach(async ({ io, page  }) => {
        await io.api.deleteFlowViaAPI(id);
        await io.api.deleteScriptViaAPI(branchScript);
    });
    test('C117329', async ({ io, page }) => {
        TC.routers[0].script._scriptId = branchScript;
        id = await io.flowbranching.createFlowBranchFromAPI(TC);
        await io.flowBuilder.navigateTo(
            process.env.IO_Integration_URL + "flowBuilder/" + id
        );
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBranchingPO.ROUTERS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RULES);
        await io.assert.checkElementState(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL,"isHidden");
    });
});
