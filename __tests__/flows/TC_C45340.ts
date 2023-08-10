import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45340 from "@testData/Flows/C45340.json"

test.describe('C45340', () => {
    // test.beforeEach(async ({ io }) => {
    //     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // });
  
    test("Verify the displayed default Gray text in the Mapper2.0 mapping fields when no data is entered/selected form Drop down ", async ({ io, page }) => {
        //   await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        
          await io.fillForm(
            C45340,
            'FLOWS'
          );
          const buttonInImportHTTP = await page.locator(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);

          await   buttonInImportHTTP.click();

          await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)

         
          const inputSourceSelector =  selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER;
          await page.waitForSelector(inputSourceSelector);




          const computedColorForSourceField = await page.$eval( inputSourceSelector, (input) => {
            const styles = getComputedStyle(input);
            return styles.color;
          });
          
          expect(computedColorForSourceField).toBe("rgb(51, 61, 71)"); 
          
          const inputDestinationSelector = selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER;
          await page.waitForSelector(inputDestinationSelector);




          const computedColorForDestinationField = await page.$eval( inputDestinationSelector, (input) => {
            const styles = getComputedStyle(input);
            return styles.color;
          });
          
          expect(computedColorForDestinationField).toBe("rgb(51, 61, 71)"); 
          

       });

       
  })


