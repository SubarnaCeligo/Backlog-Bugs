import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("TC_T2497", () => {
  test("@Env-All  @Zephyr-IO-T2497 Username field should be a mandatory field", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.homePage.click(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.flowBuilder.fill(selectors.exportsPagePO.BQNAME, "SF Conn");
    await io.flowBuilder.click(selectors.connectionsPagePO.SF_ACCOUNTTYPE);
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OAUTHTYPE);
    await io.flowBuilder.click(selectors.connectionsPagePO.JWT_BEARER_TOKEN);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.loadingTime();
    await expect(page.getByText('A value must be provided')).toBeVisible();

  });
});