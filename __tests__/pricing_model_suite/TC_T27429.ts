import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T27429 Verify the license entitlement notification message)", () => {
  test('@Zephyr-IO-T27429 @Env-All @Priority-P2  Verify whether gated feature marked as true in BE in Subscription page', async ({
    io
  }) => {
    const licenses = await io.api.getCall("v1/licenses");
    const platformLicense = licenses.find(l => l.type === "platform");
    const payloadFormat = {
      ...getLicensePayload(platformLicense),
      expires: "2044-04-10T13:14:33.363Z",
      apiManagement: true,
      "disableOverage": false,
    };
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
     { ...payloadFormat,
      tier: 'free'
     }
    );
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);  
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.SUBSCRIPTION);     
  await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION); 
  const Sanbox = await io.assert.verifyElementDisplayedByText(
      "Sandbox",
      "Sandbox is not displayed"
      );
      expect(Sanbox).toBeUndefined(); 
      await io.homePage.loadingTime()
              await io.assert.verifyElementDisplayedByText(
                  "Endpoint apps:",
                  "Endpoint apps: is not displayed"
                  );
      await io.homePage.loadingTime()
                  await io.assert.verifyElementDisplayedByText(
                      "Enabled flows:",
                      "Enabled flows: is not displayed"
                      );
                      await io.assert.verifyElementDisplayedByText(
                          "On-premise agents:",
                          "On-premise agents: is not displayed"
                          );
  await io.api.putCall(`v1/test/licenses/${payloadFormat._id}`,{... payloadFormat, tier: 'enterprise',});
  await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
                    
  });  
});