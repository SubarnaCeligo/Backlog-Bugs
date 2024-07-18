import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C69560 Key search field text is changing to Undefined once user search any flow`, () => {
  test(`@Env-All @Zephyr-IO-T11239 C69560 Key search field text is changing to Undefined once user search any flow`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env.IO_Integration_URL + "flows");
    await io.flowBuilder.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "test"
    );
    await io.flowBuilder.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      ""
    );
    await io.assert.verifyElementAttribute(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "placeholder",
      "Search…"
    );
  });
});
