import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as TC from "@testData/Connections/C120189.json";

test.describe(`C120189_C120195_C120196`, () => {
    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection("3PL CONNECTION DON't USE");
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    });
    test(`C120189_C120195_C120196`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://secure-wms.com/");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.flowBuilder.fill(selectors.basePagePO.NAME, "3PL CONNECTION DON't USE");
        await io.connectionPage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
        //Create iClient
        await io.connectionPage.clickButtonByIndex(selectors.basePagePO.ADD_NEW_RESOURCE,1);
        await io.connectionPage.clickButtonByIndex(selectors.basePagePO.ADD_NAME, 1);
        await io.connectionPage.keyboard('3');
        await io.connectionPage.keyboard('P');
        await io.connectionPage.keyboard('L');
        await io.flowBuilder.enterHugeData(selectors.connectionsPagePO.OAUTH2_CLIENT_ID, TC.ClientId);
        await io.flowBuilder.enterHugeData(selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET, TC.ClientSecret);
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);

        //TC_C120196 Verify toggle changes for iclient when user create/edit it from http connection form.
        await io.connectionPage.click(selectors.integrationPagePO.EDITRESOURCE);
        let toggle = await page.$$(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
        var text = await toggle[1].getAttribute('aria-pressed');
        await io.assert.expectToBeValue('true', text.toString(), 'Simple form is not selected');
        await io.connectionPage.clickButtonByIndex(selectors.flowBuilderPagePO.CLOSE,1);
        //LOgIn ID
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.SAVE);
        await io.flowBuilder.enterHugeData(selectors.connectionsPagePO.USER_LOGIN_ID, TC.GUID);
        await io.flowBuilder.clickByText("Please select");
        await io.connectionPage.clickButtonByIndex(selectors.basePagePO.MENU_ITEM,1);
        await io.connectionPage.click(selectors.basePagePO.SAVE);
        await io.connectionPage.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "3PL CONNECTION DON't USE");
        await io.connectionPage.clickByText("3PL CONNECTION DON't USE");
        // Verify upon saving the connection form/reopening after selecting prebuilt connector should be transformed to 2.0 view(simple-HTTP toggle)
        await io.assert.verifyElementIsDisplayed(
            selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH,
            "Simple toggle is not showing"
        );
        await io.assert.verifyElementIsDisplayed(
            selectors.flowBuilderPagePO.HTTP_FORM_SWITCH,
            "Http toggle is not showing"
        );
        await io.connectionPage.click(selectors.basePagePO.CLOSE);
    });
});