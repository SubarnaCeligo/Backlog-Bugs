import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify that user with Admin/Manage level can set or modify 'Auto-recover rate limit errors' and 'Concurrency level' fields.", () => {
  test("@Zephyr-IO-T24496 @Env-All @Epic-IO-86262 @Priority-P2 - Verify that user with Admin/Manage level can set or modify 'Auto-recover rate limit errors' and 'Concurrency level' fields.", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.IMPORT_CREATE_CONNECTION);

    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    
    await page.locator(selectors.importPagePO.ADVANCED).first().scrollIntoViewIfNeeded();;
    await page.locator(selectors.importPagePO.ADVANCED).first().click();
    
    await io.assert.verifyElementToBeClickable(selectors.connectionsPagePO.AUTO_RECOVERY_RATE_LIMIT);
    await io.homePage.click(selectors.connectionsPagePO.AUTO_RECOVERY_RATE_LIMIT);
    await io.assert.verifyElementToBeClickable(selectors.connectionsPagePO.CONCURRENCYLEVEL);
    await io.homePage.click(selectors.connectionsPagePO.CONCURRENCYLEVEL);

    await io.connectionPage.selectTextfromDropDown(page, '20');

    await io.assert.verifyElementContainsText(
      selectors.connectionsPagePO.CONCURRENCYLEVEL,
      "20"
    );
  });
});
