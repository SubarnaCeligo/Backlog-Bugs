import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93992 from '../../../testData/Flows/C93992.json';

test.describe("C93993 Verify 'Script is required'/'Function is required' validations on output filter", () => {
    test("C93993 Verify 'Script is required'/'Function is required' validations on output filter", async ({io, page}) => {
        await io.fillFormUI(C93992, "FLOWS")
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
        await page.locator(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR).nth(0).click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
        await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
        await io.flowBuilder.click('#scriptId');
        await page.locator("[role='listbox'] li").nth(1).click();
        await io.flowBuilder.fill('#entryFunction','');
        const errorMessage = await page.locator('#error').evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        });
        expect(errorMessage).toBe('Function is required');
  
    });
  });