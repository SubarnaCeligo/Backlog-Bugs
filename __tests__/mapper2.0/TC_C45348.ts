import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45340 from "@testData/Flows/C45340.json"

test.describe('Verify the displayed default Gray text in the Mapper2.0 mapping fields when no data is entered/selected form Drop down ', () => { 
    test("Verify the displayed default Gray text in the Mapper2.0 mapping fields when no data is entered/selected form Drop down ", async ({ io, page }) => {
        
          await io.fillForm(
            C45340,
            'FLOWS'
          );
          

          await  io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);
          await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
          await io.flowBuilder.click(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER);

          const liElement = await page.locator("li").filter({ hasText: "Type or select source field" });
          await expect(liElement).toHaveText("Type or select source field", { timeout: 5000 });
      });       
  })


