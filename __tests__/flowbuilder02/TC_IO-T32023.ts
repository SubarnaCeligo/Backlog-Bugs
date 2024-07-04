import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from '../../testData/inputData/FlowBuilder/T32023.json';
import { Mappings2dot0Page } from '@celigo/ui-core-automation/dist/src/pageFactory/pages/Mappings2dot0Page';
import { Mappings } from '@celigo/aut-selectors/dist/src/selectors/Mappings';

test.describe("@Author_MaheshNivruttiSutar @Bug-IO-80306 @Bug-IO-80221 @Env-QA @Priority-P2 @Zephyr-IO-T32021 @Zephyr-IO-T32023", () => {
    let intId;
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteIntegration(intId);
    });
    test("@Bug-IO-80306 @Bug-IO-80221 @Env-All @Priority-P2 @Zephyr-IO-T32021 @Zephyr-IO-T32023", async ({ io, page }) => {
        intId = await io.api.createIntegrationThruAPI(TC);
        await io.integrationPage.navigateToIntegrationById(intId);
        await io.homePage.loadingTime();
        await io.homePage.clickByText('Create flow');
        await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
        await io.homePage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T32023 export');
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
        await io.flowBuilder.clickByTextByIndex('HTTP ZENDESK CONNECTION', 0);
        await io.connectionPage.click(selectors.exportsPagePO.HTTP_METHOD);
        await io.connectionPage.clickByText("GET");
        await io.flowBuilder.fill(selectors.exportsPagePO.HTTP_RELATIVE_URI, '/users');
        await io.exportsPage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.homePage.addStep("*** Clicked on Export Type Dropdown ***");
        await io.exportsPage.clickByText('All - always export all data');
        await io.homePage.addStep("*** Select the All - always export all data ***");
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await io.exportsPage.click(selectors.flowBuilderPagePO.CLOSE);
        const cloneEXi = await io.flowBuilder.isVisible("text='Create source'");
        await io.assert.expectToBeFalse(cloneEXi, "Create source is opened");

        //@Zephyr-IO-T32021 Verify If we close the 'Confirm Replace Connection' pop-up, the entire export/lookup/import page is not closes.
        await io.exportsPage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONCURRENCY CONNECTION');
        await io.flowBuilder.clickByTextByIndex('HTTP ZENDESK CONCURRENCY CONNECTION', 0);
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        // await io.assert.expectToBeFalse(confirmREplace, "Confirn replace is not shown");
        await io.homePage.addStep("*** Click on cancel ***");
        await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
        // await io.exportsPage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
        const pageCheck = await io.flowBuilder.isVisible("text='Edit export'");
        await io.assert.expectToBeTrue(pageCheck, "Flowbuilder page is not shown");
        await io.exportsPage.click(selectors.flowBuilderPagePO.CLOSE);
        await io.exportsPage.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.deleteFlow();
    });
});