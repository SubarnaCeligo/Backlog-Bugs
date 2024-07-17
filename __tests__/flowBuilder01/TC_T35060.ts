import { test, expect } from "@celigo/ui-core-automation";
import IO_T6148 from '@testData/FlowBuilder/T6148.json';
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify user is able to access the execution details(testMode field) via handlebar in Export AFE screens", () => {
    let flowMap;
    test("@Env-QA @Zephyr-IO_T35060 IO_T35061 Verify user is able to access the execution details(testMode field) via handlebar in Export AFE screens", async ({
        io, page
    }, testInfo) => {
        flowMap = await io.api.createImpOrExpAndFlowsThruAPI(IO_T6148, false);
        await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flowBuilder/" + flowMap.get('NS - fetch listner log Test')['flowId']);
        await io.exportsPage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
        await io.exportsPage.click(selectors.exportsPagePO.RELATIVE_URI_AFE_BUTTON);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        const resourceExport = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        const resourceExportHandlebar = await io.exportsPage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);
        await expect(resourceExport).toContain('"testMode": true');
        await expect(resourceExportHandlebar).toContain('true');
        await io.flowBuilder.click(selectors.exportsPagePO.CLOSE_PARSER_HELPER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
        // TestMode disabled
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
        await io.exportsPage.click(selectors.exportsPagePO.RELATIVE_URI_AFE_BUTTON);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
        const resourceTestModeDisabled = await io.exportsPage.getText(selectors.connectionsPagePO.DATA_PANEL);
        const resourceTMDisabledExportHandlebar = await io.exportsPage.getText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL);

        expect(resourceTestModeDisabled).toContain('"testMode": false');
        expect(resourceTMDisabledExportHandlebar).toContain('false');
    });
});