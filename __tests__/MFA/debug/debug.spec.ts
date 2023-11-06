import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C50858 from '@testData/EM2.0/C50858.json';
import testData from "./debug.json";
import C50859 from '@testData/Flows/C50859.json';



// test.describe(`C2206 Integration transfer that is cancelled in source account is also cancelled in destination account without any action of accept/dismiss the transfer invite at destination`, () => {
//   test(`C2206 Integration transfer that is cancelled in source account is also cancelled in destination account without any action of accept/dismiss the transfer invite at destination`, async ({
//     page,
//     io
//   }) => {
    
//     const res = await io.api.postCall(
//       `v1/transfers/invite`,
//       testData
//     );
//     const res1 = await io.api.putCall(
//         `v1/transfers/6543c5f32bec7d353984e3c8/cancel`
//         "6543c5f32bec7d353984e3c8"
//       );
//      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
//      await page.pause()

//   });
// });

// test.describe(`C26374 To verify "Integrations to transfer" dropdown is updated to latest.`, () => {
//   test(`C26374 To verify "Integrations to transfer" dropdown is updated to latest.`, async ({
//     page,
//     io
//   }) => {
//     await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
//     await io.myAccountPage.click('[data-test="Transfers"]')
//     await io.myAccountPage.clickByText("Create transfer")
//     await io.myAccountPage.clickByText("Please select")
//     const ulElement = await page.$('[role="listbox"]');

//   if (ulElement) {
//     // Check if the <ul> element contains an <li> element with text "transfer integration"
//     const hasTransferIntegration = await ulElement.evaluate((ul) => {
//       const liElements = ul.querySelectorAll('li');
//       for (const li of liElements) {
//         if (li.textContent.includes('Transfer integration')) {
//           return true;
//         }
//       }
//       return false;
//     });

//   await io.assert.expectToBeValue(hasTransferIntegration.toString(), "false", "Integration is found")

//   }
    
//   });
// });

 
 
 
 


 

 
 