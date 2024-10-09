import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T3048|To verify pinned integrations are displayed by 'Pin' icon before the Name", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io}) => {
    // Delete Integration
    await io.api.deleteIntegrationRecursively(
      "C33017"
    );
  });
  test("@Env-All @Zephyr-IO-T3048|To verify pinned integrations are displayed by 'Pin' icon before the Name", async ({io,page}) => {
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    await io.homePage.fill(
      selectors.basePagePO.NAME,
      "C33017"
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    test.step("Clicked on list view.", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "C33017"
    );
  
    await io.homePage.loadingTime();
    test.step("Entered value in search area.", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    test.step("Click on Action menu.", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.PIN_INTEGRATION);
    test.step("Click on Pin integration.", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.myAccountPage.waitForElementAttached("table > tbody > tr > th svg");
    var logoPin = await io.homePage.isVisible(
      "table > tbody > tr > th svg"
    );
    await io.assert.expectToBeTrue(logoPin, "");
await test.step(
      "pinned integrations are displayed by 'Pin' icon test.beforeEach the Name."
, async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON
    );
    await io.homePage.click(
      selectors.integrationPagePO.UNPIN_INTEGRATION
    );
    await io.homePage.loadingTime();
  });
});
