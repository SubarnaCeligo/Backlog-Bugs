import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C18923 from "../../../testData/inputData/Flows/C18923.json";

test.describe('TC_IO-T18923', () => { 
    test('@Priority-P2 @Zephyr-IO-T18923 @Env-All To Verify help text for [Simple | HTTP] toggle button for edit import', async ({ io, page }) => {
        
      await io.createResourceFromAPI(
        C18923,
        'FLOWS'
      );

      // IMPORT
      await io.flowBuilder.click(selectors.importPagePO.CLICKIMPORT);
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.click(
        selectors.flowBuilderPagePO.IMPORT_HEADING_HELP_TEXT_ICON,
      );
      const value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP);
      const expectedvalue =
        "Simple form helps you to quickly configure the resources by displaying only the required minimum fields.• HTTP form allows you to view and/or modify application specific resources at the universal HTTP connector level.Was this helpful?";
      const func = value.toString().includes(expectedvalue);
      await io.assert.expectToBeTrue(func, "help text doesn't match");
    });       
  })