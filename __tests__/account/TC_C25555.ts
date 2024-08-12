import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25555 Verify UI validation is present on the form itself", () => {
  test("@Env-All @Zephyr-IO-T1449 C25555 Verify UI validation is present on the form itself", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(
      process.env.IO_UI_CONNECTOR_URL + "myAccount/users/invite"
    );
    await io.myAccountPage.fill(
      selectors.myAccountPagePO.INVITE_EMAIL_TEXTAREA,
      "test"
    );
    await io.assert.verifyElementDisplayedByText(
      "Please enter a valid email address",
      "Validation message is not displayed"
    );
    await io.myAccountPage.fill(
      selectors.myAccountPagePO.INVITE_EMAIL_TEXTAREA,
      "test@test.com"
    );
    await expect(
      page.getByText("Please enter a valid email address")
    ).not.toBeVisible();
  });
});
