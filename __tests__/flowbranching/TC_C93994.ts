import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93992 from '@testData/Flows/C93992.json';

test.describe("C93994 Verify 'Script is required'/'Function is required' validations on input filter", () => {
  test.describe.configure({ retries: 2 }) 
  test("@Env-All @Zephyr-IO-T17716 C93994 Verify 'Script is required'/'Function is required' validations on input filter", async ({io, page}) => {
        await io.createResourceFromAPI(C93992, "FLOWS");
        await io.flowBuilder.addStep('Waiting for add data processor icon and clicking it');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,1);
        await io.flowBuilder.addStep('Clicking on input filter');
        await io.flowBuilder.click(selectors.basePagePO.INPUTFILTER);
        await io.flowBuilder.addStep('Clicking on javascript option');
        await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
        await io.flowBuilder.addStep('Clicking on script dropdown and selecting the script');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPT_LIST_DROPDOWN_ID);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
        await io.flowBuilder.addStep('Providing empty function name');
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT,'');
        const errorMessage = await page.locator(selectors.mappings.MAPPER2DOT0PO.ERROR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        });
        await io.assert.expectToBeValue('Function is required', errorMessage, 'Function required message not visible');
    });
  });