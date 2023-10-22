import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65649 To verify that the user is able to view the 'Transfer file from the source application option' for NS Export.", () => {
  test("C65649 To verify that the user is able to view the 'Transfer file from the source application option' for NS Export.", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
      await io.flowBuilder.click('[data-test="NetSuite"]');
      await io.assert.verifyElementIsDisplayed('[data-value="transferFiles"]', 'Transfer file from source application option not displayed');
  });
});