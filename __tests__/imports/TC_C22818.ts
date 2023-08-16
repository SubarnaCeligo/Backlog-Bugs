import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C22818 from "@testData/Flows/C22818.json"

test.describe('Verify for the backupBucket for S3 import, only AFE 2.0 supports', () => { 
    test('Verify for the backupBucket for S3 import, only AFE 2.0 supports', async ({ io, page }) => {
        
          await io.fillForm(
            C22818,
            'FLOWS'
          );

          await io.flowBuilder.clickByText("Transfer");


        await io.flowBuilder.clickByText("Advanced");

        const element = await page.waitForSelector(selectors.importPagePO.S3_IMPORT_BACKUP_BUCKET);


          const toggleElement1 = await page.locator('[data-toggle-id="afe-1"]');
    const toggleElement2 = await page.locator('[data-toggle-id="afe-2.09"]');

    // Use the expect API to assert that the elements are not present
    await expect(toggleElement1).not.toBeVisible();
    await expect(toggleElement2).not.toBeVisible();

        
      });       
  })