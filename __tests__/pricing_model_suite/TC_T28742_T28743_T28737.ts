import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T28742_T28743_T28737_T29724 Verify the license Entitlements notification(Standard,professional ,Enterprise)", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("T28742 @Zephyr-IO-T28742 @Zephyr-IO-T29724 @Env-All @Priority-P2 Verify the license Entitlements notification whenever the endpoints and flow usage has been exceeded for professional tier", async ({
    io,
    page
  }) => {
    await io.homePage.reloadPage();
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      { ...getLicensePayload(platformLicense), "apiManagement": true, expires: "2044-04-10T13:14:33.363Z", tier: 'professional', numEndpoints: 0, "disableOverage": false }
    );
    await io.homePage.reloadPage();
    await io.homePage.addStep("Switching to Production mode.");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    //await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime()
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();
    await test.step("C28742 T29724 Verify the license Entitlements notification whenever the endpoints and flow usage has been exceeded for professional tie", async () => {
    await io.assert.verifyElementContainsText('[id="notification"]', 'Your account has exceeded its entitlements. Request an upgrade.');
    });
    await io.myAccountPage.loadingTime()
    await io.connectionPage.clickByText("Request an upgrade.");   
    await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DIALOG, "We will contact you to discuss your business needs and recommend an ideal subscription plan.");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
  });
  test("@Zephyr-IO-T28743  @Env-All @Priority-P2 Verify the license Entitlements notification whenever the endpoints and flow usage has been exceeded for enterprise tier", async ({
    io,
    page
  }) => {
    await io.homePage.reloadPage();
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      { ...getLicensePayload(platformLicense), "apiManagement": true,  expires: "2044-04-10T13:14:33.363Z", tier: 'enterprise', numEndpoints: 0, "disableOverage": false }
    );
    await io.homePage.reloadPage();
    await io.homePage.addStep("Switching to Production mode.");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    //await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();
    await test.step("C28743 Verify the license Entitlements notification whenever the endpoints and flow usage has been exceeded for professional tie", async () => {
    await  io.assert.verifyElementContainsText('[id="notification"]', 'Your account has exceeded its entitlements. Request an upgrade.');
    });
    await io.myAccountPage.loadingTime()
    await io.connectionPage.clickByText("Request an upgrade.");   
    await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DIALOG, "We will contact you to discuss your business needs and recommend an ideal subscription plan.");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
  });
  test("@Zephyr-IO-T28737  @Env-All @Priority-P2 Verify the license Entitlements notification whenever the endpoints and flow usage has been exceeded for standard tier", async ({
    io,
    page
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      { ...getLicensePayload(platformLicense), "apiManagement": true,  expires: "2044-04-10T13:14:33.363Z", tier: 'standard', numEndpoints: 0, "disableOverage": false }
    );
    await io.homePage.reloadPage();
    await io.homePage.addStep("Switching to Production mode.");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    //await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();
    await test.step("C28737 Verify the license Entitlements notification whenever the endpoints and flow usage has been exceeded for professional tie", async () => {
    await io.assert.verifyElementContainsText('[id="notification"]', 'Your account has exceeded its entitlements. Request an upgrade.');
    });
    await io.myAccountPage.loadingTime()
    await io.connectionPage.clickByText("Request an upgrade.");   
    await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DIALOG, "We will contact you to discuss your business needs and recommend an ideal subscription plan.");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
  });

});
