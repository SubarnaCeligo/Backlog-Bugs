import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C65758 from "@testData/Flows/C65758.json"

test.describe("C65758 Verify that the LastExportedDateTime is updated across all the AFE editors including Hooks, Handlebars", () => {
    test("@Env-All @Zephyr-IO-T24331 C65758 Verify that the LastExportedDateTime is updated across all the AFE editors including Hooks, Handlebars", async ({io, page}) => {
        await io.createResourceFromAPI(C65758, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.flowBuilder.click(selectors.exportsPagePO.DELTA);
        await io.flowBuilder.click(`span ${selectors.exportsPagePO.HTTP_RELATIVEURI}`);
        let editorContent = JSON.parse(await page.locator(selectors.exportsPagePO.DATA_ACE_EDITOR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        }));
        let editorContentKeys = Object.keys(editorContent);
        let islastExportDateTimePresent = editorContentKeys.includes('lastExportDateTime');
        await io.assert.expectToBeTrue(islastExportDateTimePresent, 'lastExportDateTime not present in the data');
        await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 1);
  
        await io.flowBuilder.click(selectors.exportsPagePO.HTTP_BODY);
        editorContent = JSON.parse(await page.locator(selectors.exportsPagePO.DATA_ACE_EDITOR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        }));
        editorContentKeys = Object.keys(editorContent);
        islastExportDateTimePresent = editorContentKeys.includes('lastExportDateTime');
        await io.assert.expectToBeTrue(islastExportDateTimePresent, 'lastExportDateTime not present in the data');
        await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE,1);
  
        await io.flowBuilder.fill(selectors.exportsPagePO.LOOKUP.HTTP_RELATIVE_URI, 'tickets/{{lastExportDateTime}}');
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
  
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR ,0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
        editorContent = JSON.parse(await page.locator(selectors.exportsPagePO.DATA_ACE_EDITOR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        }));
        editorContentKeys = Object.keys(editorContent);
        islastExportDateTimePresent = editorContentKeys.includes('lastExportDateTime');
        await io.assert.expectToBeTrue(islastExportDateTimePresent, 'lastExportDateTime not present in the data');
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
  
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPT_ID, 0);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EDIT_SCRIPT_LABEL_SELECTOR, 0);
        editorContent = JSON.parse(await page.locator(selectors.exportsPagePO.DATA_ACE_EDITOR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        }));
        editorContentKeys = Object.keys(editorContent);
        islastExportDateTimePresent = editorContentKeys.includes('lastExportDateTime');
        await io.assert.expectToBeTrue(islastExportDateTimePresent, 'lastExportDateTime not present in the data');
        await io.flowBuilder.clickByIndex(selectors.basePagePO.CLOSE, 1);
    });
  });