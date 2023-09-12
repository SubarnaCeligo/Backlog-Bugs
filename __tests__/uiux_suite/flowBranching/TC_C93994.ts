import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93992 from '../../../testData/Flows/C93992.json';

test.describe("C93994 Verify 'Script is required'/'Function is required' validations on input filter", () => {
    test("C93994 Verify 'Script is required'/'Function is required' validations on input filter", async ({io, page}) => {
        await io.fillFormUI(C93992, "FLOWS")
        await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]');
        await page.locator('[data-test="addDataProcessor"]').nth(1).click();
        await io.flowBuilder.click('[data-test="importFilter"]');
        await io.flowBuilder.click('[data-test="JavaScript"]');
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