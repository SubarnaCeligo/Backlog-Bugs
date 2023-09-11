import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '@testData/EM2.0/TC_C51661.json';



test.describe("C50858 Verify the displayed screen by clicking on the error count from the following pages within a flow bubble, flow step drawer, run console,and run history", () => {
  test("C50858 Verify the displayed screen by clicking on the error count from the following pages within a flow bubble, flow step drawer, run console,and run history", async ({io, page}) => {
      const id = await io.fillFormUI(C51661,"FLOWS");
      await io.api.runBatchFlowViaAPI('TC_C51661', id);
      const lastRun = page.getByText('Last run')
      await lastRun.waitFor({state: 'visible'});
      await page.getByText("1 error").nth(1).click();

      await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);

      // if the error view is new view
      const optionsList = await page.locator(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_VIEW_DROPDOWN);
     const firstOption = await optionsList.locator(selectors.flowBuilderPagePO.EM2dot0PO.NEW_ERROR_VIEW_OPTION);
     // Check if the first option is selected by looking for the "Mui-selected" class
     const isSelected = await firstOption.evaluate(option => option.classList.contains('Mui-selected'));
     // Assert that the first option is selected
     expect(isSelected).toBe(true);


 await optionsList.locator(selectors.flowBuilderPagePO.EM2dot0PO.NEW_ERROR_VIEW_OPTION).click();
const rowSelector =  selectors.basePagePO.ROW_SELECTED; // Adjust the selector as needed
  const rowElement = await page.$(rowSelector);

  // Check if the row has a 'selected' class
  const hasSelectedClass = await rowElement?.evaluate((element) =>
    element.classList.contains('Mui-selected')
  );

  // Assert that the row is selected
  expect(hasSelectedClass).toBe(true);
 // Users will see two panels, the “Error rows” panel for the list of errors and the “Error details” panel for the details of the error
const panel1Locator = page.locator(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_DETAILS_PANEL);
const panel2Locator = page.locator(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_ROWS_PANEL);

// Check if both locators found elements
const panel1Count = await panel1Locator.count();
const panel2Count = await panel2Locator.count();

// Assert that both panels exist by checking the counts
expect(panel1Count).toBeGreaterThan(0);
expect(panel2Count).toBeGreaterThan(0);


  });
});