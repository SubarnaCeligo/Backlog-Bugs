import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T11974 FTP - Verify 'PGP public key' field is mandatory when private key is not provided on connection", () => {
  test("@Env-All @Zephyr-IO-T11974 @Priority-P2 T11974 FTP - Verify 'PGP public key' field is mandatory when private key is not provided on connection UI_Backlog", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);

    await io.flowBuilder.addStep("*** Creating a new FTP connection ***"); 
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'FTP');
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.exportsPage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_T11974_Connection');

    await io.flowBuilder.addStep("*** Enabling PGP cryptographic ***"); 
    // await io.homePage.clickByText('Advanced');
    (await io.homePage.findElementByDataTest("usePgp")).click();
    
    await io.flowBuilder.addStep("***  ***"); 
    await io.homePage.click(selectors.basePagePO.SAVE);
    const PGP_PUBLIC_KEY_CONTAINER = page.locator(selectors.connectionsPagePO.PGP_PUBLIC_KEY_CONTAINER);
    const PGP_PRIVATE_KEY_CONTAINER = page.locator(selectors.connectionsPagePO.PGP_PRIVATE_KEY_CONTAINER);

    await io.connectionPage.addStep("*** Validating error messages ***"); 
    expect(await PGP_PUBLIC_KEY_CONTAINER.innerText()).toContain("A value must be provided");
    expect(await PGP_PRIVATE_KEY_CONTAINER.innerText()).toContain("A value must be provided");
    
  });
});