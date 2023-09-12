import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93992 from '../../../testData/Flows/C93992.json';

test.describe("C93996 Verify 'Script is required'/'Function is required' validations on Import hooks", () => {
    test("C93996 Verify 'Script is required'/'Function is required' validations on Import hooks", async ({io, page}) => {
        await io.fillFormUI(C93992, "FLOWS");
        await io.flowBuilder.addStep('Waiting for add data processor icon and clicking it');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
          await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,1);
          await io.flowBuilder.addStep('Clicking on page processor hook');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS);
        await io.flowBuilder.addStep('Clicking on script dropdown and selecting the script');
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 0);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.MENUITEM, 1);
        await io.flowBuilder.addStep('Clicking on first edit script icon');
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EDIT_ECRIPT_LABEL_SELECTOR, 0);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT,'');
        const errorMessage = await page.locator(selectors.mappings.Mapper2dot0PO.ERROR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        });
        await io.flowBuilder.addStep('Validating error message incase of empty function name');
        expect(errorMessage).toBe('Function is required');
    });
  });