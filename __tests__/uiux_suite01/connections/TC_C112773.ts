import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C112773 - Verify the 'Create connection' page when the search criteria does not yield any results.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All C112773 - Verify the 'Create connection' page when the search criteria does not yield any results.", async ({ io, page }) => {
        //Navigate to Connections page and click on 'Create connection'
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);

        //Wait for the page to load
        await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);

        //Enter a search keyword that doesn't match with any existing apps
        await io.connectionPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "invalid app ");

        //Wait for message to appear
        await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.UNIV_CONNECTORS_LINK);

        //Extract the message
        const message = (await io.connectionPage.getText(selectors.connectionsPagePO.APPL_SEARCH_MESSAGE)).toString();

        //Comapre with expected value.
        await io.assert.expectToContainValue(
            "Your search term doesn\'t match any of our currently available connectors.,Use one of our universal connectors to connect to any application.",
            message,
            'Invalid message');

        //Verify the hyperlink    
        await io.assert.verifyElementAttributeContainsText(
            selectors.connectionsPagePO.UNIV_CONNECTORS_LINK,
            'href',
            'https://docs.celigo.com/hc/en-us/categories/592639975618');

        //Verify if all the universal connectors are listed in the page.
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AS2_CONNECTOR, 'AS2 is not displayed.');
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.FTP_CONNECTION, 'FTP is not displayed.');
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.GRAPHQL_CONNECTOR, 'GraphQL is not displayed.');
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.HTTP_CNNECTOR, 'HTTP is not displayed.');
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.JDBC_CONNECTOR, 'JDBC is not displayed.');
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.RESTAPI_HTTP, 'REST API (HTTP) is not displayed.');
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.VAN_CONNECTION, 'VAN (Value-added network) is not displayed.');
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.WRAPPER_CONNECTOR, 'Wrapper is not displayed.');


    });
});