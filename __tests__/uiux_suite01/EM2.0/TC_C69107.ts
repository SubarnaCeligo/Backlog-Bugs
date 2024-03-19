import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C69107 Verify search is working correctly on Error windows", () => {
  test("C69107 Verify search is working correctly on Error windows  ", async ({io, page}) => {
       await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
       await io.homePage.clickByText("Automation Flows")
       await io.homePage.clickByText("C69107_DND")
       await io.homePage.clickByTextByIndex("3 errors",1)
       await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "4:28:02 pm")
      const rowCount = await page.$$eval(selectors.basePagePO.ERROR_ROW_SELECTOR, rows => rows.length);
      await io.assert.expectToBeValue(rowCount.toString(), "1", 'Expected only one row to be present');
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.TIMESTAMP_ROW_COULUM)
      const timestampText = await io.flowBuilder.getText(selectors.basePagePO.TIMESTAMP_ROW_COULUM)
      const expectedTimestamp = '11/13/2023 4:28:02 pm';
      await io.assert.expectToBeValue(timestampText.toString(), expectedTimestamp, 'Timestamp does not match the expected value');
  });
});