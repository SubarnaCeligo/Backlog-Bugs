import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C46915 from "@testData/Flows/C46915.json"

test.describe('File Provider - Verify the “Action to take if source field has no value” dropdown', () => { 
    test("File Provider - Verify the “Action to take if source field has no value” dropdown ", async ({ io, page }) => {
        
          await io.fillForm(
            C46915,
            'FLOWS'
          );
          await  io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);
          await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
        
          await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "mapping");

          await io.flowBuilder.click(".rc-tree-list-holder")
          await io.flowBuilder.click("[aria-label=settings]")
          await io.flowBuilder.clickByText("Do nothing");
          const liElement1 = await page.locator("li").filter({ hasText: "Do nothing" });
          await expect(liElement1).toHaveText("Do nothing", { timeout: 5000 });
          const liElement2 = await page.locator("li").filter({ hasText: "Use custom default value "});
          await expect(liElement2).toHaveText("Use custom default value", { timeout: 5000 });
          const liElement3 = await page.locator("li").filter({ hasText: "Use empty string as default value" });
          await expect(liElement3).toHaveText("Use empty string as default value", { timeout: 5000 });
          const liElement4 = await page.locator("li").filter({ hasText: "Use null as default value" });
          await expect(liElement4).toHaveText("Use null as default value", { timeout: 5000 });
        
      });       
  })


