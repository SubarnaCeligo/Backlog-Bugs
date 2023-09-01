import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json"



// test.describe(' C51790 Verify "Cant Find" Link under connection form when toggle is under simple', () => {
//   test.beforeEach(async ({ io }) => {
//       await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//   });

//   test('Verify "Cant Find" Link under connection form when toggle is under simple', async({io,page}) => {

//       await io.homePage.click("[data-test='Resources']");
//       await io.connectionPage.clickByText('Connections')
//       await io.connectionPage.clickByText('Create connection')

//       await io.connectionPage.click("[data-test='Loop Returns']")

//       const linkSelector = 'a:has-text("can\'t find")';
//       const linkFound = await page.waitForSelector(linkSelector, { state: 'attached' });
    
//       expect(linkFound).toBeTruthy();
     
//   });
// })

 
test.describe('C93662Validate user is able to see the options script,description,chose function stub while creating "formInit" script through flow builder page', () => {
   
  test('Validate user is able to see the options script,description,chose function stub while creating "formInit" script through flow builder page', async({io,page}) => {

    const id =  await io.fillFormUI(
      C30651,
      'FLOWS'
    );


    await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

 await page.getByLabel('Create script').click();

 const descriptionField = await page.$('textarea[name="/description"]');
  expect(descriptionField).not.toBeNull();

  // Ensure that the choose function stub field is visible
  const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
  expect(chooseFunctionStubField).not.toBeNull();
   
  });
})
test.describe('C93648Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.', () => {
   
  test('Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.', async({io,page}) => {

    const id =  await io.fillFormUI(
      C30651,
      'FLOWS'
    );

    await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

 await page.getByLabel('Create script').click();


 await io.flowBuilder.fill('[name="/name"]', "mockscript");

  

  // Ensure that the choose function stub field is visible
  const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
 await chooseFunctionStubField.click();

 const formInitField = await page.$('[value="formInit"]');

 expect(formInitField).not.toBeNull();


  
  });
})
// test.describe('C9366Validate user is able to see the options script,description,chose function stub while creating "transform" script through flow builder page', () => {
   
//   test('Validate user is able to see the options script,description,chose function stub while creating "transform" script through flow builder page', async({io,page}) => {

//     const id =  await io.fillFormUI(
//       C30651,
//       'FLOWS'
//     );

//     await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

//     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

//  await page.getByLabel('Create script').click();


//  await io.flowBuilder.fill('[name="/name"]', "mockscript");

  

//   // Ensure that the choose function stub field is visible
//   const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
//  await chooseFunctionStubField.click();

//  const elementSelector = "[data-value='transform']";
// const element = await page.locator(elementSelector);

// // Scroll the element into view
// await element.scrollIntoViewIfNeeded();
  
//  await io.flowBuilder.click(elementSelector)
//   // Scroll through the list of options to find "Transform" 

//    const descriptionField = await page.$('textarea[name="/description"]');
//   expect(descriptionField).not.toBeNull();

//   // Ensure that the choose function stub field is visible
//   expect(chooseFunctionStubField).not.toBeNull();

// const expectedText = 'Transform'; // The expected random text

// const divTextContent = await chooseFunctionStubField.textContent();

// console.log(divTextContent)

// expect(divTextContent).toEqual(expectedText);
//   });
// })
// test.describe('C93666Validate user is able to see the options script,description,chose function stub while creating "postSubmit" script through flow builder page', () => {
   
//   test('Validate user is able to see the options script,description,chose function stub while creating "postSubmit" script through flow builder page', async({io,page}) => {

//     const id =  await io.fillFormUI(
//       C30651,
//       'FLOWS'
//     );

//     await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

//     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

//  await page.getByLabel('Create script').click();


//  await io.flowBuilder.fill('[name="/name"]', "mockscript");

  

//   // Ensure that the choose function stub field is visible
//   const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
//  await chooseFunctionStubField.click();

//  const elementSelector = "[data-value='postSubmit']";
// const element = await page.locator(elementSelector);

// // Scroll the element into view
// await element.scrollIntoViewIfNeeded();
  
//  await io.flowBuilder.click(elementSelector)
//   // Scroll through the list of options to find "Transform" 

//    const descriptionField = await page.$('textarea[name="/description"]');
//   expect(descriptionField).not.toBeNull();

//   // Ensure that the choose function stub field is visible
//   expect(chooseFunctionStubField).not.toBeNull();

// const expectedText = 'Post submit'; // The expected random text

// const divTextContent = await chooseFunctionStubField.textContent();

// console.log(divTextContent)

// expect(divTextContent).toEqual(expectedText);
//   });
// })
// test.describe('C93658Validate user is able to create "postSubmit" script through flow builder page', () => {
   
//   test('Validate user is able to create "postSubmit" script through flow builder page', async({io,page}) => {

//     const id =  await io.fillFormUI(
//       C30651,
//       'FLOWS'
//     );

//     await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

//     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

//  await page.getByLabel('Create script').click();


//  await io.flowBuilder.fill('[name="/name"]', "mockscript");

  

//   // Ensure that the choose function stub field is visible
//   const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
//  await chooseFunctionStubField.click();

//  const elementSelector = "[data-value='postSubmit']";
// const element = await page.locator(elementSelector);

// // Scroll the element into view
// await element.scrollIntoViewIfNeeded();
  
//  await io.flowBuilder.click(elementSelector)
//   // Scroll through the list of options to find "Transform" 

//   await io.flowBuilder.clickByText("Save & close");

//   // await page.pause();

//   await page.waitForTimeout(3000)

//   await io.flowBuilder.waitForElementAttached('[data-test="scriptId"]');

//   const divSelector = '[data-test="scriptId"]'; // Replace with the appropriate selector
// const expectedText = 'mockscript'; // The expected random text

// const divElement = await page.locator(divSelector);
// const divTextContent = await divElement.textContent();

// console.log(divTextContent)

// expect(divTextContent).toEqual(expectedText);
//   });
// })
test.describe('C93655Validate user is able to create "filter" script through flow builder page', () => {
   
  test('Validate user is able to create "filter" script through flow builder page', async({io,page}) => {

    const id =  await io.fillFormUI(
      C30651,
      'FLOWS'
    );

    await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

 await page.getByLabel('Create script').click();


 await io.flowBuilder.fill('[name="/name"]', "mockscript");

  

  // Ensure that the choose function stub field is visible
  const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
 await chooseFunctionStubField.click();

 const elementSelector = "[data-value='filter']";
const element = await page.locator(elementSelector);

// Scroll the element into view
await element.scrollIntoViewIfNeeded();
  
 await io.flowBuilder.click(elementSelector)
  // Scroll through the list of options to find "Transform" 

  await io.flowBuilder.clickByText("Save & close");

  // await page.pause();

  await page.waitForTimeout(4000)

  await io.flowBuilder.waitForElementAttached('[data-test="scriptId"]');

  const divSelector = '[data-test="scriptId"]'; // Replace with the appropriate selector
const expectedText = 'mockscript'; // The expected random text

const divElement = await page.locator(divSelector);
const divTextContent = await divElement.textContent();

console.log(divTextContent)

expect(divTextContent).toEqual(expectedText);
  });
})
test.describe('C93653Validate user is able to create "branching" script through flow builder page', () => {
   
  test('Validate user is able to create "branching" script through flow builder page', async({io,page}) => {

    const id =  await io.fillFormUI(
      C30651,
      'FLOWS'
    );

    await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

 await page.getByLabel('Create script').click();


 await io.flowBuilder.fill('[name="/name"]', "mockscript");

  

  // Ensure that the choose function stub field is visible
  const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
 await chooseFunctionStubField.click();

 const elementSelector = "[data-value='router']";
const element = await page.locator(elementSelector);

// Scroll the element into view
await element.scrollIntoViewIfNeeded();
  
 await io.flowBuilder.click(elementSelector)
  // Scroll through the list of options to find "Transform" 

  await io.flowBuilder.clickByText("Save & close");

  // await page.pause();

  await page.waitForTimeout(3000)

  await io.flowBuilder.waitForElementAttached('[data-test="scriptId"]');

  const divSelector = '[data-test="scriptId"]'; // Replace with the appropriate selector
const expectedText = 'mockscript'; // The expected random text

const divElement = await page.locator(divSelector);
const divTextContent = await divElement.textContent();

console.log(divTextContent)

expect(divTextContent).toEqual(expectedText);
  });
})

// test.describe('C93668Validate user is getting auto-fill of funtion stub while creating "transform" script through flow builder page', () => {
   
//   test('Validate user is getting auto-fill of funtion stub while creating "transform" script through flow builder page', async({io,page}) => {

//     const id =  await io.fillFormUI(
//       C30651,
//       'FLOWS'
//     );

//     await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

//     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

//  await page.getByLabel('Create script').click();

  

//   // Ensure that the choose function stub field is visible
//   const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
//  await chooseFunctionStubField.click();
  

  
//  // Scroll through the list of options to find "Transform"
//  await page.mouse.wheel(0,2000); // You can adjust the deltaY value to control the amount of scrolling

//  // Click on the "Transform" option
// //  await page.keyboard.press('Enter');
// // Now locate and click on the "Transform" option
// const locator = await page.locator('[value="transform"]');
// await locator.click();

// //  await locator.scrollIntoViewIfNeeded();
 
//  // Click on the element
//  await locator.click();
//   // Scroll through the list of options to find "Transform" 

//   const divSelector = '.ace_content'; // Selector for the <div> element
// const expectedFunctionCode = `function transform (options) {
//   return options.record
// }`; // Replace with the actual function definition

// const divTextContent = await page.textContent(divSelector);

// // Remove comments and whitespace from the text content for accurate comparison
// const cleanedDivTextContent = divTextContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s/g, '');

// // Remove comments and whitespace from the expected function code for accurate comparison
// const cleanedExpectedFunctionCode = expectedFunctionCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').replace(/\s/g, '');

// // Check if the cleaned expected function code is present in the cleaned text content
// const isFunctionPresent = cleanedDivTextContent.includes(cleanedExpectedFunctionCode);

// // Expect the function to be present in the <div> content
// expect(isFunctionPresent).toBeTruthy();

//   });
// })
// test.describe('C93672Validate user is getting auto-fill of funtion stub while creating "preMap" script through flow builder page', () => {
   
//   test('Validate user is getting auto-fill of funtion stub while creating "preMap" script through flow builder page', async({io,page}) => {

//     const id =  await io.fillFormUI(
//       C30651,
//       'FLOWS'
//     );

//     await io.flowBuilder.click('[data-test="addDataProcessor"]:nth-child(2)')

//     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_HOOK)
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK)

//  await page.getByLabel('Create script').click();

  

//   // Ensure that the choose function stub field is visible
//   const chooseFunctionStubField = await page.$('[data-test="insertFunction"]');
//  await chooseFunctionStubField.click();

//  const locator = await page.locator('[value="preMap"]').click();;
// //  await locator.scrollIntoViewIfNeeded();
 
// //  // Click on the element
// //  await locator.click();
//   // Scroll through the list of options to find "Transform" 

//   const divSelector = '.ace_content'; // Selector for the <div> element
 

// const divTextContent = await page.textContent(divSelector);

// const expectedText = 'preMapFunction stub:';

// // Create a regular expression to match the expected text with some flexibility in spacing
// const regExp = new RegExp(expectedText.replace(/\s+/g, '\\s*'));

// // Check if the textToSearch contains the expected text using the regular expression
// const isMatch = regExp.test(divTextContent);

// // Expect the match to be true
// expect(isMatch).toBeTruthy();
 

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