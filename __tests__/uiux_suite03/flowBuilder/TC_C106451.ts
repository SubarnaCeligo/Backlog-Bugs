import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C106451 Verify changed 'X' icon", () => {
  test("C106451 Verify changed 'X' icon", async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("TC_C106451_Flow_DND");
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR);
    await io.homePage.waitForElementAttached(
      selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR
    );
    await io.assert.checkSnapshot(
      selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR,
      "C106451.png"
    );
  });
});
