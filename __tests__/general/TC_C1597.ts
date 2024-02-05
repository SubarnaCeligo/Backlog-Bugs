
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1597", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C1597", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    const url = await io.homePage.getCurrentUrl();
    await io.assert.expectToBeValue(String(url), io.connectorUrl + "home", "");
    // await io.homePage.click(//   selectors.basePagePO.STACKS //);
    await io.homePage.navigateTo(io.connectorUrl + "stacks");
    test.step("*** Navigate to Stack  ***", async ()=>{});
    await(await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)
    ).isVisible();
    // await io.homePage.fillWebPage(//   selectors.flowBuilderPagePO.SEARCHBUTTON, //   "stack" //);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    console.log("Clicked on action dropdown");
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    test.step("*** Click on Edit stack  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.ACCESSKEY);
    if (process.platform === "darwin") {
      await page.keyboard.press("Meta+A");
      await page.keyboard.press("Delete");
    } else {
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Delete");
    }
    await io.homePage.fillWebPage(selectors.basePagePO.ACCESSKEY, "12345789" + randomNumber(2)
    );
    test.step("*** Updating Access key field  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close  ***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    await io.homePage.click(selectors.basePagePO.MY_PROFILE_BUTTON);
    test.step("*** Navigating to MyAcoount Profile  ***", async ()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
    test.step("*** Navigating to Auditlog   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.UPDATE);
    await io.homePage.clickButtonBasedOnLabelName(selectors.basePagePO.UPDATEUSER, "Update");
    await io.homePage.clickButtonByIndex("//a[contains(text(),'stack')]", 0);
    test.step("*** Stack field is updated in audit log   ***", async ()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ACCESSKEY);
    if (process.platform === "darwin") {
      await page.keyboard.press("Meta+A");
      await page.keyboard.press("Delete");
    } else {
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Delete");
    }
    await io.homePage.fillWebPage(selectors.basePagePO.ACCESSKEY, "1");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
