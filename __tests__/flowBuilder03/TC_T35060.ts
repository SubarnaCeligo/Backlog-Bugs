import { test, expect } from "@celigo/ui-core-automation";
import IO_T35060 from '@testData/FlowBuilder/T35060.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify user is able to access the execution details(testMode field) via handlebar in Export AFE screens", () => {
    let flowMap;
    test("@Env-QA @Zephyr-IO_T35060 IO_T35061 IO-35063 IO-35068 IO-35069 Verify user is able to access the execution details(testMode field) via handlebar in Export AFE screens", async ({
        io, page
    }, testInfo) => {
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T35060, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get('IO-T35060')['flowId']);
        await io.exportsPage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
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
        await io.exportsPage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
        await io.exportsPage.click(selectors.exportsPagePO.RELATIVE_URI_AFE_BUTTON);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        await io.homePage.loadingTime()
        const resourceTestModeDisabled = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        const resourceTMDisabledExportHandlebar = await io.exportsPage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);

        expect(resourceTestModeDisabled).toContain('"testMode": false');
        expect(resourceTMDisabledExportHandlebar).toContain('false');
        await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);

        // output filter for testMode check
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
        await io.homePage.loadingTime()
        const resourceTestModeOutputFilter = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        expect(resourceTestModeOutputFilter).toContain('"testMode": false');
        await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);

        //mapping for testMode check
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON);
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW_BUTTON_SETTINGS_HANDLEBAR);
        await io.homePage.loadingTime()
        const resourceTestModeMappings = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        const resourceTestModeMappingsHandlebar = await io.exportsPage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);
        expect(resourceTestModeMappings[1]).toContain('"testMode": false');
        expect(resourceTestModeMappingsHandlebar[1]).toContain('false');
    });
});