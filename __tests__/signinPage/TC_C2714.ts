import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2714_Verify What's New? link on the Product header navigates to latest release notes document", () => {
  test("@Env-All @Zephyr-IO-T874 C2714_Verify What's New? link on the Product header navigates to latest release notes document UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.HELP_CENTER);
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HELP_CENTER, 'Help center page link not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.COMMUNITY, 'Community page link not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.WHATS_NEW, 'Whats new page link not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT_A_TICKET, 'Submit a ticket page link not displayed');
    await io.homePage.click(selectors.basePagePO.WHATS_NEW)
    // Validating latest release notes document
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.CELIGO_LOGO, "Celigo logo is not displayed");

  });
}
);
