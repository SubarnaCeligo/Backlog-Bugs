import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T28944_T28945_T28946_T28947 Verify the audit log retention for all tiers.", () => {
  const upgradeNotificationText =
    "More options available - Upgrade your account for longer audit log periods.";

  test("T28944_T28945_T28946_T28947 @Zephyr-IO-T28944 @Zephyr-IO-T28945 @Zephyr-IO-T28946 @Zephyr-IO-T28947 @Env-qa @Priority-P2 Verify the audit log retention for all tiers.", async ({
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

    //  ------------------------Free Tier--------------------------   //

    await io.homePage.addStep("Updating license to free tier.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "free"
    });

    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.AUDIT_LOG);
    await page.waitForLoadState("load", { timeout: 60000 });

    const upgradeNotificationText_free = await io.myAccountPage.getText(
      selectors.basePagePO.NOTIFICTION_BAR
    );
    expect(upgradeNotificationText_free).toEqual(upgradeNotificationText);
    await io.homePage.addStep("Verified. Info message displayed for free tier.");

    //  ------------------------Standard Tier-------------------------   //

    await io.homePage.addStep("Updating license to standard tier.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "standard"
    });

    await io.homePage.reloadPage();
    const upgradeNotificationText_standard = await io.myAccountPage.getText(
      selectors.basePagePO.NOTIFICTION_BAR
    );
    expect(upgradeNotificationText_standard).toEqual(upgradeNotificationText);
    await io.homePage.addStep(
      "Verified. Info message displayed for standard tier."
    );

    //  ---------------------Professional Tier---------------------------   //

    await io.homePage.addStep("Updating license to professional tier.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "professional"
    });

    await io.homePage.reloadPage();
    const upgradeNotificationText_professional = await io.myAccountPage.getText(
      selectors.basePagePO.NOTIFICTION_BAR
    );
    expect(upgradeNotificationText_professional).toEqual(upgradeNotificationText);
    await io.homePage.addStep(
      "Verified. Info message displayed for professional tier."
    );

    //  --------------------Enterprise Tier------------------------------   //

    await io.homePage.addStep("Updating license to enterprise tier.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "enterprise"
    });

    await io.homePage.reloadPage();
    expect(page.getByText(upgradeNotificationText)).not.toBeVisible();
    await io.homePage.addStep(
      "Verified. Info message NOT displayed for enterprise tier."
    );

    //  Reverting license changes
    await io.homePage.addStep("Reverting license changes.");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  });
});
