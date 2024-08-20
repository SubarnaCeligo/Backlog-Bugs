import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C98691 from '@testData/FlowDebugger/C98691.json';

test.describe("TC_C98691  If the error is resolved in production flow then it is being shown in test mode as well after test run.", () => {
    test("@Zephyr-T2479 @Env-All @Priority-P2 TC_C98691  If the error is resolved in production flow then it is being shown in test mode as well after test run.", async ({ io, page }) => {
        await io.createResourceFromAPI(C98691, "FLOWS");

        await io.homePage.addStep('*** Disable the flow and run it ***');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN);

        await io.homePage.addStep('*** Enable the flow and run the flow ***');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
        await io.flowBuilder.click(selectors.basePagePO.RUNFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN);

        await io.homePage.addStep('*** Resolve the error ***');
        await io.homePage.loadingTime();
        await page.getByText("Failed").waitFor({ state: "visible", timeout:360000 });
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.reloadPage();
        //Open errors dashborad
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
        await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
        // await io.flowBuilder.click('td button');
        await io.flowBuilder.loadingTime();
        // await io.flowBuilder.clickByText('Open errors');
        await io.flowBuilder.reloadPage();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVE_JOBS);
        await io.flowBuilder.click(selectors.basePagePO.DATA_VALUE_ALL);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.homePage.loadingTime();

        await io.homePage.addStep('*** Disable the flow and run it ***');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN);
        await io.homePage.loadingTime()
        await page.getByText("Run in progress").waitFor({ state: "hidden", timeout:360000 });
        await page.waitForLoadState("domcontentloaded")
        await io.homePage.addStep('*** Verify that the resolved errors window is not visible ***');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
        await io.flowBuilder.clickByTextByIndex('1 error', 0);

        const isTestErrorsVisible = await page.locator(':text("Test run errors:")').isVisible();
        expect(isTestErrorsVisible).toBeTruthy();
        const isResolvedErrorVisible = await page.locator(':text("Resolved errors:")').isVisible();
        expect(isResolvedErrorVisible).toBeFalsy();
    });
});
