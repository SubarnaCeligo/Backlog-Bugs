
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C108196", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24174 @Env-All TC_C108196 Verify the functionality of connection by selecting different Send token via dropdown values", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C108196 HTTP CONNECTION"
    );
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.HTTP_BASE_URI,
      " https://pricemole.io"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "token")
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.TOKENVALUE,
      "123456"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.LOCATION
    );
    await io.homePage.selectTextfromDropDown(page, "body")
    await io.homePage.click(
      selectors.connectionsPagePO.LOCATION
    );
    await io.homePage.selectTextfromDropDown(page, "url")
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified User should able to work on all diffrent dropdown values ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T24177 @Env-All TC_C108200 Verify save save&close and close buttons are working fine at HTTP response headers", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "custom")
    await io.homePage.click(
      selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM
    );
    await (await io.homePage.findElementByDataTest("header")).click();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.PATH_TO_TOKEN,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.HTTPREQUSTBODY,
      "test"
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE,
      1
    );
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.PATH_TO_TOKEN,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    const headerText = await page.locator(
      selectors.flowBuilderPagePO.PATH_TO_TOKEN
      + " " + selectors.flowBranchingPO.INPUT
    ).inputValue();
    expect(headerText).toContain("test");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified User should able to save save&close and close buttons ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
