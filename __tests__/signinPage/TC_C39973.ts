import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C39973_Verify create flow button is added on the homepage", () => {
  test("@Env-All @Zephyr-IO-T895 C39973_Verify create flow button is added on the homepage UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    // Validating create flow showing
    await io.assert.verifyElementDisplayedByText('Create', "Creating flow is not displayed");

  });
}
);
