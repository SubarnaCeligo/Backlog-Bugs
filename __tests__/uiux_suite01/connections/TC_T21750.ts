import { expect, test } from "@celigo/ui-core-automation";

import * as selectors from "@celigo/aut-selectors";
    
    test.describe("IO-T21750  Verify in UI by configuring inputtype : password in fleld user must set ", () => {
      test("@Env-All @Zephyr-IO-T21750  Verify in UI by configuring inputtype : password in fleld user must set" , async ({
        io,
        page
      }) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Loop Returns');
        await io.flowBuilder.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.loginPage.fill(
          selectors.templatePagePO.ORDERFULTOKEN,
          "test password"
        );
        await io.assert.verifyElementAttribute(selectors.templatePagePO.ORDERFULTOKEN, 'type', 'password');
      });

    });