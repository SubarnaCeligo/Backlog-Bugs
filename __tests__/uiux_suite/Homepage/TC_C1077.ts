import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1077 Verify that the newly created Integration displays as a tile in Home page", () => {
  test("C1077 Verify that the newly created Integration displays as a tile in Home page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await page.getByRole("button", { name: "Create" }).click();
    await io.homePage.addStep("Clicked on 'Create' button");
    // TODO replace: selectors.homePagePO.CREATE_NEW_INTEGRATION
    await io.homePage.click('[data-test="newIntegration"]');
    await io.homePage.fill(selectors.basePagePO.NAME, "C1077");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await expect(page.getByText("C1077").first()).toBeVisible();
    await io.homePage.addStep(
      "Verified 'C1077' intrgration tile is visible in the home page"
    );
  });
});
