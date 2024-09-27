import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T31328 from "@testData/Connections/T31328.json";

test.describe("T31328 Verify the above fields should be made mandatory for re-entering everytime we edit or modify the connection as they're sensitive fields", () => {
  let connectionId;
  test.afterEach(async ({ io }) => {
    await io.connections.deleteConnection(T31328.name);
  });
  test("@Env-All @Zephyr-IO-T31328 @Priority-P2 T31328 Verify the above fields should be made mandatory for re-entering everytime we edit or modify the connection as they're sensitive fields UI_Backlog", async ({ io, page }) => {
    await io.connectionPage.addStep("Creating and saving new connection");
    connectionId = await io.api.postCall(`v1/connections`, T31328);
    await io.connectionPage.addStep("Editing the created connection");
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.SEARCH_RECYCLEBIN);
    // await io.connectionPage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.connectionPage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, connectionId.name);
    await io.connectionPage.clickByTextByIndex(connectionId.name, 0);

    await io.connectionPage.addStep("Selecting PEM format");
    await io.connectionPage.click(selectors.connectionsPagePO.SSL_CERTIFICATE);
    await io.connectionPage.clickByText("PEM");

    await io.connectionPage.addStep("Clicking on save");
    await io.connectionPage.click(selectors.basePagePO.SAVE);

    const SSL_CLIENT_KEY = page.locator(selectors.connectionsPagePO.SSL_CLIENT_KEY_CONTAINER);
    const SSL_CERTIFICATE = page.locator(selectors.connectionsPagePO.SSL_CLIENT_CERT_CONTAINER);

    await io.connectionPage.addStep("Validating error messages");
    expect(await SSL_CLIENT_KEY.innerText()).toContain("A value must be provided");
    expect(await SSL_CERTIFICATE.innerText()).toContain("A value must be provided");
  });
});
