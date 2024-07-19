import { test, expect } from "@celigo/ui-core-automation";
import IO_T35060 from '@testData/FlowBuilder/T35060.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("IO_T6148 Verfiy List of logs can be paginated to see the next 50 requests.", () => {
    let flowMap;
    test("@Env-All @Zephyr-IO_T6148 @Priority-P2 C34464 Verfiy List of logs can be paginated to see the next 50 requests.", async ({
        io, page
    }, testInfo) => {
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T35060, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get('IO-T35060')['flowId']);
        await io.flowBuilder.click(selectors.basePagePO.EXPORTTRANSFORMATION);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON);
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON);
        await io.homePage.loadingTime()
        await io.homePage.click('a[href*="Handlebars-helper-reference"] + hr ~ div [data-test="previewEditorResult"]')
        await io.homePage.loadingTime()
        const resourceTestModeTransform = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        const resourceTestModeTransformHandlebar = await io.exportsPage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);
        expect(resourceTestModeTransform[1]).toContain('"testMode": true');
        expect(resourceTestModeTransformHandlebar[1]).toContain('true');
    });
});