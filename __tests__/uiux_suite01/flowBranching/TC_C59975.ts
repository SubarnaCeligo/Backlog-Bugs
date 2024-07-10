import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C55975 from '@testData/Flows/C59975.json';

test.describe("C59975 Verify User is able to see the script under flow dashboard for flow branching", () => {
    test("@Env-All @Zephyr-IO-T17364 C59975 Verify User is able to see the script under flow dashboard for flow branching", async ({io, page}) => {
        await io.createResourceFromAPI(C55975, "FLOWS");
        await io.flowBuilder.addStep('Waiting for add data processor icon and clicking it');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
        await io.flowBuilder.addStep('Clicking page processor hook');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
        await io.flowBuilder.addStep('Filling premap input and selecting the script');
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.SCRIPT_PREMAP_INPUT, 'test premap');
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 0);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.addStep('Navigating to scripts tab');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPTS);
        await io.flowBuilder.addStep('Getting all rows or script tab table');
        const scriptList = await page.locator(selectors.flowBuilderPagePO.SCRIPT_PANEL_ROWS).all();
        await io.assert.expectToBeValue("1", scriptList.length.toString(), "Length of script list not as expected");
    });
  });