import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as C120190 from "@testData/Connections/C120190.json";

test.describe(`C120190_C120193`, () => {
    let connID;
    test.afterEach(async ({ io }) => {
        await io.api.deleteConnectionViaName("TC_C120190 3PL CONNECTION DON't USE");
    });
    test(`C120190`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "HTTP ZENDESK CONNECTION");
        await io.flowBuilder.clickByText('HTTP ZENDESK CONNECTION');
        await io.connectionPage.click(selectors.importPagePO.ADVANCED);
        //Check box 'Detach from pre-built connector' should not show for universal HTTP connections
        const element = await io.homePage.isVisible(selectors.connectionsPagePO.ICLIENTID);
        await io.assert.expectToBeValue(element.toString(), 'false', "Element is present")
        await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE);
    });
    test(`C120190_1_C120193`, async ({ io, page }) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        let connID1 = await io.api.postCall("v1/connections", C120190.Connections);
        connID = connID1._id
        await io.signInPage.reloadPage();
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "TC_C120190 3PL CONNECTION DON't USE");
        await io.flowBuilder.clickByText("TC_C120190 3PL CONNECTION DON't USE");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.connectionPage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.connectionPage.click(selectors.importPagePO.ADVANCED);
        //Check box 'Detach from pre-built connector' should not show for universal HTTP connections
        await io.assert.verifyElementIsDisplayed(
            selectors.connectionsPagePO.DETACH_CONNECTOR,
            "Detach connector button is not showing"
        );

        //TC_C120193
        await io.connectionPage.click(selectors.connectionsPagePO.DETACH_CONNECTOR);
        await io.connectionPage.click(selectors.connectionsPagePO.DETACH_CONNECTOR_HELP);
        const helpText = await io.homePage.isVisible("text='Removes the link to the pre-built connector and converts it to an HTTP connection.'");
        await io.assert.expectToBeValue(helpText.toString(), 'true', "Value is found")
        await io.connectionPage.click(selectors.connectionsPagePO.DETACH_CONNECTOR_HELP);
        await io.connectionPage.click(selectors.basePagePO.SAVE);
        await io.homePage.fill(selectors.flowBuilderPagePO.SEARCH, "TC_C120190 3PL CONNECTION DON't USE");
        await io.flowBuilder.clickByText("TC_C120190 3PL CONNECTION DON't USE");
        await io.assert.verifyElementIsDisplayed(
            selectors.marketplacePagePO.HTTP,
            "HTTP label is not showing"
        );

        const connDoc = await io.api.getCall("v1/connections/" + connID);
        expect(connDoc).not.toContain("_httpConnectorId");
        expect(connDoc).not.toContain("_httpConnectorVersionId");
    });
});