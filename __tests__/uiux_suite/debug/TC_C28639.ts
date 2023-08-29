import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C28639.json"

test.describe('Verify all the field values are saved in the HTTP/REST exports and lookups resources with updated labels while save button is clicked', () => { 

    test('Verify all the field values are saved in the HTTP/REST exports and lookups resources with updated labels while save button is clicked', async ({ io, page }) => {
        

      const id =  await io.fillFormUI(
          C30651,
          'FLOWS'
        );

        // await io.flowBuilder.waitForElementAttached("[text=Export]")

        await io.flowBuilder.clickByText("Export")

       

        const divSelector =  selectors.exportsPagePO.HTTP_METHOD_DROPDOWN;

        // await io.flowBuilder.waitForElementAttached(divSelector)


        await io.flowBuilder.click('[id="mui-component-select-/http/method"]');
        

        const liSelector = selectors.exportsPagePO.HTTP_METHOD_GET // Use either data-value or value attribute
        // await io.flowBuilder.waitForElementAttached(liSelector )



        await io.flowBuilder.click( '[data-value="GET"]');
         

        const buttonSelector =  selectors.basePagePO.SAVE_AND_CLOSE;
        const buttonElement = await page.waitForSelector(buttonSelector);
        
        await buttonElement.click();

    });       
  })