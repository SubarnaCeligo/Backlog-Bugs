import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C42438 Verify Upgrade button changes in Home page & Subscription page when Free trail is expired", () => {
    test.skip("@Env-All @Zephyr-IO-T917 C42438 Verify Upgrade button changes in Home page & Subscription page when Free trail is expired", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
      await io.api.putCall(`v1/test/licenses/6512c1308340f02a95d8b7c9`,{
        "_id": "6512c1308340f02a95d8b7c9",
        "expires": "2021-01-01T00:00:00.000Z",
        "type": "endpoint",
        "tier": "enterprise",
        "supportTier": "preferred",
        "sandbox": true,
        "numEndpoints": 100,
        "numAddOnEndpoints": 0,
        "numFlows": 10,
        "numAddOnFlows": 0,
        "numTradingPartners": 9,
        "numAddOnTradingPartners": 0,
        "numAgents": 0,
        "numAddOnAgents": 0,
        "numSandboxEndpoints": 100,
        "numSandboxAddOnEndpoints": 10,
        "numSandboxFlows": 0,
        "numSandboxAddOnFlows": 0,
        "numSandboxTradingPartners": 0,
        "numSandboxAddOnTradingPartners": 0,
        "numSandboxAgents": 0,
        "numSandboxAddOnAgents": 0,
        "apiManagement": true,
        "resumable": false,
        "sso": false,
        "maxAllowedDataRetention": 60
      });
      await page.reload();
      await io.homePage.waitForElementAttached(selectors.basePagePO.RENEW_RESUME_NOW);
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.RENEW_RESUME_NOW, 'Renew or Resume now button not visible');
      await io.homePage.click(selectors.basePagePO.RENEW_RESUME_NOW);
      await io.homePage.click(selectors.basePagePO.SUBMIT_REQUEST);
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION, 'Success notification did not appear');

    });
  });