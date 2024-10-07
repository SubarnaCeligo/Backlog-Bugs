
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C99699", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T25522 @Env-All TC_C99699 Check for custom settings field inside iClient when required flag as true", async ({io,page}, testInfo) => {
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
    await io.homePage.click(
      selectors.connectionsPagePO.GUSTO_CONNECTION
    );
    test.step("*** Selected Gusto as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    var asterisk = await io.homePage.getTextFromElement(
      selectors.basePagePO.ASTERISK,
      "*"
    );
    await io.assert.expectToBeTrue(asterisk, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENTSTAB
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "gusto")
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var asterisk1 = await io.homePage.getTextFromElement(
      selectors.basePagePO.ASTERISK,
      "*"
    );
    await io.assert.expectToBeTrue(asterisk1, "");
    await test.step(
      "*** Verified the particular fields should be shown mandtory field  ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
