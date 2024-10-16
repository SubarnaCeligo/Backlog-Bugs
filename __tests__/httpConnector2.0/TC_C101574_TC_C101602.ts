
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C101574_TC_C101602", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T25635 @Env-All TC_C101574 Verify if user is able to toggle between Simple and HTTP form view after creating a connection", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.GUSTO_CONNECTION
    );
    test.step("*** Selected Gusto as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    const isOldBtn = await page.locator(selectors.basePagePO.HTTP_2DOT0).isVisible();
    if (isOldBtn) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    } else {
      await io.homePage.click(selectors.flowBuilderPagePO.HTTP_TOGGLE);
    }
    await io.homePage.loadingTime();
    if (isOldBtn) {
      await io.homePage.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    } else {
      await io.homePage.click(selectors.flowBuilderPagePO.SIMPLE_TOGGLE);
    }
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified Should be able to toggle between 'Simple' and 'Http' values***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T25636 @Env-All TC_C101602 Verify company and locale fields are still visible in the connection edit form when left empty", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "Lexbizz DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    const company = await page.locator(
      selectors.connectionsPagePO.COMPANY
    );
    expect(company).toBeVisible();
    const locale = await page.locator(
      selectors.connectionsPagePO.LOCALE
    );
    expect(locale).toBeVisible();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified Verify company and locale fields are still visible in the connection form. ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
