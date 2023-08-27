import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C56565 from '../../testData/Flows/TC_C56565.json'

test.describe("C56565 Verify when (input, textarea, date) fieldType is selected in export query parameters, user is presented with input text field to enter the value", () => {
  test.only("C56565 Verify when (input, textarea, date) fieldType is selected in export query parameters, user is presented with input text field to enter the value", async ({io, page}) => {
      await io.fillFormUI(C56565,"FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
      await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_RESOURCE);
      await page.getByRole('menuitem', { name: 'Content', exact: true }).click();
      await io.flowBuilder.click(selectors.importPagePO.ASSISTANT_METADATA_OPERTAION);
      await page.getByRole('menuitem', { name: 'Get Content', exact: true }).click();
      await io.flowBuilder.waitForElementAttached(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
      await io.flowBuilder.click(selectors.importPagePO.QUERY_PARAMETER_NAME_0);
      await page.locator(selectors.basePagePO.MENU_ITEM).nth(0).click();
      await io.flowBuilder.fill(selectors.importPagePO.QUERY_PARAMETER_VALUE_0, 'testValue');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.delay(1000);
      expect(await page.$(selectors.basePagePO.SAVE_AND_CLOSE)).toBe(null);
      expect(page.locator(selectors.flowBuilderPagePO.EXPORT)).toBeVisible();
  });
});