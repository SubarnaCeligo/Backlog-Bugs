import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C106451 Verify changed 'X' icon", () => {
  test("C106451 Verify changed 'X' icon @Zephyr-IO-T23736 @Env-All @Priority-P3", async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("C68514_1_DND");
    await io.flowBuilder.loadingTime();
    await io.homePage.hover(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR);
    await io.homePage.waitForElementAttached(
      selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR
    );
  });
});