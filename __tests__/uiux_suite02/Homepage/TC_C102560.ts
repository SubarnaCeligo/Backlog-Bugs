import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102560 Verify caret is showing for items where we have sub menu", () => {
  test("@Env-All C102560 Verify caret is showing for items where we have sub menu", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    let flag = await page.locator("[data-test='Tools']>svg").isVisible()
    if(!flag){
      await io.homePage.click(selectors.basePagePO.DRAWERTOGGLE)
    }
    await expect(
      page
        .locator("[data-test='Tools']>svg")
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Tools");
    await expect(
      page
        .locator("[data-test='Resources']>svg")
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Resources");
  });
});
