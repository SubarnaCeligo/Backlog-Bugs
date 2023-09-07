import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as testData from "@testData/Marketplace/C22282.json";

test.describe(`C22282 Verify, when the description is large on the tile, scroll bar needs to present`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
  });

  test(`C22282 Verify, when the description is large on the tile, scroll bar needs to present`, async ({
    io,
    page
  }) => {
    io.homePage.click(selectors.basePagePO.MARKETPLACE);
    io.homePage.clickByText("NetSuite");
    const description = page.getByText(testData.description);
    const isScrollable = await description.evaluate(
      e => e.scrollHeight > e.clientHeight
    );
    expect(isScrollable).toBe(true);
  });
});
