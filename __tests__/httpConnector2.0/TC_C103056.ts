
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103056", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24451 @Env-All TC_C103056 Verify user able to see the iclient under OAuth 2.0 client dropdown when we create iclient through under Resource iClient", async ({io,page}, testInfo) => {
    const iClientName = "TC_C103056 CONSTANT V3 ICLIENT";
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
    await (await io.homePage.findElementByDataTest("Constant Contact")).click();
    await test.step(
      "*** Selected Constant Contact as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Constant Contact V3"
    );
    await (await io.homePage.findElementByDataTest("Constant Contact v3")).click();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await page.locator(selectors.basePagePO.NAME).nth(1).fill(iClientName);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "jhbscj"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "jrtyu"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    const iClientId = await io.homePage.getText(selectors.connectionsPagePO.ICLIENT_ID);
    expect(iClientId).toContain(iClientName);
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await io.homePage.click(
      selectors.basePagePO.RESOURCES
    );
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENTSTAB
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      iClientName
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await page.waitForTimeout(5000);
    if (await page.locator(selectors.integrationPagePO.OPENACTIONSMENU).isVisible()) {
      await page.waitForTimeout(5000);
    }
    await test.step(
      "*** User should able to see Iclient created under OAuth 2.0 iclient dropdown  ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T24452 @Env-All TC_C103057 Verify user able to see the iclient under OAuth 2.0 client dropdown", async ({io,page}, testInfo) => {
    const iClientName = "TC_C103057 CONSTANT V3 ICLIENT";
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (
      await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.NAME_INPUT,
      iClientName
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await page.locator(selectors.flowBuilderPagePO.SCROLL_TOP).nth(0).evaluate((el) => {
      el.scrollTop = 0
    });
    await io.homePage.selectTextfromDropDown(page, "constantcontact")
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Constant Contact v3")).click();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "hgfd"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "hgfd"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RESOURCES
    );
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Constant Contact")).click();
    await test.step(
      "*** Selected Constant contat as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Constant Contact v3")).click();
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      iClientName
    );
    const iClientId = await io.homePage.getText(selectors.connectionsPagePO.ICLIENT_ID);
    expect(iClientId).toContain(iClientName);
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RESOURCES
    );
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENTSTAB
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      iClientName
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await page.waitForTimeout(5000);
    if (await page.locator(selectors.integrationPagePO.OPENACTIONSMENU).isVisible()) {
      await page.waitForTimeout(5000);
    }
    await test.step(
      "*** User should able to see Iclient created under OAuth 2.0 iclient dropdown ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T24454 @Env-All TC_C103059 Verify user is able create the connection", async ({io,page}, testInfo) => {
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
    await (await io.homePage.findElementByDataTest("Constant Contact")).click();
    await test.step(
      "*** Selected Constant Contact as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "TC_C103059 Constant Contact V3"
    );
    await (await io.homePage.findElementByDataTest("Constant Contact v3")).click();
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "CONSTANT CONTACT V3 DND"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C103059 Constant Contact V3"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified if User is able to create connection using the Constant Contact V3 iClient ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T24455 @Env-All TC_C103060 Verify user able to Verify user able to see the iclient under OAuth 2.0 client dropdown in edit case", async ({io,page}, testInfo) => {
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "CONSTANT CONTACT V3 CONNECTION"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    const iClientId = await io.homePage.getText(selectors.connectionsPagePO.ICLIENT_ID);
    expect(iClientId).toContain("CONSTANT CONTACT V3 DND");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** User should able to see Iclient created under OAuth 2.0 client dropdown ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T24457 @Env-All TC_C103062 Verify user is not able to see iclient field in Constant Contact V2 connection", async ({io,page}, testInfo) => {
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
    await (await io.homePage.findElementByDataTest("Constant Contact")).click();
    await test.step(
      "*** Selected Constant Contact as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "Constant Contact V2"
    );
    await (await io.homePage.findElementByDataTest("Constant Contact v2")).click();
    await io.homePage.loadingTime();
    const iClientId = await page.locator(selectors.connectionsPagePO.ICLIENT_ID);
    expect(iClientId).toBeHidden();
    const isOldBtn = await page.locator(selectors.basePagePO.HTTP_2DOT0).isVisible();
    if (isOldBtn) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    } else {
      await io.homePage.click(
        selectors.flowBuilderPagePO.HTTP_TOGGLE
      );
    }
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    const edit = await page.locator(
      selectors.integrationPagePO.EDITRESOURCE
    );
    expect(edit).toBeDisabled();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** User should not be able to see iclient field in connection page ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
