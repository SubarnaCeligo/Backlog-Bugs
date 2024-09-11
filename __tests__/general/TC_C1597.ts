import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1597", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1415 @Env-All TC_C1597", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    const url = await io.homePage.getCurrentUrl();
    await io.assert.expectToBeValue(String(url), io.connectorUrl + "home", "");
    // await io.homePage.click(//   selectors.basePagePO.STACKS //);
    await io.homePage.navigateTo(io.connectorUrl + "stacks");
    test.step("*** Navigate to Stack  ***", async ()=>{});
     
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.clearTextValue('#name input')

    await io.homePage.fillWebPage('#name input', "stack");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close  ***", async ()=>{});
    await io.homePage.selectTabInProfileMenu("Profile")
    test.step("*** Navigating to MyAcoount Profile  ***", async ()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
    test.step("*** Navigating to Auditlog   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.UPDATE);
    await io.homePage.clickButtonBasedOnLabelName(selectors.basePagePO.UPDATEUSER, "Update");
    await io.homePage.clickButtonByIndex("//a[contains(text(),'stack')]", 0);
    test.step("*** Stack field is updated in audit log   ***", async ()=>{});
    await io.homePage.navigateTo(io.connectorUrl + "stacks");
    test.step("*** Navigate to Stack  ***", async ()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.clearTextValue('#name input')
    await io.homePage.fillWebPage('#name input', "Don't use");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
