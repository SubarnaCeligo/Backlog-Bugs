import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T31325 Verify if SSL client key & SSL Certificate is mandatory fields when SSL certificate type is PEM", () => {
  test("@Env-All @Zephyr-IO-T31325 @Priority-P2 T31325 Verify if SSL client key & SSL Certificate is mandatory fields when SSL certificate type is PEM UI_Backlog", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

    await io.flowBuilder.addStep("Creating a new connection"); 
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'GraphQL');
    await io.homePage.clickByText('GraphQL');
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_T31325_Connection');
    await io.homePage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.clickByText("PEM");

    const SSL_CLIENT_CERT_LABEL = page.locator(`${selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER} label`);
    const SSL_CLIENT_KEY_LABEL = page.locator(`${selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER} label`);
    expect(await SSL_CLIENT_CERT_LABEL.isVisible()).toBe(true);
    expect(await SSL_CLIENT_KEY_LABEL.isVisible()).toBe(true);

    await io.flowBuilder.addStep("Verifying SSL Certificate and SSL client are mandatory fields in PEM format"); 
    expect(await SSL_CLIENT_CERT_LABEL.getAttribute("class")).toContain("Mui-required")
    expect(await SSL_CLIENT_KEY_LABEL.getAttribute("class")).toContain("Mui-required")
  });
});