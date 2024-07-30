import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C59977 from '@testData/Flows/C59977.json'

test.describe("C59977 Verify Post response map is persisted for flow with routers and without routers", () => {
    test("@Env-All @Zephyr-IO-T1617 C59977 Verify Post response map is persisted for flow with routers and without routers", async ({io, page}) => {
        const id = await io.createResourceFromAPI(C59977, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK);
        await io.flowBuilder.addStep('Clicking on script dropdown and selecting the script');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT);
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_DATA_TEST, 'Insert post response map stub');
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS, 0);
        await page.getByRole('menuitem', { name: 'Add branching' }).click();
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_HOOK);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT);
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.POST_RESPONSE_MAP_DATA_TEST, 'Insert post response map stub');
    });
  });