import { expect, test } from "@celigo/ui-core-automation";

import * as selectors from "@celigo/aut-selectors";
    
    test.describe("IO-T21440  Verify if custom settings are not displaying in http metadata 2.0 in HTTP view    ", () => {
      test("@Env-All @Zephyr-IO-T21440   Verify if custom settings are not displaying in http metadata 2.0 in HTTP view       " , async ({
        io,
        page
      }) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Loop Returns');
        await io.flowBuilder.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.AUTHORIZATIONTYPE);
        await io.flowBuilder.clickByText("OAuth 2.0");
        await io.connectionPage.clickByIndex(selectors.connectionsPagePO.CREATE_CONNECTION,1);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.HTTP_CNNECTOR,1);
        let isCustomSettingsVisible = await io.flowBuilder.isVisible("text='Custom settings'");
        await io.assert.expectToBeFalse(isCustomSettingsVisible, "Custom settings is not visible");
      });
    });