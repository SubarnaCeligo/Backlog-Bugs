import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C107021 from '@testData/FlowBuilder/C107021.json';

test.describe("C107021 verifying Save & close is primary button", () => {
    test("C107021 verifying Save & close is primary button @Zephyr-IO-T23745 @Env-All @Priority-P2", async ({ io, page }) => {
        await io.createResourceFromAPI(C107021, "FLOWS");
        // export
        await io.connectionPage.click(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'randomString');
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
        // import
        await io.connectionPage.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 2);
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'randomString');
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
        // transformation
        await io.connectionPage.click(selectors.basePagePO.EXPORTTRANSFORMATION);
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.TRANSFORMGENERATE} input`, 'randomString');
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
        // output filter
        await io.connectionPage.click(selectors.basePagePO.OUTPUTFILTER);
        await io.flowBuilder.click(`${selectors.flowBranchingPO.LOGICRULES_CONTAINER} button`);
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
        // hooks
        await io.connectionPage.clickButtonByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
        await io.connectionPage.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SCRIPT_NAME, 'function');
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
        // input filter
        await io.connectionPage.click(selectors.basePagePO.INPUTFILTER);
        await io.flowBuilder.click(`${selectors.flowBranchingPO.LOGICRULES_CONTAINER} button`);
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
        // mapping
        await io.connectionPage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
        
        await io.connectionPage.click(selectors.flowBuilderPagePO.MAPPER_2);

        const addButtons = page.locator(
          selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS
        );
        addButtons.nth(0).click();
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.basePagePO.CLOSE);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
        // flow schedule
        await io.connectionPage.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
        await io.homePage.clickByText("Use cron expression");
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
        // flow branching
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await io.flowBuilder.getByRoleClick('menuitem','Add branching');
        await io.assert.verifyElementDisplayedByText('Save & closeSaveClose', 'not found');
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);
    });
});