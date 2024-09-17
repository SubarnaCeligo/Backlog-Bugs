
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import channelape from "@testData/HTTPConnector2.0/TC_IO_31627.json";

test.describe("TC_C60385 Verify whether token and refresh token options are removed", () => {
  const connectionName = "Yotpo Connection TC_C60385";
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T23187 @Env-All TC_C60385 Verify whether token and refresh token options are removed", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    test.step("*** Clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.YOTPOCONNECTION
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var tokenvalue = await (
      await page.locator(selectors.flowBuilderPagePO.TOKENVALUE)
    ).isVisible();
    expect(tokenvalue).toBeFalsy();
    var generatetoken = await (
      await page.locator(selectors.connectionsPagePO.MAGENTO2_GENERATE_TOKEN)
    ).isVisible();
    expect(generatetoken).toBeFalsy();
    await test.step(
      "*** validated tokenvalue and generate token doesn't exist in connection form ***",
      async ()=>{}
    );

    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      connectionName
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CLIENTID,
      channelape.yotpo_clientid
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CLIENTSECRET,
      channelape.yotpo_clientsecret
    );

    test.step("*** created yotpo connection ***", async ()=>{});

    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      connectionName
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    var tokenvalue1 = await (
      await page.locator(selectors.flowBuilderPagePO.TOKENVALUE)
    ).isVisible();
    expect(tokenvalue1).toBeFalsy();
    var generatetoken1 = await (
      await page.locator(selectors.connectionsPagePO.MAGENTO2_GENERATE_TOKEN)
    ).isVisible();
    expect(generatetoken1).toBeFalsy();
    await test.step(
      "*** validated tokenvalue and generate token doesn't exist in edit connection form ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );

    test.step("*** deleted created connection ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
