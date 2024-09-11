
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";


test.describe("TC_C51558", () => {
  const connectionName = "HTTP Orderful Connection";
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18899 @Env-All TC_C51558", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.ORDERFUL);
    test.step("*** Select orderful connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const httpToggle = await page.locator(selectors.basePagePO.HTTP_2DOT0);
    await httpToggle.click();
    test.step("Navigatig to HTTP Toggle", async ()=>{});
    expect(await httpToggle.getAttribute("class")).toContain(selectors.basePagePO.MUI_SELECTED_OPTION);
    test.step("Verifying if Http tab is selected", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      connectionName
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      await decrypt(process.env["ORDERFUL_Token"])
    );
    await io.homePage.click(
      selectors.basePagePO.TEST_CONNECTION
    );
    await io.homePage.loadingTime();
    var txt = await io.homePage.getTextFromElement(
      selectors.basePagePO.NOTIFICATION_ID,
      "Your connection is working great! Nice Job!"
    );
    await io.assert.expectToBeTrue(txt, "");
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      connectionName
    );
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ACTIONSMENUINFLOW
    );
    test.step("click on action Menu", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.connectionsPagePO.DELETE_CONNECTION
    );
    test.step("Delete option", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    test.step("Delete Connection", async ()=>{});
    await io.homePage.loadingTime();
    await test.step("Verified User should be able to save and close the connection and test test sucssefully", async ()=>{});
  });
});
