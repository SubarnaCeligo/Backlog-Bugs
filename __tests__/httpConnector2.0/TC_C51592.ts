
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";


test.describe("TC_C51592 Verify Connection form for basic auth type", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18914 @Env-All TC_C51592 Verify Connection form for basic auth type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.NARVAR_CONNECTION
    );
    test.step("*** Select Narvar connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Narvar Connection"
    );
    await io.homePage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.BASICUSERNAME,
      decrypt(process.env["NARVAR_USERNAME"])
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.BASIC_PASSWORD,
      decrypt(process.env["NARVAR_PASSWORD"])
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
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step("Verified user should be able to test the connection successfully and save test", async ()=>{});
  });
});
