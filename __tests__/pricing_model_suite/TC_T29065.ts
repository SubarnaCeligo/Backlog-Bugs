import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T29065 Verify the audit log retention for different license type ( Standard, Professional, Enterprise ) for Sandbox account.", () => {
  const upgradeNotificationText =
    "More options available - Upgrade your account for longer audit log periods.";

  test("T29065 @Zephyr-IO-T29065  @Env-All @Priority-P2 Verify the audit log retention for different license type ( Standard, Professional, Enterprise ) for Sandbox account.", async ({
    io,
    page
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true
    };

    await io.homePage.addStep(
      "Updating license to standard tier and enabled sandbox."
    );
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "standard",
      sandbox: true
    });

    await io.homePage.addStep("Switching to sandbox mode.");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.AUDIT_LOG);
    await page.waitForLoadState("load", { timeout: 60000 });

    const upgradeNotificationText_standard = await io.myAccountPage.getText(
      selectors.basePagePO.NOTIFICTION_BAR
    );
    expect(upgradeNotificationText_standard).toEqual(upgradeNotificationText);
    await io.homePage.addStep(
      "Verified. Info message displayed for standard tier."
    );

    //  -----------------------------------------------------------------------------------------   //

    await io.homePage.addStep("Updating license to professional tier.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "professional",
      sandbox: true
    });

    await io.homePage.reloadPage();
    const upgradeNotificationText_professional = await io.myAccountPage.getText(
      selectors.basePagePO.NOTIFICTION_BAR
    );
    expect(upgradeNotificationText_professional).toEqual(upgradeNotificationText);
    await io.homePage.addStep(
      "Verified. Info message displayed for professional tier."
    );

    //  -----------------------------------------------------------------------------------------   //

    await io.homePage.addStep("Updating license to enterprise tier.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "enterprise",
      sandbox: true
    });

    await io.homePage.reloadPage();
    expect(page.getByText(upgradeNotificationText)).not.toBeVisible();
    await io.homePage.addStep(
      "Verified. Info message NOT displayed for enterprise tier."
    );

    //  -----------------------------------------------------------------------------------------   //

    await io.homePage.addStep("Switching back to production mode.");
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.addStep("Reverting license changes.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
