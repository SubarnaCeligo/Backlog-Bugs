import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C46915 from "@testData/Flows/C46915.json"

test.describe('verify user must be able to save the mapper 2.0 mappings exist if there are no valid mappings in mapper 1.0', () => { 
    test("@Env-All @Zephyr-IO-T18023 verify user must be able to save the mapper 2.0 mappings exist if there are no valid mappings in mapper 1.0", async ({ io, page }) => {
        
          await io.createResourceFromAPI(
            C46915,
            'FLOWS'
          );
          await  io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);
          await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
        
           await io.flowBuilder.clickByText("Mapper 1.0");
           await io.flowBuilder.click(selectors.mappings.MAPPER1DOT0PO.DESTINATION_INPUT);

          
           const parentElement = await page.locator(selectors.mappings.MAPPER1DOT0PO.DESTINATION_INPUT);


           // Find the <textarea> element within the parent element
           const textareaElement = await parentElement.locator("textarea");

           await io.flowBuilder.clickByText("Destination record field (HTTP)");

       
           // Type into the <textarea> element
           await textareaElement.first().type("Text you want to type");

         

           await io.flowBuilder.clickByText("Destination record field (HTTP)");

           await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE)

          //  await page.waitForSelector("#notistack-snackbar");

          //  const messageText = await page.textContent("#notistack-snackbar");
           

    // Expected message
    const expectedMessage = "Mapper 1.0: Source field value not entered for destination field(s): Text you want to type";
    await io.assert.verifyElementDisplayedByText(expectedMessage, " Error message is not displayed")
    // Compare the actual message with the expected message
    // expect(messageText).toBe(expectedMessage);
        
      });  
      
      test("verify user must be able to save the mapper 2.0 ", async ({ io, page }) => {
        
        await io.createResourceFromAPI(
          C46915,
          'FLOWS'
        );
        await  io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_IMPORT_PLUSBUTTON);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
      
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER, "mapping");

        await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.FORWINDOWCLICK)


        await io.flowBuilder.clickByText("Save")
        await io.flowBuilder.clickByText("Close")    

    });  
  })

