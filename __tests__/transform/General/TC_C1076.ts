
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("C1076", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to signin page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C1076", async ({io,page}, testInfo) => {
    await test.step("***Creating an integration***",()=>{});
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.fillWebPage(
      selectors.basePagePO.NAME,
      "New@#$#$#Integration12"
    );
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.EDIT_DESCRIPTION,
      "New Integration"
    );
await test.step(
      "*** Entered Integration Name and description***"
, async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await test.step("***Clicked On Save.***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "New@#$#$#Integration12"
    );
    var name = page.$$(selectors.integrationPagePO.INTNAME);
    var name1 = name[1].getText();
    expect(name1).toEqual("New@#$#$#Integration12");
    await test.step("*** Verified the Integration is Created ***",()=>{});
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await test.step("***Clicked Action Dropdown***",()=>{});
    await io.homePage.click(
      selectors.homePagePO.DELETE_INTEGRATION
    );
    await test.step("***Clicked Delete Integration***",()=>{});
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    await test.step("***Clicked on Confirm Delete Integration***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.click(
      selectors.homePagePO.TILE_VIEW
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
