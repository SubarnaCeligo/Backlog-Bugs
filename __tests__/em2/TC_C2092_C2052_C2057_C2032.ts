
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C2092_C2052_C2057_C2032", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T2015 @Zephyr-IO-T2008 @Zephyr-IO-T2012 @Zephyr-IO-T2003 TC_C2092_C2052_C2057_C2032| Verify the new delete dependency dialog across the App|Verified when the resource is not being used anywhere text with resource name is displayed 'This flow is not being used anywhere'|Verify the referenced by for flows/connections/exports/imports/stacks/scripts in owner account and the user level access cases|Verify the 'Used by' icon", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.HOME);
    test.step("*** Click on home Page ***", async ()=>{});
    //Import Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    let dropEle = await page.locator(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    ).nth(0);
    await dropEle.isVisible({ timeout: 5000 });
    await dropEle.click();
    test.step("*** Clicked on Action Dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    test.step("*** Clicked on Delete in ActionDropdown ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DELETE);
    test.step("*** Clicked on Confirm Delete ***", async ()=>{});
    var msg = (await io.homePage.getText("[role='dialog'] >h2")).toString();
    await io.assert.expectToContainValue("Unable to delete import as",msg, "");
await test.step(
      "*** delete dependency dialog appear when resource is already in use ***"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    //Connections Tab
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** Clicked on Connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "Http Do Not Use Connection"
    );
    await io.homePage.isPageReady();
    test.step("*** Search For Connection ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on action dropdown ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.USEDBY
    );
    await io.homePage.loadingTime();
    test.step("*** Click on usedby ***", async ()=>{});
    var msg3 = (await io.homePage.getText("//h4[contains(text(),'This resource is not being used anywhere')]")).toString();
    await io.assert.expectToContainValue(
      "This resource is not being used anywhere"
    ,msg3, "");
await test.step(
      "*** getting This resource is not being used anywhere when resource is not used ***"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Click on home Page ***", async ()=>{});
    //Exports Tab
    await io.homePage.goToMenu("Resources","Exports");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    let dropEle1 = await page.locator(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    ).nth(0);
    await dropEle1.isVisible({ timeout: 5000 });
    await dropEle1.click();
    test.step("*** Clicked on Action Dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.basePagePO.USEDBY
    );
    test.step("*** Click on usedby ***", async ()=>{});
    var msg2 = await page.$$("div > div > table > thead > tr > th:nth-child(1)");

    await io.assert.expectToBeTrue(await msg2[0].isVisible(), "");
await test.step(
      "*** References are shown test.afterEach clicking on usedby ***"
, async ()=>{});

    //Flows Page
    await io.goToFlowsPage();
    test.step("*** Go To Flows page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      1
    );
    test.step("*** Clicked on Actions DropDown ***", async ()=>{});

    var msg1 = await io.homePage.getText(
      selectors.basePagePO.USEDBY
    );

    await io.assert.expectToBeValue(String(msg1), "Used by", "");
await test.step(
      "*** Flows Actions DropDown contains Used By Option ***"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T2004 TC_C2033|Verify the Refresh metadata is working properly", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.HOME);
    test.step("*** Click on home Page ***", async ()=>{});

    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "NetSuite Connection"
    );
    await io.homePage.isPageReady();
    test.step("*** Search For Connection ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on action dropdown ***", async ()=>{});
    await io.homePage.click(
      "[data-test='refreshMetadata']"
    );
    test.step("*** Click on Refresh Meta Data ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on action dropdown again ***", async ()=>{});
    await io.homePage.click(
      "[data-test='refreshMetadata']"
    );
    test.step("*** Click on Refresh Meta Data again ***", async ()=>{});
await test.step(
      "*** Able to click on refresh metadata again imeditly test.afterEach clicking on refresh metadata ***"
, async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Click on home Page ***", async ()=>{});
  });
});
