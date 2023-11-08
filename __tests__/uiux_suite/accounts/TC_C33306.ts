import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from '@testData/Flows/C33306.json';


function isRelativeTimeFormat(timeText) {
  return /ago|minutes|hours|days|weeks|months|year|now|Just/i.test(timeText);
}
function isValidLocalTimeFormat(timeText) {
  const timePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]\s*(am|pm)$/;
   return /am|pm/i.test(timeText);
}


test.describe("C33306 Verify in Timestamp and Resolved at columns in Resolved errors section are displayed in relative format and the vice versa.", () => {
    test("C33306 Verify in Timestamp and Resolved at columns in Resolved errors section are displayed in relative format and the vice versa.", async ({io, page}) => {
    
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX)
      const inputElement = await page.$(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX);
      const valueAttribute = await inputElement.getAttribute('value');
      if(valueAttribute === 'false')
      {
        await io.myAccountPage.click(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX)
        await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE)
      }
      const id = await io.createResourceFromAPI(testData,"FLOWS");
      await io.api.runBatchFlowViaAPI('TC_50858', id);
      const lastRun = page.getByText('Last run')
      await lastRun.waitFor({state: 'visible', timeout: 180000});
      const timeString = await io.flowBuilder.getText('[aria-label="local date time"]')    
      
      const isRelativeTime = isRelativeTimeFormat(timeString[0]);
      await io.assert.expectToBeTrue(isRelativeTime, "not in a relative time format")

      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click('input[name="showRelativeDateTime"]')
      await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE)
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.clickByText("Automation Flows")
      await io.homePage.clickByTextByIndex("TC_50858",0)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS)

      const timeStringlocal = await io.flowBuilder.getText('[aria-label="relative date time"]')
      const isLocalTime = isValidLocalTimeFormat(timeStringlocal[0])

      await io.assert.expectToBeTrue(isLocalTime, "Not in local time")
    });
  });