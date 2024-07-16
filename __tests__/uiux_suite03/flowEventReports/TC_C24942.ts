import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C24942_Admin- Verify able to filter report results by flow", () => {
  test("@Env-All @Zephyr-IO-T4326 C24942_Admin- Verify able to filter report results by flow UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Tools", "Reports");
    await io.homePage.clickByText('Flow events');
     // Validating able to open flow event report filter
    await io.homePage.clickByTextByIndex('Flow events', 1);
  });
});