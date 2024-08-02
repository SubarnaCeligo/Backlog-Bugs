import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as testData from "@testData/Marketplace/C22282.json";

test.describe(`C22282 Verify, when the description is large on the tile, scroll bar needs to present`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "marketplace"
    );
  });

  test(`@Env-All @Zephyr-IO-T2173 C22282 Verify, when the description is large on the tile, scroll bar needs to present`, async ({
    io,
    page
  }) => {
    await io.homePage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      testData.search
    );
    const description = page.getByText(testData.description);
    const isScrollable = await description.evaluate(
      e => e.parentElement.scrollHeight > e.parentElement.clientHeight
    );
    await io.assert.expectToBeTrue(isScrollable, "Description is not scrollable");
  });
});
