import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1077 Verify that the newly created Integration displays as a tile in Home page", () => {
  test("@Env-All @Zephyr-IO-T857 C1077 Verify that the newly created Integration displays as a tile in Home page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.getByRoleClick("button","Create");
    await io.homePage.addStep("Clicked on 'Create' button");
    await io.homePage.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
    await io.homePage.fill(selectors.basePagePO.NAME, "C1077");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await expect(page.getByText("C1077").first()).toBeVisible({ timeout: 20000 });
    await io.homePage.addStep(
      "Verified 'C1077' intrgration tile is visible in the home page"
    );
  });
});
