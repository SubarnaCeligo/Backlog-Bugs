
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Ware2go from "@testData/HTTPConnector2.0/TC_C103016.json";

test.describe("TC_C103016", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T24443 @Env-All TC_C103016 Verify User able to see fields as per metadata in simple form", async ({io,page}, testInfo) => {
    test.step("** Getting response from post request ***", async ()=>{});
    const response = await io.api.postCall(
      "v1/httpconnectors",
      JSON.stringify(Ware2go)
    );
    await test.step(
      "** Creating Connector through post request ***",
      async ()=>{}
    );
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Ware2Go local story")).click();
    test.step("*** Selected Ware2go local story as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const version = await page.locator(
      selectors.connectionsPagePO.WARE2GO_PLATFORMVERSION
    );
    expect(version).toBeVisible();
    const type = await page.locator(
      selectors.connectionsPagePO.WARE2GO_ACCOUNTTYPE
    );
    expect(type).toBeVisible();
    const merchantId = await page.locator(
      selectors.connectionsPagePO.WARE2GO_MERCHANT_ID
    );
    expect(merchantId).toBeVisible();
    await io.homePage.loadingTime();
    await test.step(
      "*** User should able to see the fields in connection page as per the metadata ***",
      async ()=>{}
    );
    const formedUrl = "v1/httpconnectors/" + response._id;
    const removeConnector = await io.api.deleteCall(
      formedUrl,
    );
    test.step("*** Validating the response of the route***", async ()=>{});
    await expect(removeConnector).hasOwnProperty(204);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24444 @Env-All TC_C103017 Verify User able to see fields as per metadata in simple form as like iclient form", async ({io,page}, testInfo) => {
    test.step("** Getting response from post request ***", async ()=>{});
    const response = await io.api.postCall(
      "v1/httpconnectors",
      JSON.stringify(Ware2go)
    );
    await test.step(
      "** Creating Connector through post request ***",
      async ()=>{}
    );
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Ware2Go local story")).click();
    test.step("*** Selected Ware2go local story as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const labels = await page.locator(
      selectors.basePagePO.NAME_WDIO_1
    );
    expect(await labels.nth(1).textContent()).toContain('Platform version');
    expect(await labels.nth(2).textContent()).toContain('Account type');
    await test.step(
      "*** User  User should able to see the Platform version field as per metadata  ***",
      async ()=>{}
    );
    const formedUrl = "v1/httpconnectors/" + response._id;
    const removeConnector = await io.api.deleteCall(
      formedUrl,
    );
    test.step("*** Validating the response of the route***", async ()=>{});
    await expect(removeConnector).hasOwnProperty(204);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24446 @Env-All TC_C103021 Verify user able to see the connection fields in simple form", async ({io,page}, testInfo) => {
    test.step("** Getting response from post request ***", async ()=>{});
    const response = await io.api.postCall(
      "v1/httpconnectors",
      JSON.stringify(Ware2go)
    );
    await test.step(
      "** Creating Connector through post request ***",
      async ()=>{}
    );
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Ware2Go local story")).click();
    test.step("*** Selected Ware2go local story as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
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
    const version = await page.locator(
      selectors.connectionsPagePO.WARE2GO_PLATFORMVERSION
    );
    expect(version).toBeVisible();
    const type = await page.locator(
      selectors.connectionsPagePO.WARE2GO_ACCOUNTTYPE
    );
    expect(type).toBeVisible();
    const merchantId = await page.locator(
      selectors.connectionsPagePO.WARE2GO_MERCHANT_ID
    );
    expect(merchantId).toBeVisible();
    await io.homePage.loadingTime();
    await test.step(
      "*** User should able to see the fields in connection page as per the metadata ***",
      async ()=>{}
    );
    const formedUrl = "v1/httpconnectors/" + response._id;
    const removeConnector = await io.api.deleteCall(formedUrl);
    test.step("*** Validating the response of the route***", async ()=>{});
    await expect(removeConnector).hasOwnProperty(204);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
