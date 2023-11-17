import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData1 from "@testData/Flows/C22915_testdata1.json"
import testData2 from "@testData/Flows/C22915_testdata2.json"

test.describe('Verify the prefix “Build “ from the field labels in exports and imports', () => { 

    test('Verify the prefix “Build “ from the field labels in exports', async ({ io, page }) => {
        

      const id =  await io.createResourceFromAPI(
          testData1,
          'FLOWS'
        );

        await io.flowBuilder.click('[data-test="Export"]');
        const labels = await page.$$eval('label', elements =>
        elements.map(element => element.textContent.trim())
      );
      const labelsWithBuildPrefix = labels.filter(label => label.startsWith('Build '));
      expect(labelsWithBuildPrefix.length).toBe(0);

    });       
    test('Verify the prefix “Build “ from the field labels in imports', async ({ io, page }) => {
      const id =  await io.createResourceFromAPI(
          testData2,
          'FLOWS'
        );
        await io.flowBuilder.click('[data-test="Import"]');
        const labels = await page.$$eval('label', elements =>
        elements.map(element => element.textContent.trim())
      );
      const labelsWithBuildPrefix = labels.filter(label => label.startsWith('Build '));
      expect(labelsWithBuildPrefix.length).toBe(0);
    });       
  })