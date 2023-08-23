import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C56565 from '../../testData/Flows/TC_C56565.json'

test.describe("C56565 Verify when (input, textarea, date) fieldType is selected in export query parameters, user is presented with input text field to enter the value", () => {
  test.only("C56565 Verify when (input, textarea, date) fieldType is selected in export query parameters, user is presented with input text field to enter the value", async ({io, page}) => {
      await io.fillFormUI(C56565,"FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
      await io.flowBuilder.click('[data-test="assistantMetadata.resource"]');
      await page.getByRole('menuitem', { name: 'Content', exact: true }).click();
      await io.flowBuilder.click('[data-test="assistantMetadata.operation"]');
      await page.getByRole('menuitem', { name: 'Get Content', exact: true }).click();
      await io.flowBuilder.waitForElementAttached('#name-0');
      await io.flowBuilder.click('#name-0');
      await page.locator('[role="menuitem"]').nth(0).click();
      await io.flowBuilder.fill('#value-0', 'testValue');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.delay(1000);
      expect(await page.$(selectors.basePagePO.SAVE_AND_CLOSE)).toBe(null);
      expect(page.locator(selectors.flowBuilderPagePO.EXPORT)).toBeVisible();
  });
});