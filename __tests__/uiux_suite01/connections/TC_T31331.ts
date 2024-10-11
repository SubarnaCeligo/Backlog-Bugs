import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T31331 Verify if 'Note: for security reasons this field must always be re-entered.' text is present below mandatory fields mentioned above", () => {
  test("@Env-All @Zephyr-IO-T31331 @Priority-P2 T31331 Verify if 'Note: for security reasons this field must always be re-entered.' text is present below mandatory fields mentioned above UI_Backlog", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

    await io.flowBuilder.addStep("Creating a new connection"); 
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'GraphQL');
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    await io.homePage.clickByIndex(selectors.connectionsPagePO.GRAPHQL_CONNECTOR,0);
    await io.homePage.isPageLoaded();
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_T31331_Connection');
    await io.homePage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.clickByText("PEM");

    const SSL_CLIENT_CERT = page.locator(selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER);
    const SSL_CLIENT_KEY = page.locator(selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER);

    await io.flowBuilder.addStep("Verifying that the message is present for the mandtory fields"); 
    expect(await SSL_CLIENT_CERT.innerText()).toContain("Note: for security reasons this field must always be re-entered.")
    expect(await SSL_CLIENT_KEY.innerText()).toContain("Note: for security reasons this field must always be re-entered.")
  });
});