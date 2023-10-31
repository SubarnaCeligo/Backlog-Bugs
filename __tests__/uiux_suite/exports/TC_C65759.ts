import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C65759 from "@testData/Flows/C65759.json"

test.describe("C65759 Verify that the LastExportDateTime is working as expected when User switches to other Export type to Delta Export", () => {
    test("C65759 Verify that the LastExportDateTime is working as expected when User switches to other Export type to Delta Export", async ({io, page}) => {
        await io.createResourceFromAPI(C65759, "FLOWS");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
        await io.flowBuilder.click(selectors.exportsPagePO.DELTA);
        await io.flowBuilder.click(`span ${selectors.exportsPagePO.HTTP_RELATIVEURI}`);
        const editorContent = JSON.parse(await page.locator(selectors.exportsPagePO.DATA_ACE_EDITOR).evaluate(e => {
          // @ts-ignore
          const editor = ace.edit(e);
          return editor.getValue();
        }));
        const editorContentKeys = Object.keys(editorContent);
        const islastExportDateTimePresent = editorContentKeys.includes('lastExportDateTime');
        await io.assert.expectToBeTrue(islastExportDateTimePresent, 'lastExportDateTime not present in the data');
    });
  });