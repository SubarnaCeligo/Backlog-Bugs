import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C63406 from '../../testData/Flows/TC_C63406.json'

test.describe("C63406 Verify when Number of records per HTTP Import request is set to greater than 1 then the field 'Path to records in HTTP response body' under Non-standard API response patterns should be set to required.", () => {
  test.only("C63406 Verify when Number of records per HTTP Import request is set to greater than 1 then the field 'Path to records in HTTP response body' under Non-standard API response patterns should be set to required.", async ({io, page}) => {
      await io.fillFormUI(C63406,"FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
      await io.flowBuilder.waitForElementAttached('[data-test="http.batchSize"]');
      await io.flowBuilder.fill('[data-test="http.batchSize"] input', '2');
      await io.flowBuilder.waitForElementAttached('[data-test="http.response.resourcePath"]');
      const isRequired = await page.locator('[data-test="http.response.resourcePath"] input').evaluate(element => 'required' in element);
      expect(isRequired).toBe(true);
  });
});