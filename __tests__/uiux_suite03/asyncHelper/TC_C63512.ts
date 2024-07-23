import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data5 from "@testData/Flows/C63512.json"

test.describe(`C63512 Verify if flow or the integration page is opening after creating an export having cyclic async helper.`, () => {
    test(`@Env-All @Zephyr-IO-T22112 C63512 Verify if flow or the integration page is opening after creating an export having cyclic async helper.`, async ({
      io,
      page
    }) => {
      const id = await io.createResourceFromAPI(data5,"FLOWS");
      await io.api.runBatchFlowViaAPI('ASYNC_HELPER', id);
      const lastRun = page.getByText('Last run')
      await lastRun.waitFor({state: 'visible', timeout: 180000});
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.clickByText("Automation Flows")
      await io.homePage.waitForElementAttached("text='ASYNC_HELPER'")
      await io.homePage.clickByTextByIndex("ASYNC_HELPER",0)
      await io.homePage.waitForElementAttached("text='SOURCES'")
      const sourceElement = await io.homePage.isVisible("text='SOURCES'")
      await io.assert.expectToBeValue(sourceElement.toString(),'true', "Page not loaded")
          
    });
  });
