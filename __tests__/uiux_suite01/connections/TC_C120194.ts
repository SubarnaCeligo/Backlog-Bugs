import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C120194`, () => {
    test(`C120194`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://secure-wms.com/");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.flowBuilder.fill(selectors.basePagePO.NAME, "3PL CONNECTION DON't USE");
        await io.connectionPage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
        await io.connectionPage.click(selectors.flowBuilderPagePO.ON_PREMISE_MODE);
        //OAuth 2.0 client 
        const element = await io.homePage.isVisible(selectors.connectionsPagePO.ICLIENTID);
        await io.assert.expectToBeValue(element.toString(), 'false', "Element is present")

        //UserLogin id 
        const element1 = await io.homePage.isVisible(selectors.connectionsPagePO.USER_LOGIN_ID);
        await io.assert.expectToBeValue(element1.toString(), 'false', "Element is present")
        await io.assert.verifyElementIsDisplayed(
            selectors.flowBuilderPagePO.MEDIA_TYPE,
            "Media type is not showing"
        );
        await io.connectionPage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.connectionPage.click(selectors.basePagePO.DISCARD_CHANGES);

    });
});