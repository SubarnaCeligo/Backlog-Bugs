import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C93992 from '../../../testData/Flows/C93992.json';

test.describe("C93996 Verify 'Script is required'/'Function is required' validations on Import hooks", () => {
    test("C93996 Verify 'Script is required'/'Function is required' validations on Import hooks", async ({io, page}) => {
        await io.fillFormUI(C93992, "FLOWS")
        await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]');
        await page.locator('[data-test="addDataProcessor"]').nth(1).click();
        await io.flowBuilder.click('[data-test="pageProcessorHooks"]');
        await io.flowBuilder.clickByIndex('#scriptId', 0);
        await io.flowBuilder.clickByIndex('[role="menuitem"]', 1);
        await io.flowBuilder.clickByIndex('[aria-label="Edit script"]', 0);
        await io.flowBuilder.fill('#entryFunction','');
        const errorMessage = await page.locator('#error').evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        });
        expect(errorMessage).toBe('Function is required');
    });
  });