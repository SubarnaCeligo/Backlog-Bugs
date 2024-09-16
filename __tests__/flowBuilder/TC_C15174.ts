import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
import TC from '../../testData/inputData/FlowBuilder/C14925.json';
import * as data from '../../testData/inputData/FlowBuilder/C14925_Conn.json';

test.describe("@Env-All @Zephyr-IO-T2949", () => {
  test.afterEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connections.deleteConnection("FTP_OFFLINE_14925");
  });

  test("@Env-All @Zephyr-IO-T2949", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.connections.createConnectionViaAPI(data);
    await io.homePage.loadingTime();
    await io.createResourceFromAPI(TC, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    await io.connectionPage.click(selectors.connectionsPagePO.FIX_CONNECTION);
    await io.homePage.loadingTime();
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_HOST_URI)
    await io.connectionPage.fill(selectors.basePagePO.FTP_HOST_URI, "celigo.files.com")
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_USERNAME)
    await io.connectionPage.fill(selectors.basePagePO.FTP_USERNAME, process.env["FTP_username"])
    await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_PASSWORD)
    await io.connectionPage.fill(selectors.basePagePO.FTP_PASSWORD, decrypt(process.env["FTP_password"]))
    await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION)
    await io.homePage.loadingTime();
    await expect(page.getByText('Your connection is working great! Nice Job!')).toBeVisible;
  });
});
