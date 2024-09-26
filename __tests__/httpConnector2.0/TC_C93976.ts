
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C93976_TC_C93977", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21430 @Env-All TC_C93976 Verify whether simple form is displaying optional fields on create connection form", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.ADP_CONNECTION
    );
    await test.step(
      "*** Selected ADPWorkforcenow as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const optionalField = await page.locator(selectors.connectionsPagePO.HTTP_ENCRYPTED_PASSPHRASE_LABEL);
    expect(await optionalField.isVisible()).toBeTruthy();
    const fieldLabel = await io.homePage.getText(selectors.connectionsPagePO.HTTP_ENCRYPTED_PASSPHRASE_LABEL);
    expect(fieldLabel).not.toContain("*");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified Simple form should show optional(non-mandatory fields) in connection form ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T21431 @Env-All TC_C93977 Verify whether simple form is displaying optional fields on edit connection form", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (await page.locator(selectors.basePagePO.RESOURCES)).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "ADP CONNECTION"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const optionalField = await page.locator(selectors.connectionsPagePO.HTTP_ENCRYPTED_PASSPHRASE_LABEL);
    expect(await optionalField.isVisible()).toBeTruthy();
    const fieldLabel = await io.homePage.getText(selectors.connectionsPagePO.HTTP_ENCRYPTED_PASSPHRASE_LABEL);
    expect(fieldLabel).not.toContain("*");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified this for edit connection case ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
