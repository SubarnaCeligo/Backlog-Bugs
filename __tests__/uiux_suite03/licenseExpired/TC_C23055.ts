import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe(
  "C23055 Verify Account Renewal for Monitor or manage user ",
  () => {
    test("@Env-All @Zephyr-IO-T1433 C23055 Verify Account Renewal for Monitor or manage user ", async ({
      io,
      page
    }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        const expiredMsg = await io.homePage.isVisible('text="Your subscription has expired."');
        await io.assert.expectToBeValue(expiredMsg.toString(), "true", "Subscription not expired");

         
        await io.homePage.clickByText("Request to renew now." );
        
        const renewButtonClick = await io.homePage.isVisible('text="We will contact you to renew your subscription."');
        await io.assert.expectToBeValue(expiredMsg.toString(), "true", "error message not displayed");

    });
  }
);