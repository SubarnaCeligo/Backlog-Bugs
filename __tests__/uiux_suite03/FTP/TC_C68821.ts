import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68821 Verify user is attempting to connect to the SFTP server using Secure Connection as SSH.`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`@Env-All @Zephyr-IO-T11803 C68821 Verify user is attempting to connect to the SFTP server using Secure Connection as SSH.`, async({io,page}) => {
  
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.click(selectors.connectionsPagePO.FTP_CONNECTION)
        await io.connectionPage.waitForElementAttached(selectors.importPagePO.NAME)
        await io.connectionPage.fill(selectors.basePagePO.NAME, "FTP test")
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_HOST_URI)
        await io.connectionPage.fill(selectors.basePagePO.FTP_HOST_URI, "celigo.files.com")
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_USERNAME)
        await io.connectionPage.fill(selectors.basePagePO.FTP_USERNAME, "io.auto.qa@celigo.com")
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.FTP_PASSWORD)
        await io.connectionPage.fill(selectors.basePagePO.FTP_PASSWORD, "itZDKb3PJ43bLQIS")
        await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION)
        await io.assert.verifyElementText(selectors.basePagePO.NOTIFICATION_ID, "Your test was not successful. Check your information and try again")

    });
});