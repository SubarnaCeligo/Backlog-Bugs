import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T31329 Verify if error is thrown when mandatory field values are not provided and clicked on save", () => {
  test("@Env-All @Zephyr-IO-T31330 @Priority-P2 T31329 Verify if error is thrown when mandatory field values are not provided and clicked on save UI_Backlog", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

    await io.connectionPage.addStep("Creating a new connection"); 
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'GraphQL');
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    await io.homePage.clickByIndex(selectors.connectionsPagePO.GRAPHQL_CONNECTOR,0);
    await io.homePage.isPageLoaded();
    await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_T31329_Connection');
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);

    await io.connectionPage.addStep("Selecting PEM format and filling other details"); 
    await io.connectionPage.clickByText("PEM");

    await io.connectionPage.fill(selectors.connectionsPagePO.BASE_URI_INPUT, "https://graph.facebook.com/");

    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.connectionPage.clickByText("Basic");

    await io.connectionPage.fill(selectors.connectionsPagePO.USERNAME, 'Test');
    await io.connectionPage.fill(selectors.connectionsPagePO.PASSWORD, 'Test');

    await io.connectionPage.click(selectors.connectionsPagePO.PING_METHOD);
    await io.connectionPage.selectTextfromDropDown(page, "GET");

    await io.connectionPage.fill(selectors.flowBuilderPagePO.GRAPHQLQUERY1, "TestQuery1");

    await io.connectionPage.addStep("Clicking on save"); 
    await io.connectionPage.click(selectors.basePagePO.SAVE);

    const SSL_CLIENT_KEY = page.locator(selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER);
    const SSL_CERTIFICATE = page.locator(selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER);

    await io.connectionPage.addStep("Validating error messages"); 
    expect(await SSL_CLIENT_KEY.innerText()).toContain("A value must be provided");
    expect(await SSL_CERTIFICATE.innerText()).toContain("A value must be provided");
  });
});