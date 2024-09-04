
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";


test.describe("TC_C51596 Verify Connection form for custom auth type", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18917 @Env-All TC_C51596 Verify Connection form for custom auth type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.UPS_CONNECTION
    );
    test.step("*** Select UPS connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "UPS Connection"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.ENVIRONMENT_WDIO
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Production"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.USERNAME1,
      process.env["UPS_USERNAME"]
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.PASSWORD1,
      decrypt(process.env["UPS_PASSWORD"])
    );
    (await io.homePage.findElementByDataTest("http.encrypted.accessLicenseNumber")).click();
    await io.homePage.clickByIndex(selectors.importPagePO.PASSWORD, 1);
    await page.keyboard.type(decrypt(process.env["ACCESS_LICENSE_NUMBER"]));
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
