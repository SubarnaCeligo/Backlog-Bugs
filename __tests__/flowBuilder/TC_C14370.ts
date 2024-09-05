import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T2937", () => {
  test("@Env-All @Zephyr-IO-T2937", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** Clicking on create connections ***", async () => { });
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();

    test.step("*** Giving connection name *** ", async () => { });
    await expect(page.getByText("Name *")).toBeVisible();
    var connection_baseuri = await io.homePage.getText(
      selectors.connectionsPagePO.BASEURI + " label"
    );
    await io.assert.expectToBeValue(String(connection_baseuri), "Base URI *", "");
    var connection_media_type = await io.homePage.getText(
      selectors.connectionsPagePO.MEDIA_TYPE + " label"
    );
    await io.assert.expectToBeValue(String(connection_media_type), "Media type *", "");
    var connection_auth_type = await io.homePage.getText(
      selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID + " label"
    );
    await io.assert.expectToBeValue(String(connection_auth_type), "Auth type *", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    await io.homePage.loadingTime();
    test.step("*** Clicking on create export ***", async () => { });
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();

    test.step("*** selecting Http ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime()
    await expect(page.getByText("Connection *")).toBeVisible();
    await expect(page.getByText("Name *")).toBeVisible();
    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'http');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.NAME_INPUT,
      "SomeExportName"
    );

    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await io.homePage.loadingTime();
    await expect(page.getByText("HTTP method *")).toBeVisible();
    await expect(page.getByText("Relative URI *")).toBeVisible();
    var ele = await page.$(selectors.exportsPagePO.CONFIGURE_EXPORT_TYPE);
    await ele.scrollIntoViewIfNeeded()
    await expect(page.getByText("Export type *")).toBeVisible();
    test.step("*** Export mandatory fields done ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    await expect(page.getByText("Connection *")).toBeVisible();
    await expect(page.getByText("Name *")).toBeVisible();
    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'http');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
    await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.NAME_INPUT,
      "SomeImportName"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await expect(page.getByText("HTTP method *")).toBeVisible();
    test.step("*** Import mandatory fields done ***", async () => { });
  });
});
