import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C47437", () => {
  test("C47437", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.clickByText("Abctest1-DND")
    await io.flowBuilder.waitForElementAttached('[data-test="Notifications"]')
    await io.flowBuilder.click('[data-test="Notifications"]')
    await io.flowBuilder.click('[data-test="connections"]')
    await page.locator('#menu-connections').getByText('ftp con').click()
    await io.flowBuilder.click('[data-test="closeSelect"]')
    await io.flowBuilder.click('[data-test="Save"]')
    await io.flowBuilder.waitForElementAttached('[data-test="Connections"]')
    await io.homePage.click('[data-test="Connections"]')
    await io.connectionPage.clickByText("ftp con")
    await io.connectionPage.fill('[name="/ftp/password"]', "test")
    await io.connectionPage.click('[data-test="saveAndClose"]')
    await io.connectionPage.click('[data-test="Save"]')
    await io.connectionPage.clickByText("ftp con")
    await io.connectionPage.fill('[name="/ftp/password"]', "w6jZ^DO9@HRUtA5f")
    await io.connectionPage.click('[data-test="saveAndClose"]')
     
     
    await io.flowBuilder.delay(20000);
    const res = await io.emailVal.getLinkFromEmail("[staging.integrator.io] connection is offline: ftp con",true, "pwqa1");
    await io.assert.expectNotToBeNull(res, "email is not working")
    

    await io.flowBuilder.waitForElementAttached('[data-test="Notifications"]')
    await io.flowBuilder.click('[data-test="Notifications"]')
    await io.flowBuilder.click('[data-test="connections"]')
    await page.locator('#menu-connections').getByText('ftp con').click()
    await io.flowBuilder.click('[data-test="closeSelect"]')
    await io.flowBuilder.click('[data-test="Save"]')
 
 
 
  });
});