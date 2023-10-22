import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C67020 To verify that the delete option colour is changed to red colour', () => {
  test('Homepage tile view', async ({page,io}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES);
    await io.homePage.clickByIndex(`:has-text("Automation Flows") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`, 0);
    const color = await page.locator(selectors.homePagePO.DELETE_INTEGRATION).evaluate((el: any) => getComputedStyle(el).color);
    await io.assert.expectToBeValue(color,"rgb(217, 83, 79)","Color not red");
  });

  test('Homepage List view', async ({page,io}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.LIST_VIEW)
    await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`)
    await io.homePage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`, 0);
    const color = await page.locator(selectors.homePagePO.DELETE_INTEGRATION).evaluate((el: any) => getComputedStyle(el).color);
    await io.assert.expectToBeValue(color,"rgb(217, 83, 79)","Color not red");
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
  }); 

  test("Connections Page.", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.goToMenu("Resources","Connections");
        await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
        await io.connectionPage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
        await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
        const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
        await io.assert.expectToBeValue(color,"rgb(217, 83, 79)","Color not red");
    });
    test("Imports Page.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.goToMenu("Resources","Imports");
      await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
      await io.importsPage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
      await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
      const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectToBeValue(color,"rgb(217, 83, 79)","Color not red");
    });
    test("Exports Page.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.goToMenu("Resources","Exports");
      await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
      await io.exportsPage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
      await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
      const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectToBeValue(color,"rgb(217, 83, 79)","Color not red");
    });
    test("My APIs Page.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.goToMenu("Resources","My APIs");
      await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
      await io.homePage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
      await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
      const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
      await io.assert.expectToBeValue(color,"rgb(217, 83, 79)","Color not red");
    });

    test("Integration Page.", async ({io, page}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
        await io.homePage.clickByIndex(`${selectors.flowBuilderPagePO.COLUMNS} ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`, 0);
        await io.homePage.waitForElementAttached(selectors.connectionsPagePO.DELETE_CONNECTION);
        const color = await page.locator(selectors.connectionsPagePO.DELETE_CONNECTION).evaluate((el: any) => getComputedStyle(el).color);
        await io.assert.expectToBeValue(color,"rgb(217, 83, 79)","Color not red");
    });
});
