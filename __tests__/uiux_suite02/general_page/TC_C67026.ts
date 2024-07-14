import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C67026 To verify that the delete operation other than in action menu drop down should not be in red colour', () => {
    test('@Env-All @Zephyr-IO-T24314 C67026 To verify that the delete operation other than in action menu drop down should not be in red colour', async ({page,io}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.waitForElementAttached(selectors.integrationPagePO.DELETE_INTEGRATION);
      const color = await page.locator(selectors.integrationPagePO.DELETE_INTEGRATION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectNotToBeValue(color,"rgb(217, 83, 79)","Color not red");
    });
  });