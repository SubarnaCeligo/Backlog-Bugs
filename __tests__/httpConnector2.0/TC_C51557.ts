
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";


test.describe("TC_C51557", () => {
  const connectionName = "Simple Orderful Connection";
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18898 @Env-All TC_C51557", async ({io,page}, testInfo) => {
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
    const simpleToggle = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    const simpleToggleState = await simpleToggle.getAttribute("data-state");
    if (simpleToggleState) {
      expect(await simpleToggle.getAttribute("data-state")).toBe("on");
    } else {
      expect(await simpleToggle.getAttribute("aria-pressed")).toBe("true");
    }
    test.step("Verifying if Simple tab is selected", async ()=>{});
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
    await test.step("Verified User should be able to save and close the connection and test it successfully", async ()=>{});
  });
});
