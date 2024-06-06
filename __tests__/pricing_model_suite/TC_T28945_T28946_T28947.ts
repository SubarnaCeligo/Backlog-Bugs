import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T28945_T28946_T28947 Verify the audit log retention for all tiers.", () => {
  const upgradeNotificationText =
    "More options available - Upgrade your account for longer audit log periods.";

  // test("T28944_T28945_T28946_T28947 @Zephyr-IO-T28944 @Env-All @Priority-P2 Verify the audit log retention for free tiers.", async ({
  //   io,
  //   page
  // }) => {
  //   const licenses = await io.api.getCall("v1/licenses");
  //   const platformLicense = licenses.find(l => l.type === "platform");
  //   const payloadFormat = {
  //     ...getLicensePayload(platformLicense),
  //     expires: "2044-04-10T13:14:33.363Z",
  //     apiManagement: true
  //   };

  //   //  ------------------------Free Tier--------------------------   //

  //   await io.homePage.addStep("Updating license to free tier.");
  //   await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
  //     ...payloadFormat,
  //     tier: "free"
  //   });
  //   await io.homePage.reloadPage();
  //   await io.homePage.loadingTime();
  //   await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  //   await io.myAccountPage.click(selectors.myAccountPagePO.AUDIT_LOG);
  //   await page.waitForLoadState("load", { timeout: 60000 });

  //   const upgradeNotificationText_free = await io.myAccountPage.getText(
  //     selectors.basePagePO.NOTIFICTION_BAR
  //   );
  //   expect(upgradeNotificationText_free).toEqual(upgradeNotificationText);
  //   await io.homePage.addStep("Verified. Info message displayed for free tier.");
  //       //  Reverting license changes
  //       await io.homePage.addStep("Reverting license changes.");
  //       await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, payloadFormat);
  // });
    test("@Zephyr-IO-T28745  @Env-All @Priority-P2 Verify the audit log retention for standard tiers", async ({
      io,page
    }) => {
      await io.homePage.reloadPage();
      const licenses = await io.api.getCall("v1/licenses");
      const platformLicense = licenses.find(l => l.type === "platform");
      await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        {...getLicensePayload(platformLicense),"apiManagement": true,expires: "2044-04-10T13:14:33.363Z",tier: 'standard', numEndpoints: 6,numFlows: 1000,"disableOverage": false}
      );
    //  ------------------------Standard Tier-------------------------   //
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
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
  });
    test("@Zephyr-IO-T28746  @Env-All @Priority-P2 Verify the audit log retention for Professional tiers", async ({
      io,page
    }) => {
      await io.homePage.reloadPage();
      const licenses = await io.api.getCall("v1/licenses");
      const platformLicense = licenses.find(l => l.type === "platform");
      await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        {...getLicensePayload(platformLicense),"apiManagement": true,expires: "2044-04-10T13:14:33.363Z",tier: 'professional', numEndpoints: 7,"numFlows": 101,"disableOverage": false}
      );
    //  ---------------------Professional Tier---------------------------   //
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.AUDIT_LOG);
    await page.waitForLoadState("load", { timeout: 60000 });
  await io.homePage.loadingTime();
    const upgradeNotificationText_professional = await io.myAccountPage.getText(
      selectors.basePagePO.NOTIFICTION_BAR
    );
    expect(upgradeNotificationText_professional).toEqual(upgradeNotificationText);
    await io.homePage.addStep(
      "Verified. Info message displayed for professional tier."
    );
  });
    test("@Zephyr-IO-T28747  @Env-All @Priority-P2 Verify the audit log retention for Enterprise tiers", async ({
      io,
      page
    }) => {
      await io.homePage.reloadPage();
      const licenses = await io.api.getCall("v1/licenses");
      const platformLicense = licenses.find(l => l.type === "platform");
      await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        {...getLicensePayload(platformLicense),"apiManagement": true,expires: "2044-04-10T13:14:33.363Z",tier: 'enterprise', numEndpoints: 1,"disableOverage": false}
      );
    //  --------------------Enterprise Tier------------------------------   //

    await io.homePage.addStep("Updating license to enterprise tier.");
  

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    expect(page.getByText(upgradeNotificationText)).not.toBeVisible();
    await io.homePage.addStep(
      "Verified. Info message NOT displayed for enterprise tier."
    );
  });
});
