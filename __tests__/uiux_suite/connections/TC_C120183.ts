import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C120183`, () => {
    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection("HTTP CONNECTION DON't USE");
        await io.connections.deleteConnection("HTTP CONNECTION DON't USE THIS CONNECTION");
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    });
    test(`C120183`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.BASE_URI_INPUT);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://my.15five.com");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.flowBuilder.fill(selectors.basePagePO.NAME, "HTTP CONNECTION DON't USE");
        await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
        await io.connectionPage.selectTextfromDropDown(page, "custom");
        await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);
        await io.assert.verifyElementDisplayedByText(
            "Your connection is working great! Nice Job!",
            "Connection creation error"
        );
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    });
    test.only(`C120183_1`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://secure-wms.com");
        await io.flowBuilder.doubleClick(selectors.basePagePO.NAME);
        await io.flowBuilder.fill(selectors.basePagePO.NAME, "HTTP CONNECTION DON't USE THIS CONNECTION");
        await io.connectionPage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
        await io.connectionPage.selectTextfromDropDown(page, "custom");
        await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);
        await io.assert.verifyElementDisplayedByText(
            "Your connection is working great! Nice Job!",
            "Connection creation error"
        );
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    });
});