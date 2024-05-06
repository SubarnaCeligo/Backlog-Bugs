import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";
import { decrypt } from "@celigo/aut-utilities";

test.describe.skip("C47437", () => {
  test("C47437", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.clickByText("Abctest1-DND")
    await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.NOTIFICATIONS_TAB)
    await io.flowBuilder.click(selectors.integrationPagePO.NOTIFICATIONS_TAB)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CONNECTIONS_TAB)
    await page.locator(selectors.basePagePO.MENUCONNECTIONS).getByText('ftp con').click()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT)
    await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE)
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CONNECTIONS)
    await io.homePage.click(selectors.basePagePO.CONNECTIONS)
    await io.connectionPage.clickByText("ftp con")
    await io.connectionPage.fill(selectors.basePagePO.FTP_PASSWORD, "test")
    await io.connectionPage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE)
    await io.connectionPage.click(selectors.basePagePO.MFA_SAVE)
    await io.connectionPage.clickByText("ftp con")
    await io.connectionPage.fill(selectors.basePagePO.FTP_PASSWORD, process.env.FTP_password)
    await io.connectionPage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE)
     
     
    await io.flowBuilder.delay(20000);
    const res = await io.emailVal.getLinkFromEmail("[staging.integrator.io] connection is offline: ftp con",true, "pwqa1");
    await io.assert.expectNotToBeNull(res, "email is not working")
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.NOTIFICATIONS_TAB)
    await io.flowBuilder.click(selectors.integrationPagePO.NOTIFICATIONS_TAB)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CONNECTIONS_TAB)
    await page.locator(selectors.basePagePO.MENUCONNECTIONS).getByText('ftp con').click()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT)
    await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE)
 
  });
});