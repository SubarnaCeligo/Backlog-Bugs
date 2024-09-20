import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import payload from "@testData/edi_suite/LicenseUpdate.json"

test.describe(
  "C23055 Verify Account Renewal for Monitor or manage user ",
  () => {
    test.beforeEach(async ({ io }) => {
      //get licensce ID
      let licenses = await io.api.getCall('v1/licenses');
      let licenseID = licenses[0]._id;
      let type = licenses[0].type;
  
      // Update license
      let endPoint = 'v1/test/licenses/' + licenseID;
      payload.type = type;
      payload.expires = "2020-01-01T00:00:00.000Z",
      await io.api.putCall(endPoint, payload);
    });
    test("@Env-All @Zephyr-IO-T1433 C23055 Verify Account Renewal for Monitor or manage user ", async ({
      io,
      page
    }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime();
        const expiredMsg = await io.homePage.isVisible('text="Your subscription has expired."');
        await io.assert.expectToBeValue(expiredMsg.toString(), "true", "Subscription not expired");

        await io.homePage.loadingTime();
        await io.homePage.clickByText("Request to renew now." );
        
        await io.homePage.loadingTime();
        const renewButtonClick = await io.homePage.isVisible('text="We will contact you to renew your subscription."');
        await io.assert.expectToBeValue(expiredMsg.toString(), "true", "error message not displayed");

    });
    test.afterEach(async ({ io }) => {
      //get licensce ID
      let licenses = await io.api.getCall('v1/licenses');
      let licenseID = licenses[0]._id;
      let type = licenses[0].type;
  
      // Update license
      let endPoint = 'v1/test/licenses/' + licenseID;
      payload.expires = "2050-01-01T00:00:00.000Z",
      payload.type = type;
      await io.api.putCall(endPoint, payload);
    });
  }
);