import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C93992 Verify 'Script is required'/'Function is required' validations on branching filter", () => {
    test("C93992 Verify 'Script is required'/'Function is required' validations on branching filter", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
        await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
        await page.getByRole('menuitem', { name: 'Add branching' }).click();
        await io.flowBuilder.click(selectors.basePagePO.JAVASCRIPTWINDOW);
        let errorMessage = await page.locator(selectors.mappings.Mapper2dot0PO.ERROR).evaluate(e => {
            // @ts-ignore
            const editor = ace.edit(e);
            return editor.getValue();
          });
        expect(errorMessage).toBe('Script is required');
  
        await io.flowBuilder.click('#scriptId');
        await page.locator("[role='listbox'] li").nth(1).click();
        await io.flowBuilder.fill('#entryFunction','');
        errorMessage = await page.locator(selectors.mappings.Mapper2dot0PO.ERROR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        });
        expect(errorMessage).toBe('Function is required');
  
    });
  });