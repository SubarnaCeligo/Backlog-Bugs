import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T3025|@Env-All @Zephyr-IO-T3027|@Env-All @Zephyr-IO-T3003|@Env-All @Zephyr-IO-T3000|@Env-All @Zephyr-IO-T3004|@Env-All @Zephyr-IO-T3033", () => {
  test.afterEach(async ({io}) => {
    // Delete Integration
    await io.api.deleteIntegrationRecursively(
      "Tile1 C32972"
    );
  });
  test("@Env-All @Zephyr-IO-T3025|To verify `Unpin Integration` is displayed under actions options for all the pinned DIY, template integrations and Integration Apps|@Env-All @Zephyr-IO-T3003|To verify few columns are displayed when there are search results|@Env-All @Zephyr-IO-T3000|To verify integrations and flows names matching the search keywords are displayed|@Env-All @Zephyr-IO-T3004|To verify 'i' symbol is displayed along with the name which displays `description` while hovering on it|@Env-All @Zephyr-IO-T3027|To verify when pinned DIY, template integrations and Integration Apps is unpinned, it is moved back to orginal order|@Env-All @Zephyr-IO-T3033|To verify `Delete Integration` is displayed under actions options for DIY, template integrations", async ({io,page}) => {
    test.step("***Creating an integration***", async ()=>{});
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    await io.homePage.fill(
      selectors.basePagePO.NAME,
      "Tile1 C32972"
    );
    await io.homePage.fill(
      selectors.basePagePO.FORM_DESCRIPTION_SELECTOR,
      "Tile1 C32972 - description"
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("***Clicked On Save.***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.fill(
      selectors.integrationPagePO.HOME_SEARCH,
      "Tile1 C32972"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.loadingTime();
   
    const name = await page.getByText(
      "Name"
    );
    await expect(name).toBeVisible();
    
    const apps = await page.getByText(
      "Applications"
    );
    await expect(apps).toBeVisible();
    
    const status = await page.getByText(
      "Status"
    );
    await expect(status).toBeVisible();
    
    const error = await page.getByText(
      "Last open error"
    );
    await expect(error).toBeVisible();
    
    const type = await page.getByText(
      "Type"
    );
    await expect(type).toBeVisible();
    
    const actions = await page.getByText(
      "Actions"
    );
    await expect(actions).toBeVisible();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.loadingTime();
    var deleteIntegrationCheck = await io.homePage.isVisible(selectors.homePagePO.DELETE_INTEGRATION);
    await io.assert.expectToBeTrue(deleteIntegrationCheck, "");
    await io.homePage.click(selectors.basePagePO.TOOLTIP);
    await io.homePage.loadingTime();
    const text = await page.getByText(
      "Tile1 C32972 - description"
    );
    await expect(text).toBeVisible();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.PIN_INTEGRATION);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU,0);
    const unpin = await page.getByText("Unpin Integration");
    await expect(unpin).toBeVisible();
    await io.homePage.click(selectors.integrationPagePO.UNPIN_INTEGRATION);
    await io.homePage.loadingTime();
    const label = await page.locator("tbody > tr:nth-child(1) > th:nth-child(1)");
    const pinned = await label.textContent();
    await expect(pinned).not.toBe('Tile1 C32972');
    
  });
});
