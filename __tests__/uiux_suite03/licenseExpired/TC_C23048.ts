import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe(
  "C23048 Customers should be presented with a button on the home page “Your license has expired. Renew now.”. ",
  () => {
    test("@Env-All @Zephyr-IO-T1431 C23048 Customers should be presented with a button on the home page “Your license has expired. Renew now.”. ", async ({
      io,
      page
    }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        const expiredMsg = await io.homePage.isVisible('text="Your subscription has expired."');
        await io.assert.expectToBeValue(expiredMsg.toString(), "true", "Subscription not expired");

         
        await io.homePage.clickByText("Request to renew now." );
        
        const renewButtonClick = await io.homePage.isVisible('text="Request to renew subscription"');
        await io.assert.expectToBeValue(expiredMsg.toString(), "true", "Renew button not clickable");

    });
  }
);