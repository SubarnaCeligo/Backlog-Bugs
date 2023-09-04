import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"
import C51661 from '@testData/EM2.0/TC_C51661.json';



// test.describe.skip(' C51790 Verify "Cant Find" Link under connection form when toggle is under simple', () => {
//   test.beforeEach(async ({ io }) => {
//       await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//   });

//   test('Verify "Cant Find" Link under connection form when toggle is under simple', async({io,page}) => {

//       await io.homePage.click(selectors.basePagePO.RESOURCES);
//       await io.connectionPage.clickByText('Connections')
//       await io.connectionPage.clickByText('Create connection')

//       await io.connectionPage.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION)

//       const linkSelector = selectors.connectionsPagePO.lINK_WITH_CANTFIND_TEXT;
//       const linkFound = await page.waitForSelector(linkSelector, { state: 'attached' });
    
//       expect(linkFound).toBeTruthy();
     
//   });
// })
 

// test.describe.only("C50858 Verify the displayed screen by clicking on the error count from the following pages within a flow bubble, flow step drawer, run console,and run history", () => {
//   test("C50858 Verify the displayed screen by clicking on the error count from the following pages within a flow bubble, flow step drawer, run console,and run history", async ({io, page}) => {
//       const id = await io.fillFormUI(C51661,"FLOWS");
//       await io.api.runBatchFlowViaAPI('TC_C51661', id);
//       const lastRun = page.getByText('Last run')
//       await lastRun.waitFor({state: 'visible'});
//       await page.getByText("1 error").nth(1).click();

//       await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);

//       // if the error view is new view
//       const optionsList = await page.locator('ul[role="listbox"]');
//      const firstOption = await optionsList.locator('li[role="option"]:first-child');
//      // Check if the first option is selected by looking for the "Mui-selected" class
//      const isSelected = await firstOption.evaluate(option => option.classList.contains('Mui-selected'));
//      // Assert that the first option is selected
//      expect(isSelected).toBe(true);


//  await optionsList.locator('li[role="option"]:first-child').click();

//  await page.waitForTimeout(2000);
// // if first error row is selected
// const element = await page.locator('tr.MuiTableRow-root.jss247.Mui-selected.MuiTableRow-hover.css-ogrf6g');
// // Check if the element has the specified class using page.evaluate
// const isSelected2 = await element.evaluate((el) => {
//   return el.classList.contains('Mui-selected');
// });
// // Expect that the element is selected
// expect(isSelected).toBe(true);


//  // Users will see two panels, the “Error rows” panel for the list of errors and the “Error details” panel for the details of the error
// const panel1Locator = page.locator('.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft.MuiTableCell-sizeSmall.css-xap85z');
// const panel2Locator = page.locator('.MuiBox-root.css-1dxo72v');

// // Check if both locators found elements
// const panel1Count = await panel1Locator.count();
// const panel2Count = await panel2Locator.count();

// // Assert that both panels exist by checking the counts
// expect(panel1Count).toBeGreaterThan(0);
// expect(panel2Count).toBeGreaterThan(0);


//   });
// });

// test.describe('C23427Verify For Message column, Text wrap to a max of 5 lines', () => { 

//   test('Verify For Message column, Text wrap to a max of 5 lines', async ({ io, page }) => {
      

//     const id =  await io.fillFormUI(
//         C30651,
//         'FLOWS'
//       );

//       await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

//       await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
//       await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)


//       await io.flowBuilder.click("[data-test=scriptId]")
//       await io.flowBuilder.selectTextfromDropDown(page,"script debuuger" )

//       await io.flowBuilder.clickByText("script debuuger")

//       await io.flowBuilder.fill("input[name='script-preSavePage']", 'preSavePage');
//       await io.flowBuilder.clickByText("Save & close");

//       await io.api.runBatchFlowViaAPI("TC_51661", id);


//       await io.flowBuilder.waitForElementAttached('[data-test=scripts]')

//       await io.flowBuilder.clickByText("Scripts")

//       await page.getByRole('cell', { name: 'more' }).locator('[data-test="openActionsMenu"]').click();

//       await page.waitForTimeout(2000)
//       await io.flowBuilder.click("[data-test='viewExecutionLog']");


//       const textElement = await page.locator('.MuiBox-root.css-1dxo72v');

//       // Get the computed style of the element to determine its height
//       const elementStyle = await textElement.evaluate((element) => {
//         const computedStyle = getComputedStyle(element);
//         return {
//           height: computedStyle.getPropertyValue('height'),
//           lineHeight: computedStyle.getPropertyValue('line-height'),
//         };
//       });
      
//       // Calculate the maximum height that would correspond to 5 lines
//       const lineHeight = parseFloat(elementStyle.lineHeight);
//       const maxHeightFor5Lines = 5 * lineHeight;
      
//       // Convert the height of the element to a numeric value (removing 'px' units)
//       const elementHeight = parseFloat(elementStyle.height);
      
//       // Expect that the element's height is less than or equal to the maximum for 5 lines
//       expect(elementHeight).toBeLessThanOrEqual(maxHeightFor5Lines);
//       // await io.flowBuilder.waitForElementAttached("[text=Export]")

//   });       
// })
 
 
 
// test.describe(' C51614 Verify the name field under lookups', () => {
//   test.beforeEach(async ({ io }) => {
//       await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//   });

//   test(' Verify the name field under lookups', async({io,page}) => {

//       await io.homePage.click("[data-test='Tools']");
//       await io.connectionPage.clickByText('Flow builder')
//       await io.flowBuilder.click('[data-test="addProcessor"]')
//       await io.flowBuilder.click('[data-test="FTP"]')

//       await page.getByRole("menuitem").nth(1).click();
//       await io.flowBuilder.click('#connections-dropdown')
//       await io.flowBuilder.clickByText('FTP CONNECTION')
//       await io.flowBuilder.clickByText("Next");

//         const divSelector = '#name'; // Selector for the <div> element
// const divTextContent = await page.textContent(divSelector);

// expect(divTextContent).toContain("Name your lookup");

//   });
// });
// test.describe(' C51612 Verify the name field under imports', () => {
//   test.beforeEach(async ({ io }) => {
//       await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//   });

//   test(' Verify the name field under lookups', async({io,page}) => {

//       await io.homePage.click("[data-test='Resources']");
//       await io.connectionPage.clickByText('Imports')
//       await io.flowBuilder.clickByText('Create import')
//       await io.flowBuilder.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION)
//       const inputElement = await page.locator("#react-select-8-input");


//       const divSelector = '#application'; // Selector for the <div> element
//       const divTextContent = await page.textContent(divSelector);
      
//       expect(divTextContent).toContain("Name your import");
      

     
// const placeholderValue = await inputElement.getAttribute('placeholder');

// // Check if the placeholder attribute is equal to "Loop Returns connection"
// await expect(placeholderValue).toBe('Loop Returns connection');



//   });
// });
// test.describe(' C51611 Verify the name field for under connection', () => {
//   test.beforeEach(async ({ io }) => {
//       await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//   });

//   test(' Verify the name field for under connections', async({io,page}) => {

//     await io.homePage.click(selectors.basePagePO.RESOURCES);
//     await io.connectionPage.clickByText('Connections')
//     await io.connectionPage.clickByText('Create connection')

//     await io.connectionPage.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION)

//    // Find the input field within the "Name your connection" field
// // Locate the input element by its ID
// const inputElement = await page.locator('input[name="/name"]');

// await page.pause();

// // Get the placeholder attribute of the input element
// const placeholderValue = await inputElement.getAttribute('placeholder');

// // Check if the placeholder attribute is equal to "Loop Returns connection"
// await expect(placeholderValue).toBe('Loop Returns connection');

//   });
// });

test.describe('C93667Validate user is able to see the options script,description,chose function stub while creating "postResponseMap" script through flow builder page', () => {
   
  test('Validate user is able to see the options script,description,chose function stub while creating "postResponseMap" script through flow builder page', async({io,page}) => {

    const id =  await io.fillFormUI(
      C30651,
      'FLOWS'
    );

    await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

 await page.getByLabel('Create script').click();



  const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
 await chooseFunctionStubField.click();

await io.flowBuilder.selectTextfromDropDown(page,"postResponseMap");


 

   const descriptionField = await page.$(selectors.basePagePO.FORM_DESCRIPTION_SELECTOR);
  expect(descriptionField).not.toBeNull();

  expect(chooseFunctionStubField).not.toBeNull();

const expectedText = 'Post response map'; // The expected random text

const divTextContent = await chooseFunctionStubField.textContent();

console.log(divTextContent)

expect(divTextContent).toEqual(expectedText);
  });
})


test.describe('C93671Validate user is getting auto-fill of function stub while creating "filter" script through flow builder page', () => {
   
  test('Validate user is getting auto-fill of function stub while creating "filter" script through flow builder page', async({io,page}) => {

    const id =  await io.fillFormUI(
      C30651,
      'FLOWS'
    );

    await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

 await page.getByLabel('Create script').click();

  

  // Ensure that the choose function stub field is visible
  const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
 await chooseFunctionStubField.click();


  await io.flowBuilder.selectTextfromDropDown(page,"filter");
  await page.waitForTimeout(3000);
  
  const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
 
const divTextContent = await page.textContent(divSelector);

expect(divTextContent).not.toBe(null);
  });
})
test.describe('C93670Validate user is getting auto-fill of function stub while creating "formInit" script through flow builder page', () => {
   
  test('Validate user is getting auto-fill of function stub while creating "formInit" script through flow builder page', async({io,page}) => {

    const id =  await io.fillFormUI(
      C30651,
      'FLOWS'
    );

    await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

 await page.getByLabel('Create script').click();

  

  // Ensure that the choose function stub field is visible
  const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
 await chooseFunctionStubField.click();


 const formInitField = await page.$(selectors.basePagePO.FORM_INIT_FUNCTION);
  await page.waitForTimeout(3000);
  
  const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
 
const divTextContent = await page.textContent(divSelector);

expect(divTextContent).not.toBe(null);
  });
})
test.describe('C93669Validate user is getting auto-fill of function stub while creating "branching" script through flow builder page', () => {
   
  test('Validate user is getting auto-fill of function stub while creating "branching" script through flow builder page', async({io,page}) => {

    const id =  await io.fillFormUI(
      C30651,
      'FLOWS'
    );

    await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

 await page.getByLabel('Create script').click();

  

  // Ensure that the choose function stub field is visible
  const chooseFunctionStubField = await page.$(selectors.basePagePO.FUNCTION_STUB);
 await chooseFunctionStubField.click();


 await io.flowBuilder.selectTextfromDropDown(page,"router");

  await page.waitForTimeout(3000);
  
  const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
 
const divTextContent = await page.textContent(divSelector);

expect(divTextContent).not.toBe(null);
  });
})