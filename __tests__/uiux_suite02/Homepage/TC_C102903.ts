import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102903 Verify User is able to navigate to correct window on clicking any option from nav bar", () => {
  test("@Env-All @Zephyr-IO-T22204 C102903 Verify User is able to navigate to correct window on clicking any option from nav bar", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.basePagePO.RESOURCES);
    await io.homePage.addStep("Hovered over 'Resources'");
    await io.homePage.click(selectors.basePagePO.IMPORTS);
    await io.assert.expectToBeValue(
      page.url(),
      `${process.env.IO_UI_CONNECTOR_URL}imports`,
      "User is not navigated to correct window on clicking 'Imports' option from nav bar"
    );
  });
});
