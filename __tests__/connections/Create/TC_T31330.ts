import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T31330 Verify if the SSL passphrase is an optional field in PEM format", () => {
  test("@Env-All @Zephyr-IO-T31330 @Priority-P2 T31330 Verify if the SSL passphrase is an optional field in PEM format UI_Backlog", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

    await io.flowBuilder.addStep("Creating a new connection"); 
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'GraphQL');
    await io.homePage.clickByText('GraphQL');
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_T31330_Connection');
    await io.homePage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.clickByText("PEM");

    const SSLPassphrase = page.locator(selectors.connectionsPagePO.SSL_PASSPHRASE);
    expect(await SSLPassphrase.isVisible()).toBe(true);

    await io.flowBuilder.addStep("Verifying SSL passphrase is an optional field in PEM format"); 
    expect(await SSLPassphrase.getAttribute("class")).not.toContain("Mui-required")
  });
});
