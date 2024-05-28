import { test } from "@celigo/ui-core-automation";
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

test.describe("C27421 Verify the subscription page for different license type(Free tier,professional ,Enterprise) for admin", () => {
  test("@Zephyr-IO-T27421 @Env-All @Priority-P2 Verify the subscription page for different license type professional for admin", async ({
    io,
    page
  }) => {
    await io.homePage.reloadPage();
    await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      admin
    );
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");

    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      {...getLicensePayload(platformLicense), 
        tier: 'professional', 
        "apiManagement": true, 
        "expires": "2044-04-10T13:14:33.363Z",
        numSandboxEndpoints: 1,
        numSandboxFlows: 1,}
    );
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();

    const bgColorList = await io.homePage.getBackgroundColors(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR
    );
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      getLicensePayload(platformLicense)
    );
    await io.assert.expectArrayToBeInArray(
      bgColorList,
      [
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
      ],
      "The status is not correctly colored"
    );
  });
  test("@Zephyr-IO-T27423 @Env-QA @Priority-P2 Verify the subscription page for different license type enterprise for admin", async ({
      io,
      page
    }) => {
      await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
      const licenses = await io.api.getCall("v1/licenses");
      const platformLicense = licenses.find(l => l.type === "platform");
  
      await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        {...getLicensePayload(platformLicense), tier: 'enterprise', "apiManagement": true, "expires": "2044-04-10T13:14:33.363Z"}
      );
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
      await page.waitForLoadState();
  
      const bgColorList = await io.homePage.getBackgroundColors(
        selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR
      );
      await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        getLicensePayload(platformLicense)
      );
      await io.assert.expectArrayToBeInArray(
        bgColorList,
        [
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
          "rgb(29, 118, 199)",
        ],
        "The status is not correctly colored"
      );
    });
  test("C27421 @Zephyr-IO-T27423 @Env-All @Priority-P2 Verify the subscription page for different license type free for admin", async ({
      io,
      page
    }) => {
      await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        admin
      );
      const licenses = await io.api.getCall("v1/licenses");
      const platformLicense = licenses.find(l => l.type === "platform");
  
      await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        {...getLicensePayload(platformLicense), tier: 'free', sandbox: false, "apiManagement": true, "expires": "2044-04-10T13:14:33.363Z"}
      );
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
      await page.waitForLoadState();
  
      const bgColorList = await io.homePage.getBackgroundColors(
        selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR
      );
      await io.api.putCall(
        `v1/test/licenses/${platformLicense._id}`,
        getLicensePayload(platformLicense)
      );
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
