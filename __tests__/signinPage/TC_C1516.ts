import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("C1516_Verify once the free trail is started a notification is displayed with the number of trail days at the right top", () => {
  test("@Env-All @Zephyr-IO-T1036 C1516_Verify once the free trail is started a notification is displayed with the number of trail days at the right top UI_Backlog", async ({ io, page }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2025-04-10T13:14:33.363Z",
      apiManagement: true,
      disableOverage: false
    };
    const currentDate = new Date();
    const expiresDate = new Date(currentDate.setDate(currentDate.getDate() + 15)).toISOString();
    const trialEndDate = new Date(currentDate.setDate(currentDate.getDate() + 15)).toISOString();
    const payloadFormat1 = {
      ...getLicensePayload(platformLicense),
      expires: expiresDate,          // Expires date is 15 days from today
      trialEndDate: trialEndDate,    // Trial end date is also 15 days from today
      apiManagement: true,
      disableOverage: false
    };
    const respo = await io.api.putCall(`v1/test/licenses/${platformLicense._id}`, {
      ...payloadFormat1,
      tier: "free"
    });
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    // await page.pause();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    // Validating notifications showing
    await io.assert.verifyElementIsDisplayed('[data-test="Request upgrade now -"]', "Notifications is not displayed");
    await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`, {
      ...payloadFormat,
      tier: "enterprise"
    });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
}
);
