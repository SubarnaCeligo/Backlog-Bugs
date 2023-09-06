import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData1 from "@testData/Flows/C22915_testdata1.json"
import testData2 from "@testData/Flows/C22915_testdata2.json"

test.describe('Verify the prefix “Build “ from the field labels in exports and imports', () => { 

    test('Verify the prefix “Build “ from the field labels in exports', async ({ io, page }) => {
        

      const id =  await io.fillFormUI(
          testData1,
          'FLOWS'
        );

        await io.flowBuilder.clickByText("Export");

        const labels = await page.$$eval('label', elements =>
        elements.map(element => element.textContent.trim())
      );
      
      // Loop through the labels and check if any of them start with "Build "
      const labelsWithBuildPrefix = labels.filter(label => label.startsWith('Build '));
      
      // Assert that there are no labels with the "Build " prefix
      expect(labelsWithBuildPrefix.length).toBe(0);


    });       
    test('Verify the prefix “Build “ from the field labels in imports', async ({ io, page }) => {
        

      const id =  await io.fillFormUI(
          testData2,
          'FLOWS'
        );

        await io.flowBuilder.clickByText("Import");

        const labels = await page.$$eval('label', elements =>
        elements.map(element => element.textContent.trim())
      );
      
      // Loop through the labels and check if any of them start with "Build "
      const labelsWithBuildPrefix = labels.filter(label => label.startsWith('Build '));
      
      // Assert that there are no labels with the "Build " prefix
      expect(labelsWithBuildPrefix.length).toBe(0);


    });       
  })