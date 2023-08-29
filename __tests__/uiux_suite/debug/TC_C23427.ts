import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"

test.describe('Verify For Message column, Text wrap to a max of 5 lines', () => { 

    test('Verify For Message column, Text wrap to a max of 5 lines', async ({ io, page }) => {
        

      const id =  await io.fillFormUI(
          C30651,
          'FLOWS'
        );

        await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)


        await io.flowBuilder.click("[data-test=scriptId]")
        await io.flowBuilder.clickByText("script debuuger" )

        await io.flowBuilder.fill("input[name='script-preSavePage']", 'preSavePage');
        await io.flowBuilder.clickByText("Save & close");

        await io.api.runBatchFlowViaAPI("TC_51661", id);


        await io.flowBuilder.waitForElementAttached('[data-test=scripts]')

        await io.flowBuilder.clickByText("Scripts")

        await page.getByRole('cell', { name: 'more' }).locator('[data-test="openActionsMenu"]').click();
        await io.flowBuilder.clickByText("View execution logs");



       await page.pause();
        // await io.flowBuilder.waitForElementAttached("[text=Export]")
 
    });       
  })