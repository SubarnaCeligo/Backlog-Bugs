import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData1 from "@testData/Flows/C22915_testdata1.json"
import testData2 from "@testData/Flows/C22915_testdata2.json"

test.describe('Verify the prefix “Build “ from the field labels in exports and imports', () => {

    test('@Env-All @Zephyr-IO-T9924 Verify the prefix “Build “ from the field labels in exports', async ({ io, page }) => {


      const id =  await io.createResourceFromAPI(
          testData1,
          'FLOWS'
        );

        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        const labels = await page.$$eval('label', elements =>
        elements.map(element => element.textContent.trim())
      );
      const labelsWithBuildPrefix = labels.filter(label => label.startsWith('Build '));
      expect(labelsWithBuildPrefix.length).toBe(0);

    });
    test('@Env-All Verify the prefix “Build “ from the field labels in imports', async ({ io, page }) => {
      const id =  await io.createResourceFromAPI(
          testData2,
          'FLOWS'
        );
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        const labels = await page.$$eval('label', elements =>
        elements.map(element => element.textContent.trim())
      );
      const labelsWithBuildPrefix = labels.filter(label => label.startsWith('Build '));
      expect(labelsWithBuildPrefix.length).toBe(0);
    });
  })