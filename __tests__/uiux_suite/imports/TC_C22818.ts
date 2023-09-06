import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C22818 from "@testData/Flows/C22818.json"

test.describe('Verify for the backupBucket for S3 import, only AFE 2.0 supports', () => { 
    test('Verify for the backupBucket for S3 import, only AFE 2.0 supports', async ({ io, page }) => {
        
          await io.fillFormUI(
            C22818,
            'FLOWS'
          );

        await io.flowBuilder.clickByText("Transfer");


        await io.flowBuilder.clickByText("Advanced");

        const element = await page.waitForSelector(selectors.importPagePO.S3_IMPORT_BACKUP_BUCKET);
        await page.click(selectors.importPagePO.S3_IMPORT_BACKUP_BUCKET);


        const toggleElement1 = await page.locator(selectors.importPagePO.MOCK_AFE_1_EDITOR);
        const toggleElement2 = await page.locator(selectors.importPagePO.MOCK_AFE_2DOT09_EDITOR);

        // Use the expect API to assert that the elements are not present
        await expect(toggleElement1).not.toBeVisible();
        await expect(toggleElement2).not.toBeVisible();
      });       
  })