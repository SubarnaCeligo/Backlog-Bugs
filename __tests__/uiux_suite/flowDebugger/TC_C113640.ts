import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C113640 from "@testData/FlowDebugger/C113640.json"

test.describe('C113640', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('C113640', async ({ io, page }) => {
        const id = await io.createResourceFromAPI(C113640, "FLOWS");
        //Disable the flow
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        //Export Hook
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SCRIPT_RUN_RESULT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_RUN_RESULT);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SUITE_SCRIPT_T_ICON);
        const Symbol = await page.$(selectors.flowBuilderPagePO.SUITE_SCRIPT_T_ICON);
        expect(await Symbol.screenshot()).toMatchSnapshot("T-icon.png");
        await io.homePage.addStep('Verified “T” icon should show in case of SuiteScript Hooks ');
        await io.integrationPage.clickButtonByIndex(selectors.flowBuilderPagePO.CLOSE,1);
        await io.integrationPage.clickButtonByIndex(selectors.flowBuilderPagePO.CLOSE,0);


        //Import Hook
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SUITE_SCRIPT_PRE_MAP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SUITE_SCRIPT_PRE_MAP);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SUITE_SCRIPT_T_ICON);
        const Symbol1 = await page.$(selectors.flowBuilderPagePO.SUITE_SCRIPT_T_ICON);
        expect(await Symbol1.screenshot()).toMatchSnapshot("T-icon-1.png");
        await io.homePage.addStep('Verified “T” icon should show in case of SuiteScript Hooks ');
        await io.integrationPage.clickButtonByIndex(selectors.flowBuilderPagePO.CLOSE,1);
        await io.integrationPage.clickButtonByIndex(selectors.flowBuilderPagePO.CLOSE,0);
    });
});
