import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data5 from "@testData/Flows/C63512.json"

test.describe(`C63513 Verify if any other flows that are present in the same Integration are accessible.`, () => {
    test(`C63513 Verify if any other flows that are present in the same Integration are accessible.`, async ({
      io,
      page
    }) => {
      const id = await io.createResourceFromAPI(data5,"FLOWS");
      await io.api.runBatchFlowViaAPI('ASYNC_HELPER', id);
      const lastRun = page.getByText('Last run')
      await lastRun.waitFor({state: 'visible', timeout: 180000});
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.clickByText("Automation Flows")
      await io.homePage.waitForElementAttached("text='TC_51661_DND'")
      await io.homePage.clickByText("TC_51661_DND")

      await io.homePage.waitForElementAttached("text='SOURCES'")
      const sorceElement = await io.homePage.isVisible("text='SOURCES'")
      await io.assert.expectToBeValue(sorceElement.toString(),'true', "Page not loaded")
          
    });
  });