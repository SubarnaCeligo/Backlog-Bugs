import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C39971 Verify Left side menu is uncollapsed by default", () => {
  test("@Env-All @Zephyr-IO-T882 C39971 Verify Left side menu is uncollapsed by default", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    const leftNav = page.locator(selectors.basePagePO.LEFT_NAV);
    await expect(leftNav).toHaveCSS("width", "160px");
    await io.homePage.addStep("Verified Left Nav is uncollapsed by default");
  });
});
