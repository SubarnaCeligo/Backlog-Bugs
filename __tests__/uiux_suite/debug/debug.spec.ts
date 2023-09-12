import {expect, links, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { selectors as pselect } from "@playwright/test";
// import C55447 from '../../testData/FlowDebugger/C55447.json';
// import C55447_mockData from '../../testData/FlowDebugger/C55447_mockData.json';
// import C55445_mockData from '../../testData/FlowDebugger/C55445_mockData.json';
// import C55446 from '../../testData/FlowDebugger/C55446.json';
// import test1 from '../../testData/EM2.0/TC_001_C23737.json';
// import C51661 from '../../testData/EM2.0/TC_ C51661.json';
// import C51656 from '../../testData/EM2.0/TC_ C51656.json';
// import C51655 from '../../testData/EM2.0/TC_C51655.json';
import C51661 from '../../../testData/EM2.0/TC_C51661.json';
// import C61343 from '../../testData/Imports/TC_C61343.json'
// import C51626 from '../../testData/EM2.0/TC_C51626.json'
// import test2 from '../../testData/EM2.0/test.json'
// import test3 from '../../testData/Imports/test.json'
// import exports12 from '../../testData/Exports/export.json'
// import flow1 from '../../testData/Flows/testExport.json'
// import C63406 from '../../../testData/Flows/TC_C63406.json'
// import C56565 from '../../../testData/Flows/TC_C56565.json'
// import C21052 from '../../../testData/Flows/TC_C21052.json';
// import C22817 from '../../../testData/Flows/TC_C22817.json'
// import C48963 from '../../../testData/Flows/C48963.json';
// import C46906 from '../../../testData/Mapper2.0/C46906.json';
import C93992 from '../../../testData/Flows/C93992.json';
import C55975 from '../../../testData/Flows/C59975.json';
import C2467 from '../../../testData/Flows/C2467.json';
test.describe("Sample", () => {

// test.describe("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", () => {
//     test("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", async ({io, page}) => {
//         const errorFlowId = await io.fillForm(test1, "FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51664', errorFlowId);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("1 error").nth(1).click();
//         await io.flowBuilder.click('#toggle-view');
//         const options = await page.$$('[role=listbox] li');
//         options[1].click();
//         await io.flowBuilder.waitForElementAttached('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
//         await io.flowBuilder.click('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
//         await io.flowBuilder.click('[data-test=resolveError]');
//         await io.flowBuilder.click('[data-test=flow-builder-resolved-errors]');
//         await io.flowBuilder.waitForElementAttached('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
//         await io.flowBuilder.click('.MuiPaper-elevation16 div .MuiTableRow-hover td [data-test=openActionsMenu]');
//         await io.flowBuilder.click('[data-test=editRetryData]');
//         const saveRetry = page.getByText('Save & retry');
//         const saveClose = page.getByText('Save & close');
//         const close = page.getByText('Close');
//         expect(saveRetry).toBeDefined();
//         expect(saveClose).toBeDefined();
//         expect(close).toBeDefined();
//     });
// });

// test.describe("C51656 Verify the Scroll bar for Message column in the Error rows page in the New view", () => {
//     test("C51656 Verify the Scroll bar for Message column in the Error rows page in the New view", async ({io, page}) => {
//         const errorFlowId = await io.fillForm(C51656, "FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("1 error").nth(1).click();
//         await io.flowBuilder.waitForElementAttached('.MuiPaper-elevation16 div .MuiTableBody-root tr');
//         expect(await io.flowBuilder.isScrollable('.MuiPaper-elevation16 div .MuiTableBody-root tr td div div .MuiBox-root')).toBe(false);
//     });
// });

// test.describe("C51658 Verify the Parent drawer underneath while checking the Error Details in the New view(Edit Retry Data)", () => {
//     test("C51658 Verify the Parent drawer underneath while checking the Error Details in the New view(Edit Retry Data)", async ({io, page}) => {
//         const errorFlowId = await io.fillForm(C51656, "FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("1 error").nth(1).click();
//         await io.flowBuilder.waitForElementAttached('.MuiPaper-elevation16 div .MuiTableBody-root tr');
//         const errorList = await page.$$('.MuiPaper-elevation16 div .MuiTableBody-root tr');
//         expect(await errorList[0].getAttribute('class')).toContain('Mui-selected');
//     });
// });

// test.describe("C50896 Verify the 'Number of days until MFA is required' input box", () => {
//     test("C50896 Verify the 'Number of days until MFA is required' input box", async ({io, page}) => {
//         await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
//         await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
//         await io.myAccountPage.click(selectors.myAccountPagePO.MFA);

//         await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, 'a');
//         let errorElement = await page.$(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_ERROR);
//         let errorText = await errorElement.innerText();
//         expect(errorText).toBe('Value must be numbers only');

//         await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '!');
//         errorElement = await page.$(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_ERROR);
//         errorText = await errorElement.innerText();
//         expect(errorText).toBe('Value must be numbers only');

//         await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '1');
//         errorElement = await page.$(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_ERROR);
//         expect(errorElement).toBe(null);
//     });
// });

// test.describe("C50901 Verify the 'Require MFA?' field in invite user page", () => {
//     test("C50901 Verify the 'Require MFA?' field in invite user page", async ({io, page}) => {
//         await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
//         await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
//         await page.getByRole('button', {name : 'Invite user', exact: true}).click();
//         const isMfaRequiredVisible = await io.myAccountPage.isVisible(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
//         expect(isMfaRequiredVisible).toBe(true);
//     });
// });

// test.describe("C50906 Verify the message shown when the account settings are saved", () => {
//     test("C50906 Verify the message shown when the account settings are saved", async ({io, page}) => {
//         await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
//         await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
//         await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
//         await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '1');
//         await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '2');
//         await io.myAccountPage.click("[data-test=Save]");
//         await page.locator(selectors.basePagePO.NOTIFICATION).waitFor({state: "visible"});
//         await expect(page.locator(selectors.basePagePO.NOTIFICATION)).toBeVisible();
//     });
// });


// test.describe("C23442 EM1.0 Timestamp on run dashboard does not follow user time preference setting", () => {
//     test("C23442 EM1.0 Timestamp on run dashboard does not follow user time preference setting", async ({io, page}) => {
//         const errorFlowId = await io.fillForm(C51656, "FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51656', errorFlowId);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         const runConsoleRows = await page.$$('table tbody tr');
//         const firstRowColumns = await runConsoleRows[0].$$('td');
//         await firstRowColumns[7].hover();
//         expect(await page.$(selectors.flowBuilderPagePO.EM2dot0PO.COMPLETED_ROWS_HOVER)).toBeDefined();

//     });
// });
// test.describe("C51655 Verify the 'Error rows' navigation from one error row to the next using up/down arrow keys on the keyboard.", () => {
//     test("C51655 Verify the 'Error rows' navigation from one error row to the next using up/down arrow keys on the keyboard.", async ({io, page}) => {
//         const errorFlowId = await io.fillForm(C51655, "FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51655', errorFlowId);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("2 errors").nth(1).click();
//         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
//         const errorRows = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
//         await errorRows[0].click();
//         expect(await errorRows[0].getAttribute('class')).toContain('Mui-selected');
//         expect(await errorRows[1].getAttribute('class')).not.toContain('Mui-selected');
//         await page.keyboard.press('ArrowDown');
//         expect(await errorRows[1].getAttribute('class')).toContain('Mui-selected');
//         expect(await errorRows[0].getAttribute('class')).not.toContain('Mui-selected');
//         await page.keyboard.press('ArrowUp');
//         expect(await errorRows[0].getAttribute('class')).toContain('Mui-selected');
//         expect(await errorRows[1].getAttribute('class')).not.toContain('Mui-selected');
//     });
// });

// test.describe("C51661 Verify the 'Error details' header fields displayed in the New View", () => {
//     test("C51661 Verify the 'Error details' header fields displayed in the New View", async ({io, page}) => {
//         const errorFlowId = await io.fillFormUI(C51661, "FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("1 error").nth(1).click();
//         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_DETAILS_TAB_LIST)
//         const errorDetailsTabs = page.locator(selectors.flowBuilderPagePO.EM2dot0PO.ERROR_DETAILS_TAB_LIST);
//         expect(errorDetailsTabs.locator('text="Edit retry data"')).toBeVisible();
//         expect(errorDetailsTabs.locator('text="HTTP request"')).toBeVisible();
//         expect(errorDetailsTabs.locator('text="HTTP response"')).toBeVisible();
//         expect(errorDetailsTabs.locator('text="Error fields"')).toBeVisible();

//         const firstTabInTablist = errorDetailsTabs.locator("button:nth-of-type(1)");
//         const firstTabButton = page.getByRole("tab", { name: "Edit retry data" });
//         expect(await firstTabButton.textContent()).toEqual(
//           await firstTabInTablist.textContent()
//         );

//         const secondTabInTablist = errorDetailsTabs.locator("button:nth-of-type(2)");
//         const secondTabButton = page.getByRole("tab", { name: "HTTP request" });
//         expect(await secondTabButton.textContent()).toEqual(
//           await secondTabInTablist.textContent()
//         );

//         const thirdTabInTablist = errorDetailsTabs.locator("button:nth-of-type(3)");
//         const thirdTabButton = page.getByRole("tab", { name: "HTTP response" });
//         expect(await thirdTabButton.textContent()).toEqual(
//           await thirdTabInTablist.textContent()
//         );

//         const fourthTabInTablist = errorDetailsTabs.locator("button:nth-of-type(4)");
//         const fourthTabButton = page.getByRole("tab", { name: "Error fields" });
//         expect(await fourthTabButton.textContent()).toEqual(
//           await fourthTabInTablist.textContent()
//         );
//     });
// });

// test.describe("C60447 To verify that the user is able to view masked/unmasked password on Password field.", () => {
//     test("C60447 To verify that the user is able to view masked/unmasked password on Password field.", async ({io, page}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
//         await io.homePage.click(selectors.homePagePO.SIGN_OUT);
//         await io.loginPage.waitForElementAttached(selectors.loginPagePO.PASSWORD);
//         let passwordField = page.locator(selectors.loginPagePO.PASSWORD);
//         expect(await passwordField.getAttribute('type')).toBe('password');
//         await io.loginPage.click(selectors.loginPagePO.HIDE_PASSWORD);
//         passwordField = page.locator(selectors.loginPagePO.PASSWORD);
//         expect(await passwordField.getAttribute('type')).toBe('text');
//     });
// });

// test.describe("C61343 Verify Preview Error is automatically redirecting to Parsed", () => {
//     test("C61343 Verify Preview Error is automatically redirecting to Parsed", async ({io, page}) => {
//         const id = await io.fillForm(C61343,"FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C61343', id);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await io.flowBuilder.click("[data-test=Import]");
//         await io.flowBuilder.waitForElementAttached("[data-test='HTTP request']");
//         expect(await page.locator("[data-test='HTTP request']").getAttribute('aria-pressed')).toBe('true');
//         await io.flowBuilder.click("[data-test=fetch-preview]");
//         await io.flowBuilder.waitForElementAttached("[data-test='HTTP request']");
//         expect(await page.locator("[data-test='Parsed output']").getAttribute('aria-pressed')).toBe('true');
//     });
// });

// test.describe("C51672 Verify the 'HTTP response' tab in the 'Error details' drawer", () => {
//     test.only("C51672 Verify the 'HTTP response' tab in the 'Error details' drawer", async ({io, page}) => {
//         const id = await io.fillForm(C51661,"FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51661', id);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("1 error").nth(1).click();
//         await io.flowBuilder.waitForElementAttached("text='HTTP response'");
//         await io.flowBuilder.click("text='HTTP response'");
//         await io.flowBuilder.waitForElementAttached('[data-test="Body"]');
//         expect(await io.flowBuilder.isVisible('[data-test="Body"]')).toBe(true);
//         expect(await io.flowBuilder.isVisible('[data-test="Headers"]')).toBe(true);
//         expect(await io.flowBuilder.isVisible('[data-test="Other"]')).toBe(true);
//         expect(await io.flowBuilder.isVisible('text="Add to batch"')).toBe(true);
//         expect(await io.flowBuilder.isVisible('text="Resolve & next"')).toBe(true);
//         expect(await io.flowBuilder.isVisible('[aria-label="Selected errors are added to a batch, on which you can perform bulk retry and resolve actions."]')).toBe(true);
//     });
// });

// test.describe("C51530 Verify when retries are completed for a step and same step is removed from flow, we show the Retrying complete and no data should display  in view results", () => {
//     test.only("C51530 Verify when retries are completed for a step and same step is removed from flow, we show the Retrying complete and no data should display  in view results", async ({io, page}) => {
//         const id = await io.fillForm(C51661,"FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51661', id);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("1 error").nth(1).click();
//         await io.flowBuilder.waitForElementAttached("[data-test='retryJobs']");
//         await io.flowBuilder.click("[data-test='retryJobs']");
//         await io.flowBuilder.click("[role='listbox'] [data-value='all']");
//         await io.flowBuilder.click("[data-test='Retry']")
//         await page.pause()
//         expect((await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS)).length).toBe(1);
//     });
// });

// test.describe("C51639 Verify the download option in the Resolved Error drawer", () => {
//     test.only("C51639 Verify the download option in the Resolved Error drawer", async ({io, page}) => {
//         const id = await io.fillForm(C51661,"FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51343', id);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("1 error").nth(1).click();
//         await io.flowBuilder.waitForElementAttached(".MuiPaper-elevation16 [data-test='openActionsMenu']");
//         await io.flowBuilder.click(".MuiPaper-elevation16 [data-test='openActionsMenu']");
//         expect(await io.flowBuilder.isVisible("[data-test='downloadErrors']")).toBe(true)
//         await io.flowBuilder.click('data-test="resolveAndNext"');
//         await io.flowBuilder.click("[data-test='flow-builder-resolved-errors']");
//         await io.flowBuilder.waitForElementAttached(".MuiPaper-elevation16 [data-test='openActionsMenu']");
//         await (await page.$$(".MuiPaper-elevation16 [data-test='openActionsMenu']"))[0].click();
//         expect(await io.flowBuilder.isVisible("[data-test='downloadErrors']")).toBe(true)
//     });
// });

// test.describe("C55917 Verify the Default Structure/options of Pendo-Zendesk chat bot which is displayed in the integrator.io", () => {
//     test("C55917 Verify the Default Structure/options of Pendo-Zendesk chat bot which is displayed in the integrator.io", async ({page,io}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached('._pendo-image');
//         await io.homePage.click('._pendo-image');
//         // await io.homePage.waitForElementAttached('._pendo-image');
//         await io.homePage.click('._pendo-image');
//         // await io.homePage.waitForElementAttached('#pendo-resource-center-main-module-container ol li');
//         const helpList = await page.$$('#pendo-resource-center-main-module-container ol li');
//         await helpList[0].click();
//         // await page.getByText('Search our docs').click();
//         // await io.homePage.waitForElementAttached("[data-testid='pill-button']");
//         expect(await page.$("[data-testid='pill-button']")).toBeDefined();
//     })
// })

// test.describe("C55917 Verify the Default Structure/options of Pendo-Zendesk chat bot which is displayed in the integrator.io", () => {
//     test("C55917 Verify the Default Structure/options of Pendo-Zendesk chat bot which is displayed in the integrator.io", async ({page,io}) => {
//         await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//         await io.homePage.waitForElementAttached('._pendo-image');
//         if(!await io.homePage.isVisible('#pendo-resource-center-main-module-container'))
//           await io.homePage.click('._pendo-image');
//         await io.homePage.delay(5000);
//         await io.homePage.waitForElementAttached('#pendo-resource-center-main-module-container ol li');
//         await page.locator('#pendo-resource-center-main-module-container ol li').nth(0).click();
//         // await page.getByText('Search our docs').click();
//         await io.homePage.delay(5000);
//         await io.homePage.waitForElementAttached('[data-embed="answerBot"]');
//         await io.homePage.waitForElementAttached("[data-testid='pill-button']");
//         await io.homePage.click("[data-testid='pill-button']")
//         await page.pause();
//         // expect(await page.$("[data-testid='pill-button']")).toBeDefined();
//     })
// })


// test.describe("C50905 Verify that only the owner/admin should be able to define the number of days for a trusted device.", () => {
//   test("C50905 Verify that only the owner/admin should be able to define the number of days for a trusted device.", async ({io, page}) => {
//       await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
//       await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SECURITY);
//       await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
//       await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.MFA);
//       await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
//       await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, "");
//       await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, "5");
//       await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);
//       expect(await page.locator(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT).getAttribute('value')).toBe("5");
//   });
// });

// test.describe("C51637 Verify the drawer title, tab titles and tab order in the 'Resolved Error' drawer", () => {
//   test("C51637 Verify the drawer title, tab titles and tab order in the 'Resolved Error' drawer", async ({io, page}) => {
//     const errorFlowId = await io.fillFormUI(C51661, "FLOWS");
//     await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
//     const lastRun = page.getByText('Last run')
//     await lastRun.waitFor({state: 'visible'});
//     await page.getByText("1 error").nth(1).click();
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
//     const options = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
//     options[1].click();
//     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_RESOLVE_ERROR);
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVED_ERRORS_TAB);
//     await page.getByText('Refresh errors').click();
//     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
//     await io.flowBuilder.waitForElementAttached("text='Error details'");
//     expect(page.locator("text='Error details'")).toBeVisible();
//     expect(page.locator("text='Edit retry data'")).toBeVisible();
//     expect(page.locator("text='HTTP request'")).toBeVisible();
//     expect(page.locator("text='HTTP response'")).toBeVisible();
//     expect(page.locator("text='Error fields'")).toBeVisible();
//   });
// });

// test.describe("C51664 Verify the Top 'Retry' option in the Error Dashboard by editing data in 'Edit retry data' tab", () => {
//   test("C51664 Verify the Top 'Retry' option in the Error Dashboard by editing data in 'Edit retry data' tab", async ({io, page}) => {
//       const id = await io.fillFormUI(C51661,"FLOWS");
//       await io.api.runBatchFlowViaAPI('TC_C51661', id);
//       const lastRun = page.getByText('Last run');
//       await lastRun.waitFor({state: 'visible'});
//       await page.getByText("1 error").nth(1).click();
//       const val = await page.locator('.ace_editor').evaluate(e => {
//         // @ts-ignore
//         const editor = ace.edit(e);
//         return editor.setValue('{}');
//       });
//       expect(await page.locator(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_JOBS_DROPDOWN).getAttribute('class')).toContain('Mui-disabled');
//       expect(page.getByLabel("Before retrying, you must save your edits for each error in the batch. Click “Save & next” on this error to continue.")).toBeVisible();
      
//   });
// });

// test.describe("C51628 Verify the displayed buttons by editing the retry data in the 'Error details' drawer>'Edit retry data'tab", () => {
//   test("C51628 Verify the displayed buttons by editing the retry data in the 'Error details' drawer>'Edit retry data'tab", async ({io, page}) => {
//       const id = await io.fillFormUI(C51661,"FLOWS");
//       await io.api.runBatchFlowViaAPI('TC_C51661', id);
//       const lastRun = page.getByText('Last run');
//       await lastRun.waitFor({state: 'visible'});
//       await page.getByText("1 error").nth(1).click();
//       await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_AND_NEXT);
//       expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_AND_NEXT)).toBe(true);
//       expect(await io.flowBuilder.isVisible(selectors.basePagePO.SAVE_AND_CLOSE)).toBe(false);
//       await page.locator('.ace_editor').evaluate(e => {
//         // @ts-ignore
//         const editor = ace.edit(e);
//         return editor.setValue('{}');
//       });
//       expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2dot0PO.RETRY_AND_NEXT)).toBe(false);
//       expect(await io.flowBuilder.isVisible(selectors.basePagePO.SAVE_RETRY_AND_CLOSE)).toBe(true);
//   });
// });

// test.describe("C52047 Verify the Open errors tab, when no results are returned for filter selections in both Current View & New View", () => {
//   test("C52047 Verify the Open errors tab, when no results are returned for filter selections in both Current View & New View", async ({io, page}) => {
//     const id = await io.fillFormUI(C51661,"FLOWS");
//     await io.api.runBatchFlowViaAPI('TC_C51661', id);
//     const lastRun = page.getByText('Last run');
//     await lastRun.waitFor({state: 'visible'});
//     await page.getByText("1 error").nth(1).click();
//     await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_HEADERS);
//     const classification = page.locator(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_HEADERS).filter({hasText: 'Classification'});
//     const source = page.locator(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_HEADERS).filter({hasText: 'Source'});

//     await classification.locator('button').nth(0).click();
//     await page.locator(selectors.basePagePO.ARROW_POPPER).getByText('Governance').click();
//     await io.flowBuilder.clickByText('Apply');

//     await source.locator('button').click();
//     await page.locator(selectors.basePagePO.ARROW_POPPER).getByText('Mapping', {exact: true}).click();
//     await io.flowBuilder.clickByText('Apply');

//     expect(await page.locator(selectors.flowBuilderPagePO.EM2dot0PO.NO_FILTER_DATA_FOUND).innerText()).toContain("You don't have any errors that match the filters you applied..");
//   });
// });

// test.describe("C63406 Verify when Number of records per HTTP Import request is set to greater than 1 then the field 'Path to records in HTTP response body' under Non-standard API response patterns should be set to required.", () => {
//   test("C63406 Verify when Number of records per HTTP Import request is set to greater than 1 then the field 'Path to records in HTTP response body' under Non-standard API response patterns should be set to required.", async ({io, page}) => {
//     await io.fillFormUI(C63406,"FLOWS");
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
//     await page.pause();
//     await io.flowBuilder.waitForElementAttached("[data-test='http.batchSize'] input");
//     await io.flowBuilder.fill("[data-test='http.batchSize'] input", '2');
//     await io.flowBuilder.waitForElementAttached("[data-test='http.response.resourcePath'] input");
//     const isRequired = await page.locator("[data-test='http.response.resourcePath'] input").evaluate(element => 'required' in element);
//     expect(isRequired).toBe(true);
//   });
// });

// test.describe("C53343 Verify Base URI is not present in UPS Connection page", () => {
//   test("C53343 Verify Base URI is not present in UPS Connection page", async ({io, page}) => {
//       await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
//       await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
//       await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'ups');
//       await io.connectionPage.click(selectors.connectionsPagePO.UPS_CONNECTION);
//       await expect(page.getByText('Base URI')).not.toBeVisible();
//   });
// });

//------------------- ASSISTANT ---------------------------------------

// test.describe("C56565 Verify when (input, textarea, date) fieldType is selected in export query parameters, user is presented with input text field to enter the value", () => {
//   test("C56565 Verify when (input, textarea, date) fieldType is selected in export query parameters, user is presented with input text field to enter the value", async ({io, page}) => {
//     await io.fillFormUI(C56565,"FLOWS");
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
//     await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_RESOURCE);
//     await page.getByRole('menuitem', { name: 'Content', exact: true }).click();
//     await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_OPERTAION);
//     await page.getByRole('menuitem', { name: 'Get Content', exact: true }).click();
//     await io.flowBuilder.waitForElementAttached(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
//     await io.flowBuilder.click(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
//     await page.locator(selectors.basePagePO.MENU_ITEM).nth(0).click();
//     await io.flowBuilder.fill(selectors.importPagePO.QUERY_PARAMETER_VALUE_0, 'testValue');
//     await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
//     await io.flowBuilder.delay(1000);
//     expect(await page.$(selectors.basePagePO.SAVE_AND_CLOSE)).toBe(null);
//     expect(page.locator(selectors.flowBuilderPagePO.EXPORT)).toBeVisible();
//   });
// });

// test.describe("C56566 Verify when (select, multiselect) fieldType is selected in exports query parameters, user is presented with a dropdown to select a value", () => {
//   test("C56566 Verify when (select, multiselect) fieldType is selected in exports query parameters, user is presented with a dropdown to select a value", async ({io, page}) => {
//     await io.fillFormUI(C56565,"FLOWS");
//     await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
//     await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_RESOURCE);
//     await page.getByRole('menuitem', { name: 'Content labels', exact: true }).click();
//     await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_OPERTAION);
//     await page.getByRole('menuitem', { name: 'Get labels for content', exact: true }).click();
//     await io.flowBuilder.waitForElementAttached(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
//     await io.flowBuilder.click(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
//     await page.locator(selectors.basePagePO.MENU_ITEM).nth(0).click();
//     await io.flowBuilder.click(selectors.importPagePO.QUERY_PARAMETER_VALUE_0);
//     const dropdownOptions = await page.getByRole('menuitem').all();
//     expect(dropdownOptions.length).toBeGreaterThanOrEqual(1);
//   });
// });

//--------------------- ASSISTANT ---------------------------------------------

//====================== VIKRAM ============================

// test.describe("C49539 Verify the limit of 25 router under flow branching", () => {
//   test("C49539 Verify the limit of 25 router under flow branching", async ({io, page}) => {
//       await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
//       await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
//       await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
//       for(let i = 0; i < 25; i++){
//         await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
//         await page.getByRole('menuitem', { name: 'Add branching' }).click();
//         await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
//         await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
//         await io.flowBuilder.delay(1000);
//       }
//       await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
//       await expect(page.getByLabel("You have reached the maximum of 25 branchings in a flow")).toBeVisible();
//   });
// });

// test.describe("C47425 Test to create empty PG/PP bubbles as a administrator user", () => {
//   test("C47425 Test to create empty PG/PP bubbles as a administrator user", async ({io, page}) => {
//       await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
//       await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
//       await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
//       await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
//       await page.getByRole('menuitem', { name: 'Add branching' }).click();
//       await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
//       await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
//       await io.flowBuilder.delay(1000);
//       await io.flowBuilder.click(selectors.flowBuilderPagePO.CANVAS_FIT_TO_SCREEN);
//       const pageProcessors = await page.locator(selectors.flowBuilderPagePO.MOVE_PP).all();
//       expect(pageProcessors.length).toBe(2);
//   });
// });

// test.describe("C47992 Verify the merging and add branch functionality for monitor access", () => {
//   test("C47992 Verify the merging and add branch functionality for monitor access", async ({io, page}) => {
//       await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
//       await page.locator(`${selectors.basePagePO.TAB_PANEL} table tbody tr`).nth(0).locator('th div').click();
//       const addBranching = await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).all();
//       expect(addBranching.length).toBe(0);
//   });
// });

// test.describe("C32975 To verify 'Monitor' label is displayed along with integration name if that particular integration has only monitor access permission", () => {
//   test("C32975 To verify 'Monitor' label is displayed along with integration name if that particular integration has only monitor access permission", async ({io, page}) => {
//       await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//       await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
//       expect(page.getByLabel("You have monitor permissions").nth(0)).toBeVisible();
//   });
// });
//-------------------- VIKRAM --------------------------

//-------- MANIKANTHA ----------------

// test.describe("C22817 Verify for the backupBucket for S3 export, only AFE 2.0 supports", () => {
//   test("C22817 Verify for the backupBucket for S3 export, only AFE 2.0 supports", async ({io, page}) => {
//       await io.fillFormUI(C22817, "FLOWS");
//       await page.locator(selectors.flowBuilderPagePO.TRANSFER).nth(0).click();
//       await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
//       await io.flowBuilder.click(`${selectors.importPagePO.BACKUP_BUCKET} ${selectors.basePagePO.HANDLEBAR_EDITOR}`);
//       expect(page.getByText('AFE 1.0')).not.toBeVisible();
//       expect(page.getByText('AFE 2.0')).not.toBeVisible();
//   });
// });

// test.describe("C22818 Verify for the backupBucket for S3 import, only AFE 2.0 supports", () => {
//   test("C22818 Verify for the backupBucket for S3 import, only AFE 2.0 supports", async ({io, page}) => {
//       await io.fillFormUI(C22817, "FLOWS");
//       await page.locator(selectors.flowBuilderPagePO.TRANSFER).nth(1).click();
//       await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
//       await io.flowBuilder.click(`${selectors.importPagePO.BACKUP_BUCKET} ${selectors.basePagePO.HANDLEBAR_EDITOR}`);
//       expect(page.getByText('AFE 1.0')).not.toBeVisible();
//       expect(page.getByText('AFE 2.0')).not.toBeVisible();
//   });
// });

//--------- MANIKANTHA ----------------

//--------- BHANU ---------------------

// test.describe("C48963 Verify 'Actions to take if source value not found' options functionality for ObjectArray Data type", () => {
//   test("C48963 Verify 'Actions to take if source value not found' options functionality for ObjectArray Data type", async ({io, page}) => {
//       await io.fillFormUI(C48963, "FLOWS");
//       await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
//       await page.getByLabel("Settings").nth(3).click();
//       await io.importsPage.click(selectors.mappings.Mapper2dot0PO.DEFAULT_MAPPING);
//       await io.importsPage.click(selectors.mappings.Mapper2dot0PO.USE_NULL);
//       await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
//       await io.importsPage.waitForElementAttached(selectors.mappings.Mapper2dot0PO.PREVIEW);
//       await io.importsPage.click(selectors.mappings.Mapper2dot0PO.PREVIEW);
//       await io.importsPage.delay(1000);
//       const val = JSON.parse(await page.locator(selectors.mappings.Mapper2dot0PO.RESULT).evaluate(e => {
//         // @ts-ignore
//         const editor = ace.edit(e);
//         return editor.getValue();
//       }));

//       expect(val.company).toBe(null);

//   });
// });

// test.describe("C44937 Verify 'Actions to take if source value not found' options functionality for NUMBER ARRAY with Hardcode mapping", () => {
//   test("C44937 Verify 'Actions to take if source value not found' options functionality for NUMBER ARRAY with Hardcode mapping", async ({io, page}) => {
//       await io.fillFormUI(C48963, "FLOWS");
//       await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
//       await page.getByLabel("Settings",{exact:true}).nth(4).click();
//       await io.importsPage.click(selectors.mappings.Mapper2dot0PO.MAPPING_TYPE);
//       await io.importsPage.click(selectors.mappings.Mapper2dot0PO.HARDCODED_OPTION);
//       await io.importsPage.fill(selectors.mappings.Mapper2dot0PO.HARDCODED_DEFAULT_INPUT, 'test_company');
//       await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
//       await io.importsPage.waitForElementAttached(selectors.mappings.Mapper2dot0PO.PREVIEW);
//       await io.importsPage.click(selectors.mappings.Mapper2dot0PO.PREVIEW);
//       await io.importsPage.delay(2000);
//       const val = JSON.parse(await page.locator(selectors.mappings.Mapper2dot0PO.RESULT).evaluate(e => {
//         // @ts-ignore
//         const editor = ace.edit(e);
//         return editor.getValue();
//       }));

//       expect(val.company).toBe('test_company');

//   });
// });

// test.describe("C46906 Verify by adding the duplicate mappings for 'destination record' and  do not enter the  'Source record field' value for one of the mapping  in Mapper2.0", () => {
//   test("C46906 Verify by adding the duplicate mappings for 'destination record' and  do not enter the  'Source record field' value for one of the mapping  in Mapper2.0", async ({io, page}) => {
//       await io.fillFormUI(C46906, "FLOWS");
//       await page.locator(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR).nth(1).click();
//       await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

//       await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(0).fill('test');
//       await page.getByLabel('add',{exact: true}).nth(0).click();
//       await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER).nth(1).fill('test');
//       await io.importsPage.click(selectors.mappings.Mapper2dot0PO.PREVIEW);

//       const errorMessage = await page.locator('#error').evaluate(e => {
//                 // @ts-ignore
//                 const editor = ace.edit(e);
//                 return editor.getValue();
//               });
//       expect(errorMessage).toBe('Mapper 2.0: Duplicate destination field(s): test');
      
//   });
// });




//---------- BHANU ---------------------

//---------- MAHESH --------------------

// test.describe("C21052 When Opened Mapping from settings page for Database, Http related flows instead of the builder forms, Presented with extract and generate form", () => {
//   test("C21052 When Opened Mapping from settings page for Database, Http related flows instead of the builder forms, Presented with extract and generate form", async ({io, page}) => {
//       await io.fillFormUI(C21052, "FLOWS");
//       await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
//       await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C21052');
//       await page.getByLabel("Add mapping").nth(0).click();
//       await io.flowBuilder.waitForElementAttached('text="SQL query builder"');
//       expect(page.getByText("SQL query builder")).toBeVisible();
//   });
// });

// test.describe("C51623 Verify the Scroll bar for Message column in the Error rows page of New view by navigating from the Current View", () => {
//     test("C51623 Verify the Scroll bar for Message column in the Error rows page of New view by navigating from the Current View", async ({io, page}) => {
//         const errorFlowId = await io.fillFormUI(C51661, "FLOWS");
//         await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
//         const lastRun = page.getByText('Last run')
//         await lastRun.waitFor({state: 'visible'});
//         await page.getByText("1 error").nth(1).click();
//         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN)
//         await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
//         const options = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
//         options[1].click();
//         await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
//         expect(await io.flowBuilder.isScrollable(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_MESSAGE_COLUMN)).toBe(false);
//     });
// });
//========== PENDO ZENDESK / divjot==================

// test.describe('C55918 Verify by clicking on the "Get in touch" option in the Pendo-Zendesk chat bot when the agent is online', () => {
//   test('C55918 Verify by clicking on the "Get in touch" option in the Pendo-Zendesk chat bot when the agent is online', async ({page,io}) => {
//     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//     await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
//     await io.homePage.delay(3000);
//     const chatbot = await page.$$(selectors.basePagePO.CHAT_BOT);
//     if(chatbot.length === 0){
//       const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//       await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//     }

//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
//     if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
//       await io.homePage.click(selectors.basePagePO.CHAT_BOT);
//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
//     await page.locator(selectors.basePagePO.CHAT_BOT_OPTIONS).nth(0).click();

//     const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
//     expect(await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE).innerText()).toBe("Leave a message");
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//   });
// });

// test.describe('C55928 Verify the functionality by clicking on the "Leave a message" link in the Pendo-zendesk chat bot', () => {
//   test('C55928 Verify the functionality by clicking on the "Leave a message" link in the Pendo-zendesk chat bot', async ({page,io}) => {
//     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//     await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
//     await io.homePage.delay(3000);
//     const chatbot = await page.$$(selectors.basePagePO.CHAT_BOT);
//     if(chatbot.length === 0){
//       const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//       await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//     }
  
//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
//     if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
//       await io.homePage.click(selectors.basePagePO.CHAT_BOT);
//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
//     await page.locator(selectors.basePagePO.CHAT_BOT_OPTIONS).nth(0).click();

//     const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE).click();
//     expect(iframe.locator(selectors.homePagePO.PENDO_ZENDESK.BACK_ICON)).toBeVisible();
//     expect(iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON)).toBeVisible();
//     expect( await iframe.locator(`${selectors.homePagePO.PENDO_ZENDESK.SCROLL_CONTAINER_CONTENT} h2`).innerText()).toBe("Please select your issue");

//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//   });
// });

// test.describe('C55934 Verify the auto -populated "Name" & "Email"  fields in Pendo-zendesk chat bot when we login to a shared account which has admin access', () => {

//   test('C55934 Verify the auto -populated "Name" & "Email"  fields in Pendo-zendesk chat bot when we login to a shared account which has admin access', async ({page,io}) => {
//     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//     await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
//     await io.homePage.delay(3000);
//     const chatbot = await page.$$(selectors.basePagePO.CHAT_BOT);
//     if(chatbot.length === 0){
//       const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//       await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//     }

//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
//     if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
//       await io.homePage.click(selectors.basePagePO.CHAT_BOT);
//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
//     await page.locator(selectors.basePagePO.CHAT_BOT_OPTIONS).nth(0).click();

//     const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE).click();
//     await iframe.getByText("Other").click();
//     const getInputValue = async (label: string) =>
//     await iframe
//       .getByText(label)
//       .evaluate(e =>
//         e.parentElement.parentElement.nextElementSibling.getAttribute("value")
//       );
//     const getFullLabelText = async (label: string) =>
//       await iframe.getByText(label).evaluate(e => e.parentElement.innerText);
//     const yourNameInputValue = await getInputValue("Your name");
//     const emailInputValue = await getInputValue("Email address");
//     const subjectLabel = await getFullLabelText("Subject");
//     const descriptionLabel = await getFullLabelText("Description");
//     const environmentLabel = await getFullLabelText("Environment");
//     expect(yourNameInputValue).not.toBe("");
//     expect(emailInputValue).not.toBe("");
//     expect(subjectLabel).not.toContain("optional");
//     expect(descriptionLabel).not.toContain("optional");
//     expect(environmentLabel).not.toContain("optional");

//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//   });
// });

// test.describe('C55930 Verify the "Message Sent" form of the Pendo-zendesk chat bot', () => {
//   test('C55930 Verify the "Message Sent" form of the Pendo-zendesk chat bot', async ({page,io}) => {
//     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//     await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
//     await io.homePage.delay(3000);
//     const chatbot = await page.$$(selectors.basePagePO.CHAT_BOT);
//     if(chatbot.length === 0){
//       const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//       await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//     }

//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
//     if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
//       await io.homePage.click(selectors.basePagePO.CHAT_BOT);
//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
//     await page.locator(selectors.basePagePO.CHAT_BOT_OPTIONS).nth(0).click();

//     const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE).click();
//     await iframe.getByText("Other").click();

//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.SUBJECT).fill('Test');
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.DISCRIPTION).fill('Test');
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.DROPDOWN_FIELDS).nth(1).click();
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.DROPDOWN_MENU_ITEMS).nth(0).click();
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.BUTTON).click();

//     expect(await iframe.locator(`${selectors.homePagePO.PENDO_ZENDESK.SCROLL_CONTAINER_CONTENT} h2`).innerText()).toBe("Thanks for reaching out");
//     expect(await iframe.locator(`${selectors.homePagePO.PENDO_ZENDESK.SCROLL_CONTAINER_CONTENT} p`).innerText()).toBe("Someone will get back to you soon");
//     expect(await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.BUTTON).innerText()).toBe("Go Back");
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//   });
// });
//------------
// test.describe('C66906 Verify the auto -populated ""Name"" & ""Email"" fields in Pendo-zendesk chat bot when we login to a shared account which has only Monitor access', () => {

//   test('C66906 Verify the auto -populated ""Name"" & ""Email"" fields in Pendo-zendesk chat bot when we login to a shared account which has only Monitor access', async ({page,io}) => {
//     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//     await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
//     await io.homePage.delay(3000);
//     const chatbot = await page.$$(selectors.basePagePO.CHAT_BOT);
//     if(chatbot.length === 0){
//       const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//       await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//     }

//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
//     if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
//       await io.homePage.click(selectors.basePagePO.CHAT_BOT);
//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
//     await page.locator(selectors.basePagePO.CHAT_BOT_OPTIONS).nth(0).click();

//     const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE).click();
//     await iframe.getByText("Other").click();
//     const getInputValue = async (label: string) =>
//     await iframe
//       .getByText(label)
//       .evaluate(e =>
//         e.parentElement.parentElement.nextElementSibling.getAttribute("value")
//       );
//     const getFullLabelText = async (label: string) =>
//       await iframe.getByText(label).evaluate(e => e.parentElement.innerText);
//     const yourNameInputValue = await getInputValue("Your name");
//     const emailInputValue = await getInputValue("Email address");
//     const subjectLabel = await getFullLabelText("Subject");
//     const descriptionLabel = await getFullLabelText("Description");
//     const environmentLabel = await getFullLabelText("Environment");
//     expect(yourNameInputValue).not.toBe("");
//     expect(emailInputValue).not.toBe("");
//     expect(subjectLabel).not.toContain("optional");
//     expect(descriptionLabel).not.toContain("optional");
//     expect(environmentLabel).not.toContain("optional");

//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//   });
// });

// test.describe('C66905 Verify the auto -populated ""Name"" & ""Email"" fields in Pendo-zendesk chat bot when we login to a shared account which has only Manage access', () => {

//   test('C66905 Verify the auto -populated ""Name"" & ""Email"" fields in Pendo-zendesk chat bot when we login to a shared account which has only Manage access', async ({page,io}) => {
//     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//     await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
//     await io.homePage.delay(3000);
//     const chatbot = await page.$$(selectors.basePagePO.CHAT_BOT);
//     if(chatbot.length === 0){
//       const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//       await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//     }

//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT);
//     if (!(await io.homePage.isVisible(selectors.basePagePO.CHAT_BOT_OPTIONS)))
//       await io.homePage.click(selectors.basePagePO.CHAT_BOT);
//     await io.homePage.waitForElementAttached(selectors.basePagePO.CHAT_BOT_OPTIONS);
//     await page.locator(selectors.basePagePO.CHAT_BOT_OPTIONS).nth(0).click();

//     const iframe = page.frameLocator(selectors.homePagePO.PENDO_ZENDESK.PENDO_ZENDESK_IFRAME);
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.GET_IN_TOUCH).click();
//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.LEAVE_A_MESSAGE).click();
//     await iframe.getByText("Other").click();
//     const getInputValue = async (label: string) =>
//     await iframe
//       .getByText(label)
//       .evaluate(e =>
//         e.parentElement.parentElement.nextElementSibling.getAttribute("value")
//       );
//     const getFullLabelText = async (label: string) =>
//       await iframe.getByText(label).evaluate(e => e.parentElement.innerText);
//     const yourNameInputValue = await getInputValue("Your name");
//     const emailInputValue = await getInputValue("Email address");
//     const subjectLabel = await getFullLabelText("Subject");
//     const descriptionLabel = await getFullLabelText("Description");
//     const environmentLabel = await getFullLabelText("Environment");
//     expect(yourNameInputValue).not.toBe("");
//     expect(emailInputValue).not.toBe("");
//     expect(subjectLabel).not.toContain("optional");
//     expect(descriptionLabel).not.toContain("optional");
//     expect(environmentLabel).not.toContain("optional");

//     await iframe.locator(selectors.homePagePO.PENDO_ZENDESK.MINUS_ICON).click();
//   });
// });

// test.describe("C93992 Verify 'Script is required'/'Function is required' validations on all hooks,(transform,input-output,branching) filter", () => {
//   test("C93992 Verify 'Script is required'/'Function is required' validations on all hooks,(transform,input-output,branching) filter", async ({io, page}) => {
//       await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
//       await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
//       await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
//       await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
//       await page.getByRole('menuitem', { name: 'Add branching' }).click();
//       await io.flowBuilder.click('[data-test="JavaScript"]');
//       let errorMessage = await page.locator('#error').evaluate(e => {
//           // @ts-ignore
//           const editor = ace.edit(e);
//           return editor.getValue();
//         });
//       expect(errorMessage).toBe('Script is required');

//       await io.flowBuilder.click('#scriptId');
//       await page.locator("[role='listbox'] li").nth(1).click();
//       await io.flowBuilder.fill('#entryFunction','');
//       errorMessage = await page.locator('#error').evaluate(e => {
//         // @ts-ignore
//         const editor = ace.edit(e);
//         return editor.getValue();
//       });
//       expect(errorMessage).toBe('Function is required');

//   });
// });

// test.describe("C93992 Verify 'Script is required'/'Function is required' validations on all hooks,(transform,input-output,branching) filter", () => {
//   test("C93992 Verify 'Script is required'/'Function is required' validations on all hooks,(transform,input-output,branching) filter", async ({io, page}) => {
//       await io.fillFormUI(C93992, "FLOWS")
//       await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]');
//       await page.locator('[data-test="addDataProcessor"]').nth(0).click();
//       await io.flowBuilder.click('[data-test="exportFilter"]');
//       await io.flowBuilder.click('[data-test="JavaScript"]');
//       await io.flowBuilder.click('#scriptId');
//       await page.locator("[role='listbox'] li").nth(1).click();
//       await io.flowBuilder.fill('#entryFunction','');
//       const errorMessage = await page.locator('#error').evaluate(e => {
//         // @ts-ignore
//         const editor = ace.edit(e);
//         return editor.getValue();
//       });
//       expect(errorMessage).toBe('Function is required');

//   });
// });

// test.describe("C93992 Verify 'Script is required'/'Function is required' validations on all hooks,(transform,input-output,branching) filter", () => {
//   test("C93992 Verify 'Script is required'/'Function is required' validations on all hooks,(transform,input-output,branching) filter", async ({io, page}) => {
//       await io.fillFormUI(C93992, "FLOWS")
//       await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]');
//       await page.locator('[data-test="addDataProcessor"]').nth(1).click();
//       await io.flowBuilder.click('[data-test="importFilter"]');
//       await io.flowBuilder.click('[data-test="JavaScript"]');
//       await io.flowBuilder.click('#scriptId');
//       await page.locator("[role='listbox'] li").nth(1).click();
//       await io.flowBuilder.fill('#entryFunction','');
//       const errorMessage = await page.locator('#error').evaluate(e => {
//         // @ts-ignore
//         const editor = ace.edit(e);
//         return editor.getValue();
//       });
//       expect(errorMessage).toBe('Function is required');

//   });
// });

// test.describe("C93992 Verify 'Script is required'/'Function is required' validations on all hooks,(transform,input-output,branching) filter", () => {
//   test("C93992 Verify 'Script is required'/'Function is required' validations on all hooks,(transform,input-output,branching) filter", async ({io, page}) => {
//       await io.fillFormUI(C93992, "FLOWS")
//       await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]');
//       await page.locator('[data-test="addDataProcessor"]').nth(1).click();
//       await io.flowBuilder.click('[data-test="exportTransformation"]');
//       await io.flowBuilder.click('[data-test="JavaScript"]');
//       await io.flowBuilder.click('#scriptId');
//       await page.locator("[role='listbox'] li").nth(1).click();
//       await io.flowBuilder.fill('#entryFunction','');
//       const errorMessage = await page.locator('#error').evaluate(e => {
//         // @ts-ignore
//         const editor = ace.edit(e);
//         return editor.getValue();
//       });
//       expect(errorMessage).toBe('Function is required');
//   });
// });



//========== PENDO ZENDESK / divjot ==================
//=========== SAI =====================================

//============= sai =======================
// test.describe("C68107 Verify application does not crash when user saves the un-named branch", () => {
//   test("C68107 Verify application does not crash when user saves the un-named branch", async ({io, page}) => {
//       await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
//       await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
//       await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
//       await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
//       await page.getByRole('menuitem', { name: 'Add branching' }).click();
//       await page.locator('.MuiAccordionSummary-gutters .MuiBox-root .MuiBox-root').nth(0).click({clickCount: 3});
//       await page.keyboard.press('Backspace');
//       await io.flowBuilder.click(selectors.basePagePO.SAVE);
//       await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION, 'Notification did not appear');
//   });
// });
// test.describe("C59975 Verify User is able to see the script under flow dashboard for flow branching", () => {
//   test("C59975 Verify User is able to see the script under flow dashboard for flow branching", async ({io, page}) => {
//       await io.fillFormUI(C55975, "FLOWS");
//       await io.flowBuilder.waitForElementAttached('[data-test="addDataProcessor"]');
//       await page.locator('[data-test="addDataProcessor"]').nth(1).click();
//       await io.flowBuilder.click('[data-test="pageProcessorHooks"]');
//       await io.flowBuilder.fill('[name="script-preMap"]', 'test premap');
//       await page.pause();
//       await page.locator('[data-test="scriptId"]').nth(0).click();
//       await page.getByRole('menuitem').nth(1).click();
//       await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
//       await io.flowBuilder.click('[data-test="scripts"]');
//       const scriptList = await page.locator('#tabpanel-3 tbody tr').all();
//       expect(scriptList.length).toBe(1);
//   });
// });

// test.describe("C28390 Verify breadcrumbs navigation for Account dashboard", () => {
//   test("C28390 Verify breadcrumbs navigation for Account dashboard", async ({io, page}) => {
//       await io.homePage.navigateTo('https://qa.staging.integrator.io/dashboard');
//       await io.homePage.waitForElementAttached('[aria-label="breadcrumb"]');
//       const breadcrumbList = await page.locator('[aria-label="breadcrumb"] li').all();
//       await page.pause();
//       expect(breadcrumbList.length).toBe(3);
//       expect(breadcrumbList[0].innerText()).toBe('Home');
//       expect(breadcrumbList[2].innerText()).toBe('Dashboard');
//   });
// });

// test.describe("C28383 Verify Dashboard is added in the left navigation bar below Home button", () => {
//   test("C28383 Verify Dashboard is added in the left navigation bar below Home button", async ({io, page}) => {
//       await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
//       await io.homePage.waitForElementAttached('.MuiDrawer-paperAnchorLeft ul a');
//       const leftBarAnchors = await page.locator('.MuiDrawer-paperAnchorLeft ul a').all();
//       expect(await leftBarAnchors[0].getAttribute('data-test')).toBe('Home');
//       expect(await leftBarAnchors[1].getAttribute('data-test')).toBe('account-dashboard');
//   });
// });

// test.describe("C28383 Verify Dashboard is added in the left navigation bar below Home button", () => {
//   test("C28383 Verify Dashboard is added in the left navigation bar below Home button", async ({io, page}) => {
//       await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
//       await io.myAccountPage.click('[data-test="Data retention"]');
//       await page.reload();
//       await io.assert.verifyElementIsDisplayed('[data-test="dataRetentionPeriod"]', 'Not reloaded properly');
//   });
// });

test.describe("C2467 Verified all the possible pop-ups and they are closed on click.", () => {
  test("C2467 Verified all the possible pop-ups and they are closed on click.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await page.locator('[data-test="integration-tiles"]', {hasText: 'Automation Flows'}).nth(0).locator('[data-test="openActionsMenu"]').click();
      await page.locator('[data-test="deleteIntegration"]').click();
      await io.assert.verifyElementIsDisplayed('[role="dialog"]', 'Pop up did not appear');
      await io.fillFormUI(C2467, 'FLOWS');
      await io.flowBuilder.click('[data-test="remove-pg"]');
      await io.assert.verifyElementIsDisplayed('[role="dialog"]', 'Pop up did not appear');
      await io.flowBuilder.click('[data-test="Cancel"]');
      await io.flowBuilder.click('[data-test="remove-pp"]');
      await io.assert.verifyElementIsDisplayed('[role="dialog"]', 'Pop up did not appear');
  });
});
});
