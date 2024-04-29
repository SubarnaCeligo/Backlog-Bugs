import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1516_Verify once the free trail is started a notification is displayed with the number of trail days at the right top", () => {
  test("@Env-All @Zephyr-IO-T1036 C1516_Verify once the free trail is started a notification is displayed with the number of trail days at the right top UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    // Validating notifications showing
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ARIA_LABEL, "Notifications is not displayed");

  });
}
);
