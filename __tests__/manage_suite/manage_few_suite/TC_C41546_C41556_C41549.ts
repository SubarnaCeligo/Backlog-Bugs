import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41546_C41556_C41549 To verify create pull button is displayed under 'Revisions' tab for DIY integration(users who has Account level manage access)", () => {
  test("@Zephyr-IO-T427 @Zephyr-IO-T437 @Zephyr-IO-T430 @Env-All C41546_C41556_C41549 To verify create pull button is displayed under 'Revisions' tab for DIY integration(users who has Account level manage access)", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Revisions", 0);
    await io.assert.verifyElementIsDisplayed(selectors.integrationPagePO.CREATE_PULL,
      "Element is not displayed properly"
    );
  });
});
