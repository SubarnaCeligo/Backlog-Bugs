
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";
test.describe("TC_C2088", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C2088", async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    await test.step("*** clicked on connection button ***", () => { });
    await io.homePage.loadingTime();
    await test.step("*** Navigated to list of exports ***", () => { });
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    // var colHeader = await (
    //   page.$(".MuiTableSortLabel-root")
    // ).isDisplayed();
    var colHeader = await io.assert.verifyElementIsDisplayed(".MuiTableSortLabel-root", "Elements is not displayed")
    await expect(colHeader).toBeTruthy();
    // var ele1Text = await (
    //   page.$(selectors.basePagePO.EXPORTSLIST)
    // ).getText();
    var ele1Text = await io.homePage.getText(selectors.basePagePO.EXPORTSLIST)
    await test.step("*** Refreshing page ***", () => { });
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await expect(colHeader).toBeTruthy();
    // var ele2Text = await (
    //   page.$(selectors.basePagePO.EXPORTSLIST)
    // ).getText();
    var ele2Text = await io.homePage.getText(selectors.basePagePO.EXPORTSLIST)
    await expect(ele1Text).toEqual(ele2Text);
    await test.step(
      "*** Verified test.afterEach refreshing the exports page, the data under Type column is visible and test's the same as test.beforeEach ***"
      , async () => { });
    await test.step(" Clicking on the imports option ***", () => { });
    await io.homePage.click(
      selectors.basePagePO.IMPORTS
    );
    await io.homePage.isPageLoaded();
    await expect(colHeader).toBeTruthy();
    // var ele3Text = await (
    //   page.$(selectors.basePagePO.EXPORTSLIST)
    // ).getText();
    var ele3Text = await io.homePage.getText(selectors.basePagePO.EXPORTSLIST)
    await test.step("*** Refreshing page ***", () => { });
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await expect(colHeader).toBeTruthy();
    // var ele4Text = await (
    //   page.$(selectors.basePagePO.EXPORTSLIST)
    // ).getText();
    var ele4Text = await io.homePage.getText(selectors.basePagePO.EXPORTSLIST)
    await expect(ele3Text).toEqual(ele4Text);
    await test.step(
      "*** Verified test.afterEach refreshing the imports page, the data under Type column is visible and test's the same as test.beforeEach ***"
      , async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to HomePage ***", () => { });
  });
});
