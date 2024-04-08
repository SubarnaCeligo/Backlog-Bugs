import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C120183_C120190`, () => {
    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection("HTTP CONNECTION DON't USE");
        await io.connections.deleteConnection("HTTP CONNECTION DON't USE THIS CONNECTION");
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    });
    test(`@Env-All C120183_C120190`, async ({ io, page }) => {
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
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "HTTP CONNECTION DON't USE");
        await io.flowBuilder.clickByText("HTTP CONNECTION DON't USE");
        await io.assert.verifyElementIsDisplayed(
            selectors.flowBuilderPagePO.FIVE,
            "Pre-built connectors is not displayed"
        );
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE);
    });
    test(`@Env-All C120183_1_C120190`, async ({ io, page }) => {
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
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "HTTP CONNECTION DON't USE THIS CONNECTION");
        await io.flowBuilder.clickByText("HTTP CONNECTION DON't USE THIS CONNECTION");
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.THREEPL_CONNECTION,
            "3PL Pre-built connectors is not displayed"
        );
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE);
    });
});