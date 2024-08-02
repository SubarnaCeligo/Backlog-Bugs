import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68820 Verify User attempt to Connect to the SFTP server in very short time out.`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`@Env-All @Zephyr-IO-T11802 C68820 Verify User attempt to Connect to the SFTP server in very short time out.`, async({io,page}) => {
  
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.click(selectors.connectionsPagePO.FTP_CONNECTION)
        await io.connectionPage.waitForElementAttached(selectors.importPagePO.NAME)
        await io.connectionPage.fill(selectors.importPagePO.NAME, "FTP test")
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_HOST_URI)
        await io.connectionPage.fill(selectors.basePagePO.FTP_HOST_URI, "celigo.files.com")
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_USERNAME)
        await io.connectionPage.fill(selectors.basePagePO.FTP_USERNAME, "io.auto.qa+300@celigo.com")
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_PASSWORD)
        await io.connectionPage.fill(selectors.basePagePO.FTP_PASSWORD, "itZDKb3PJ43bLQIS")
        await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION)
        await io.assert.verifyElementText(selectors.basePagePO.NOTIFICATION_ID, "Your test was not successful. Check your information and try again")

    });
});
