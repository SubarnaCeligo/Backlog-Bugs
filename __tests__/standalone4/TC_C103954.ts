
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C103954", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );
    test.step("*** Clicked on Profile Menu ***", async () => { });

    await io.homePage.click(
      selectors.myAccountPagePO.PROFILE
    );

    test.step("*** Inviting user1 ***", async () => { });
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    await io.homePage.enterHugeData(
      selectors.basePagePO.EMAIL,
      "aa.aaa@aa.aaa"
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADMIN,
      1
    );
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await io.homePage.loadingTime();

    test.step("*** Inviting user2 ***", async () => { });
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.click(selectors.basePagePO.INVITEUSER1);
    await io.homePage.enterHugeData(
      selectors.basePagePO.EMAIL,
      "aa.aaa@aa.aaa2"
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADMIN,
      2
    );
    await io.homePage.click(selectors.basePagePO.INVITEUSER2);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );
    test.step("*** Clicked on Profile Menu ***", async () => { });

    await io.homePage.click(
      selectors.myAccountPagePO.PROFILE
    );
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    test.step("*** Clicked On Action ***", async () => { });
    await io.homePage.click(
      selectors.myAccountPagePO.REMOVEUSER
    );
    test.step("*** Clicked On Remove User ***", async () => { });
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    test.step("*** Confirm Delete ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    test.step("*** Clicked On Action ***", async () => { });
    await io.homePage.click(
      selectors.myAccountPagePO.REMOVEUSER
    );
    test.step("*** Clicked On Remove User ***", async () => { });
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    test.step("*** Confirm Delete ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async () => { });
  })
  test("TC_C103954 @Env-All @Zephyr-IO-T25648", async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.USERSTAB);
    test.step("*** Navigating to user tab ***", async ()=>{});
    await io.homePage.loadingTime();
    let role = await page.$$(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN);
    var role1 = [];
    for(let i of role) {
      let text = await i.textContent();
      if(text != "") {
        role1.push(text);
      }
    }

    await expect(role1).toContain("Manage");
    await expect(role1).toContain("Monitor");
    test.step(" Verified name of the role should be specific to the tile ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
