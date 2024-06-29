import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102560 Verify caret is showing for items where we have sub menu", () => {
  test("@Env-All C102560 Verify caret is showing for items where we have sub menu", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    let flag = await page.locator(selectors.basePagePO.TOOLS_RIGHT_CARET).isVisible()
    if(!flag){
      await io.homePage.click(selectors.basePagePO.DRAWERTOGGLE)
    }
    await expect(
      page
        .locator(selectors.basePagePO.TOOLS_RIGHT_CARET)
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Tools");
    await expect(
      page
        .locator(selectors.basePagePO.RESOURCE_RIGHT_CARET)
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Resources");
  });
});
