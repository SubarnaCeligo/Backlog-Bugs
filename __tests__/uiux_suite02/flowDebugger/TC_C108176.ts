import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C108176 from '@testData/FlowDebugger/C108176.json';

test.describe("TC_C108176  Verify that whole button area is clickable for Run button, Run test button and Source selection dropdown.", () => {
    test("@Zephyr-T24101 @Env-All @Priority-P2 TC_C108176  Verify that whole button area is clickable for Run button, Run test button and Source selection dropdown.", async ({ io, page }) => {
        await io.createResourceFromAPI(C108176, "FLOWS");
        //Disable the flow
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);

        const runTestButtonArea  = page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON_AREA).nth(0);
        const sourceDropdownArea = page.locator(selectors.flowBuilderPagePO.SOURCE_DROPDOWN_BUTTON_AREA).nth(1);
        
        expect(await runTestButtonArea.isEditable() && await runTestButtonArea.isEnabled()).toBeTruthy();
        expect(await sourceDropdownArea.isEditable() && await sourceDropdownArea.isEnabled()).toBeTruthy();

        try {
            await runTestButtonArea.click({ trial: true });
            await sourceDropdownArea.click({ trial: true });
        }
        catch(e) {
            expect(e).toBe(null);
        }
    });
});