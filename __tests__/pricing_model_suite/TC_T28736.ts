import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

const admin = {
  "_id": "64f1d2b67eb61a709d11e401",
  "emails": ["tarun.saini+1@celigo.com"],
  "accessLevel": "admin",
  "integrationAccessLevel": [],
  "accountSSORequired": false,
  "accountMFARequired": false
}

test.describe("T28736 Verify the license Entitlements notification for Free tier", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T28736  @Env-All @Priority-P2 Verify the license Entitlements notification whenever the endpoints and flow usage has been exceeded for free tier", async ({
    io,
    page
  }) => {
    await io.homePage.reloadPage();
    await page.waitForLoadState("load", { timeout: 90000 });
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense),expires: "2044-04-10T13:14:33.363Z",tier: 'free'}
    );
    await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Automation_flows");   
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    await io.homePage.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.homePagePO.DIALOG, "You cannot enable more than one flow at a time with your current free subscription plan. Upgrade to unlock your data integration potential with more flows.");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
  });
    test("@Zephyr-IO-T27423 @Env-All @Priority-P2 Verify the subscription page for different license type free for admin", async ({
      io,
      page
    }) => {
      await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
      await io.homePage.reloadPage();
      await io.homePage.loadingTime();
      const licenses = await io.api.getCall("v1/licenses");
      const platformLicense = licenses.find(l => l.type === "platform");
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
      await page.waitForLoadState();
  
      const bgColorList = await io.homePage.getBackgroundColors(
        selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR
      );
      // await io.api.putCall(
      //   `v1/test/licenses/${platformLicense._id}`,
      //   getLicensePayload(platformLicense)
      // );
      await io.assert.expectArrayToBeInArray(
        bgColorList,
        [
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)"
        ],
        "The status is not correctly colored"
      );
  });
});
