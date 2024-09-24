import { test, expect } from "@celigo/ui-core-automation";
import IO_T35065 from '@testData/FlowBuilder/T35065.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify user is able to access the execution details(testMode field) via handlebar in Lookup AFE screens.", () => {
    let flowMap;
    test("@Env-All @Priority-P2 @Zephyr-IO_T35064 @Zephyr-IO_T35065 @Zephyr-IO_T35066 @Zephyr-IO_T35067 Verify user is able to access the execution details(testMode field) via handlebar in Lookup AFE screens.", async ({
        io, page
    }, testInfo) => {
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T35065, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get('IO-T35065')['flowId']);
        await io.exportsPage.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.exportsPage.click(selectors.exportsPagePO.RELATIVE_URI_AFE_BUTTON);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.homePage.loadingTime()
        const resourceExport = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        const resourceExportHandlebar = await io.exportsPage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);
        await expect(resourceExport).toContain('"testMode": true');
        await expect(resourceExportHandlebar).toContain('true');
        await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
        // TestMode disabled
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
        await io.homePage.loadingTime()
        await io.exportsPage.click(selectors.flowBuilderPagePO.LOOKUP);
        await io.exportsPage.click(selectors.exportsPagePO.RELATIVE_URI_AFE_BUTTON);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.homePage.loadingTime()
        const resourceTestModeDisabled = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        const resourceTMDisabledExportHandlebar = await io.exportsPage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);

        expect(resourceTestModeDisabled).toContain('"testMode": true');
        expect(resourceTMDisabledExportHandlebar).toContain('true');
        await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
        // input filter for testMode check
        await io.flowBuilder.click(selectors.flowBuilderPagePO.INPUT_FILTER);
        await io.homePage.loadingTime()
        const resourceTestModeInputFilter = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        expect(resourceTestModeInputFilter).toContain('"testMode": true');
        await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
        // output filter for testMode check
        await io.flowBuilder.click(selectors.flowBuilderPagePO.OUTPUTFILTERPP);
        await io.homePage.loadingTime()
        const resourceTestModeOutputFilter = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        expect(resourceTestModeOutputFilter).toContain('"testMode": true');
        await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

        // transformation rule both testMode and handlebar check
        await io.flowBuilder.click(selectors.basePagePO.LOOKUPTRANSFORMATION);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON);
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW_BUTTON_SETTINGS_HANDLEBAR);
        await io.homePage.loadingTime()
        const resourceTestModeTransform = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        const resourceTestModeTransformHandlebar = await io.exportsPage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);
        expect(resourceTestModeTransform[1]).toContain('"testMode": true');
        expect(resourceTestModeTransformHandlebar[1]).toContain('true');
    });
});