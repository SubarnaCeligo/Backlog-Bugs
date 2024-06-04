import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C93992 Verify 'Script is required'/'Function is required' validations on branching filter", () => {
    test("@Env-All @Zephyr-IO-T17714 C93992 Verify 'Script is required'/'Function is required' validations on branching filter", async ({io, page}) => {
        await io.flowBuilder.addStep('Navigating to automation flows integration and clicking on create flow');
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.addStep('Adding branch in the new flow');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS,0);
        await page.getByRole('menuitem', { name: 'Add branching' }).click();
        await io.flowBuilder.addStep('Switching to javascript option');
        await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
        let errorMessage = await page.locator(selectors.mappings.MAPPER2DOT0PO.ERROR).evaluate(e => {
            // @ts-ignore
            const editor = ace.edit(e);
            return editor.getValue();
          });
        await io.assert.expectToBeValue('Script is required', errorMessage, 'Script required message not visible');
  
        await io.flowBuilder.click('#scriptId');
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.FUNCTION_NAME_INPUT,'');
        errorMessage = await page.locator(selectors.mappings.MAPPER2DOT0PO.ERROR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        });
        await io.assert.expectToBeValue('Function is required', errorMessage, 'Function required message not visible');  
    });
  });