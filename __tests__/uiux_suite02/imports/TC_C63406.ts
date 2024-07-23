import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C63406 from '@testData/Flows/TC_C63406.json';

test.describe("C63406 Verify when Number of records per HTTP Import request is set to greater than 1 then the field 'Path to records in HTTP response body' under Non-standard API response patterns should be set to required.", () => {
  test("@Env-All @Zephyr-IO-T21667 C63406 Verify when Number of records per HTTP Import request is set to greater than 1 then the field 'Path to records in HTTP response body' under Non-standard API response patterns should be set to required.", async ({io, page}) => {
      await io.createResourceFromAPI(C63406,"FLOWS");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
      await io.flowBuilder.waitForElementAttached(selectors.importPagePO.NUMBER_OF_RECORDS_PER_HTTP_REQUEST);
      await io.flowBuilder.fill(selectors.importPagePO.NUMBER_OF_RECORDS_PER_HTTP_REQUEST, '2');
      await io.flowBuilder.waitForElementAttached(selectors.importPagePO.PATH_TO_RECORDS_IN_HTTP_RESPONSE_BODY_HTTP);
      const isRequired = await page.locator(selectors.importPagePO.PATH_TO_RECORDS_IN_HTTP_RESPONSE_BODY_HTTP).evaluate(element => 'required' in element);
      expect(isRequired).toBe(true);
  });
});