import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C67020 To verify that the delete option colour is changed to red colour', () => {
  test('@Env-All @Zephyr-IO-T24308 Homepage tile view', async ({ page, io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Automation Flows")
    await io.homePage.loadingTime()
    await page.locator(selectors.homePagePO.LIST_VIEW).waitFor({ state: 'visible', timeout: 190000 });
    await io.homePage.clickByIndex(`:has-text("Automation Flows") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`, 0);
    const color = await page.locator(selectors.homePagePO.DELETE_INTEGRATION).evaluate((el: any) => getComputedStyle(el).color);
    await io.assert.expectToBeValue(color, "rgb(217, 83, 79)", "Color not red");
  });
  
    test('@Env-All @Zephyr-IO-T24308 Homepage List view', async ({ page, io }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime()
      await page.locator(selectors.homePagePO.LIST_VIEW).waitFor({ state: 'visible', timeout: 3600000 });
      await io.homePage.click(selectors.homePagePO.LIST_VIEW);
      await io.homePage.loadingTime()
      await io.homePage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`, 1);
      await io.homePage.waitForElementAttached(selectors.homePagePO.DELETE_INTEGRATION);
      const color = await page.locator(selectors.homePagePO.DELETE_INTEGRATION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectToBeValue(color, "rgb(217, 83, 79)", "Color not red");
      await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    });
  
    test("@Env-All @Zephyr-IO-T24308 Connections Page.", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await page.locator(selectors.homePagePO.LIST_VIEW).waitFor({ state: 'visible', timeout: 190000 });
      await io.homePage.goToMenu("Resources", "Connections");
      await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
      await io.connectionPage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
      await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
      const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectToBeValue(color, "rgb(217, 83, 79)", "Color not red");
    });
    test("@Env-All @Zephyr-IO-T24308 Imports Page.", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime()
      await page.locator(selectors.homePagePO.LIST_VIEW).waitFor({ state: 'visible', timeout: 190000 });
      await io.homePage.goToMenu("Resources", "Imports");
      await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
      await io.importsPage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
      await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
      const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectToBeValue(color, "rgb(217, 83, 79)", "Color not red");
    });
    test("@Env-All @Zephyr-IO-T24308 Exports Page.", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await page.locator(selectors.homePagePO.LIST_VIEW).waitFor({ state: 'visible', timeout: 190000 });
      await io.homePage.goToMenu("Resources", "Exports");
      await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
      await io.exportsPage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
      await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
      const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectToBeValue(color, "rgb(217, 83, 79)", "Color not red");
    });
    test("@Env-All @Zephyr-IO-T24308 Integration Page.", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await page.locator(selectors.homePagePO.LIST_VIEW).waitFor({ state: 'visible', timeout: 3600000 });
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.loadingTime()
      await io.homePage.isPageLoaded()
      await io.homePage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
      await io.homePage.loadingTime()
      await io.homePage.isPageLoaded()
      await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
      const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectToBeValue(color, "rgb(217, 83, 79)", "Color not red");
    });
    
});
