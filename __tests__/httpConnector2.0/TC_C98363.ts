
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C98363_TC_C98365", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T25358 @Env-All TC_C98363 Verify Default database name field and its help text in the connection form of snowflake", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.SNOWFLAKE);
    test.step("*** Selected snowflake as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const dbName = await io.homePage.getText(
      selectors.connectionsPagePO.DEFAULT_DB_NAME_LABEL
    );
    expect(dbName).toContain("Default database name");
    await io.homePage.click(
      selectors.connectionsPagePO.DEFAULT_DB_HELPTEXT_BTN
    );
    var help = await io.homePage.getText(
      selectors.flowBuilderPagePO.STACKHELPTEXT
    );
    expect(help).toContain(
      "Enter the default Snowflake database to use. This value can be overwritten in your flows."
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified Default database name and help text***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T25357 @Env-All TC_C98365 Verify Default schema field and its help text in the connection form of snowflake", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.SNOWFLAKE);
    test.step("*** Selected snowflake as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const dbSchema = await io.homePage.getText(
      selectors.connectionsPagePO.DEFAULT_DB_SCHEMA_LABEL
    );
    expect(dbSchema).toContain("Default schema");
    await io.homePage.click(
      selectors.connectionsPagePO.DEFAULT_DB_SCHEMA_HELPTEXT_BTN
    );
    var help = await io.homePage.getText(
      selectors.flowBuilderPagePO.STACKHELPTEXT
    );
    expect(help).toContain(
      "Enter the default schema name that the connection will use. If not entered, the connection will use the default schema defined in Snowflake for that specific user. This value can be overwritten in your flows."
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified Default schema and help text ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
