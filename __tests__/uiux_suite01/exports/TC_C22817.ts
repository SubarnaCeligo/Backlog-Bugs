import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C22817 from '@testData/Flows/TC_C22817.json';

test.describe("C22817 Verify for the backupBucket for S3 export, only AFE 2.0 supports", () => {
  test("@Env-All C22817 Verify for the backupBucket for S3 export, only AFE 2.0 supports", async ({io, page}) => {
      await io.createResourceFromAPI(C22817, "FLOWS");
      await page.locator(selectors.flowBuilderPagePO.TRANSFER).nth(0).click();
      await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
      await io.flowBuilder.click(`${selectors.importPagePO.BACKUP_BUCKET} ${selectors.basePagePO.HANDLEBAR_EDITOR}`);
      expect(page.getByText('AFE 1.0')).not.toBeVisible();
      expect(page.getByText('AFE 2.0')).not.toBeVisible();
  });
});