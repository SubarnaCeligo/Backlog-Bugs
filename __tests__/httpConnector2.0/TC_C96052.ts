
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C96053_TC_C96054", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21450 @Env-All TC_C96053 Verify the application field list in resource iclient page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const applications = [
      "github",
      "googlesheets",
      "meta",
      "zoom",
    ];
    for (let app of applications) {
      await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
      await io.homePage.selectTextfromDropDown(page, app);
      await io.homePage.loadingTime();
    }
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await test.step(
      "*** User Application list dropdown should show only OAuth 2.0 supported applications***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21451 @Env-All TC_C96054 Verify the application field list when supportsIclient is set to fal se", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    const dropdownElements = ["LoopReturns", "Orderful"];
    const loc = selectors.flowBuilderPagePO.SELECTPAGINGMETHOD
    for (var a = 0; a < loc.length; a++) {
      let aut = await io.homePage.getDropDownValue(loc, dropdownElements[0]);
      await io.assert.expectToBeFalse((aut), "");
      let stan = await io.homePage.getDropDownValue(loc, dropdownElements[1]);
      await io.assert.expectToBeFalse((stan), "");
    }
    await io.homePage.selectTextfromDropDown(page, "gusto")
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** User Application where  supportsIclient is set to false that applications  should not shown in dropdown***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
