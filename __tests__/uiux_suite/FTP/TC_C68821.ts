import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C68821 Verify user is attempting to connect to the SFTP server using Secure Connection as SSH.`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`C68821 Verify user is attempting to connect to the SFTP server using Secure Connection as SSH.`, async({io,page}) => {
  
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.click('[data-test="FTP"]')
        await io.connectionPage.waitForElementAttached('[data-test="name"]')
        await io.connectionPage.fill('[name="/name"]', "FTP test")
        await io.connectionPage.waitForElementAttached('[name="/ftp/hostURI"]')
        await io.connectionPage.fill('[name="/ftp/hostURI"]', "celigo.files.com")
        await io.connectionPage.waitForElementAttached('[name="/ftp/username"]')
        await io.connectionPage.fill('[name="/ftp/username"]', "io.auto.qa@celigo.com")
        await io.connectionPage.waitForElementAttached('[name="/ftp/username"]')
        await io.connectionPage.fill('[name="/ftp/username"]', "io.auto.qa@celigo.com")
        await io.connectionPage.waitForElementAttached('[name="/ftp/password"]')
        await io.connectionPage.fill('[name="/ftp/password"]', "itZDKb3PJ43bLQIS")
        await io.connectionPage.click('[data-test="test"]')
        await io.assert.verifyElementText("#client-snackbar", "Your connection is working great! Nice Job!")

    });
});