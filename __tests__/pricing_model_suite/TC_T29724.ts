import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { getLicensePayload } from "@celigo/aut-utilities";

test.describe("T29724 Verify the license entitlement notification message)", () => {
  test("T29724 @Zephyr-IO-T29724  @Env-All @Priority-P2 Verify the license entitlement notification message", async ({
    io,
    page
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
      tier: 'professional', 
      numEndpoints: 1,
      numFlows:1,
      numSandboxEndpoints: 1,
      numSandboxFlows: 1,
     }
    );
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime();
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();
    await io.assert.verifyElementContainsText('[id="notification"]', 'Your account has exceeded its entitlements. Request an upgrade.');
    await io.flowBuilder.click('//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-v8iuxg"]');
    await io.homePage.addStep("Reloading the page");
    await io.homePage.reloadPage();
    await test.step("C50895 C29724 Verify the license entitlement notification message after refresh.", async () => {
    await io.assert.verifyElementContainsText('[id="notification"]', 'Your account has exceeded its entitlements. Request an upgrade.');
    }); 
    await io.api.putCall(
      `v1/test/licenses/${platformLicense._id}`,
      getLicensePayload(platformLicense)
    );
  });  
  test('@Zephyr-IO-T27429 @Env-QA @Priority-P2  Verify whether gated feature marked as true in BE in Subscription page', async ({
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
  await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
                    
  });  
});