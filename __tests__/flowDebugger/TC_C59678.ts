import {test, expect} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C59678 from "@testData/Flows/C59678.json";


test.describe("To verify that the Export/Import bubbles are working as expected", () => {
    test.beforeEach(async ({ io }) => {
        await io.flowBuilder.navigateTo(io.data.links.FLOW_BUILDER_PAGE_URL);
      });


    test("To verify that the Export/Import bubbles are working as expected", async ({io,page}) => {
     
        await io.fillForm(C59678, "FLOWS");

         expect(selectors.exportsPagePO.EXPORT_NAME).toBeTruthy();
         expect(selectors.importPagePO.IMPORT_NAME).toBeTruthy();

    });
})