import { expect, test } from "@celigo/ui-core-automation";

import * as selectors from "@celigo/aut-selectors";
    
    test.describe("IO-T21750  Verify in UI by configuring inputtype : password in fleld user must set ", () => {
      test("@Env-All @Zephyr-IO-T21750  Verify in UI by configuring inputtype : password in fleld user must set" , async ({
        io,
        page
      }) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await page.pause();
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "LOOP RETURN CONNECTION");
        await io.homePage.clickByText("LOOP RETURN CONNECTION");
        await io.loginPage.fill(
          selectors.templatePagePO.ORDERFULTOKEN,
          "test password"
        );
        await io.assert.verifyElementAttribute(selectors.templatePagePO.ORDERFULTOKEN, 'type', 'password');
      });

    });