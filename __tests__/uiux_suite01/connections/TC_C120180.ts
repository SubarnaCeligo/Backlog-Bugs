import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C120180_C120181_C120182_C120184_C120185_C120186_C120187_C120188`, () => {
    test(`C120180_C120181_C120182_C120184_C120185_C120186_C120187_C120188`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        //15 Five
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://my.15five.com");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.assert.verifyElementIsDisplayed(
            selectors.flowBuilderPagePO.FIVE,
            "Pre-built connectors is not displayed"
        );
        const Text = await io.homePage.isVisible("text='We found 1 pre-built connectors matching your base URI:'");
        await io.assert.expectToBeTrue(Text, "Settings name not shown");
        await io.connectionPage.click(selectors.flowBuilderPagePO.FIVE);
        //TOKEN
        let token = await (await page.locator(selectors.flowBuilderPagePO.TOKENVALUE)).isVisible();
        await io.assert.expectToBeValue(token.toString(), "true", "token is not showing");
        //After an application is selected from the suggested list, â€˜Base URIâ€™ field should be disabled
        await io.assert.checkElementState(selectors.connectionsPagePO.BASE_URI_INPUT, "isEditable");

        //Verify if Users should also have the option to unselect the application by clicking on â€˜Remove/clear selectionâ€™ button
        await io.flowBuilder.clickByText('Clear selection');
        //Media Type
        let mediaTypes = await (await page.locator(selectors.flowBuilderPagePO.MEDIA_TYPE)).isVisible();
        await io.assert.expectToBeValue(mediaTypes.toString(), "true", "mediaType is not showing");
        //Auth Type
        let authTypes = await (await page.locator(selectors.connectionsPagePO.SLACK_AUTH_TYPE)).isVisible();
        await io.assert.expectToBeValue(authTypes.toString(), "true", "authType is not showing");

        //NEED CONFIRMATION HERE ???????????
        // //TC_C120186 Verify If the user switches the application, the form should be updated to show the configuration details of the newly selected application.
        // await io.connectionPage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
        // //API VERSION
        // let apiVersion = await (await page.locator(selectors.connectionsPagePO.FACEBOOK_API_VERSION)).isVisible();
        // await io.assert.expectToBeValue(apiVersion.toString(), "true", "iClient is not showing");
        // //OAuth iClient
        // let OAuthIClient = await (await page.locator(selectors.connectionsPagePO.ICLIENTID)).isVisible();
        // await io.assert.expectToBeValue(OAuthIClient.toString(), "true", "scope is not showing");
        // //SCOPE
        // let scope1 = await (await page.locator(selectors.connectionsPagePO.CONFISCOPE)).isVisible();
        // await io.assert.expectToBeValue(scope1.toString(), "true", "scope is not showing");

        //TC_C120188 Updating the â€˜Base URIâ€™ should trigger the search again to show the updated results of the pre-built connectors.
        await io.flowBuilder.click(selectors.connectionsPagePO.BASE_URI_INPUT);
        await io.flowBuilder.clearTextValue(selectors.connectionsPagePO.BASE_URI_INPUT);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://secure-wms.com");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.THREEPL_CONNECTION,
            "3PL Pre-built connectors is not displayed"
        );
        await io.flowBuilder.click(selectors.connectionsPagePO.BASE_URI_INPUT);
        await io.flowBuilder.clearTextValue(selectors.connectionsPagePO.BASE_URI_INPUT);
        //FACEBOOK
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://graph.facebook.com/");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.FACEBOOK_ADS,
            "Pre-built connectors is not displayed"
        );
        const Text1 = await io.homePage.isVisible("text='We found 3 pre-built connectors matching your base URI:'");
        await io.assert.expectToBeTrue(Text1, "Settings name not shown");
        await io.connectionPage.clickButtonByIndex(selectors.connectionsPagePO.INSTAGRAM_ADS, 0);
        //ICLIENT
        let iClient = await (await page.locator(selectors.connectionsPagePO.ICLIENT)).isVisible();
        await io.assert.expectToBeValue(iClient.toString(), "true", "iClient is not showing");
        //SCOPE
        let scope = await (await page.locator(selectors.connectionsPagePO.CONFISCOPE)).isVisible();
        await io.assert.expectToBeValue(scope.toString(), "true", "scope is not showing");

        //After an application is selected from the suggested list, â€˜Base URIâ€™ field should be disabled
        await io.assert.checkElementState(selectors.connectionsPagePO.BASE_URI_INPUT, "isEditable");

        //Verify if Users should also have the option to unselect the application by clicking on â€˜Remove/clear selectionâ€™ button
        await io.flowBuilder.clickByText('Clear selection');
        //Media Type
        await io.assert.verifyElementIsDisplayed(
            selectors.flowBuilderPagePO.MEDIA_TYPE,
            "Media type is not displayed"
        );
        //Auth Type
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.SLACK_AUTH_TYPE,
            "Auth type is not displayed"
        );
        //TC_C120186 Verify If the user switches the application, the form should be updated to show the configuration details of the newly selected application.
        await io.connectionPage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.FACEBOOK_API_VERSION);
        //API VERSION
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.FACEBOOK_API_VERSION,
            "Api version is not displayed"
        );
        //OAuth iClient
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.ICLIENTID,
            "OAuth iClient is not displayed"
        );
        //SCOPE
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.CONFISCOPE,
            "SCOPE is not displayed"
        );

        //TC_C120188 Updating the â€˜Base URIâ€™ should trigger the search again to show the updated results of the pre-built connectors.
        await io.flowBuilder.clickByText('Clear selection');
        //Media Type
        await io.assert.verifyElementIsDisplayed(
            selectors.flowBuilderPagePO.MEDIA_TYPE,
            "Media type is not displayed"
        );
        await io.flowBuilder.click(selectors.connectionsPagePO.BASE_URI_INPUT);
        await io.flowBuilder.clearTextValue(selectors.connectionsPagePO.BASE_URI_INPUT);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://secure-wms.com");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.THREEPL_CONNECTION,
            "3PL Pre-built connectors is not displayed"
        );
    });
});