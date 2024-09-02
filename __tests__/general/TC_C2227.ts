import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C2227", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1420 @Env-All  TC_C2227", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    const url = await io.homePage.getCurrentUrl();
    if (process.env["ENVIRONMENT"] == "qa") {
      expect(url).toBe("https://qa.staging.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.selectTabInProfileMenu("Profile")
      await test.step("*** Navigate to My Profile ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        selectors.myAccountPagePO.AUDIT_LOG
      );
      await test.step("*** Navigate to Auditlog tab ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        selectors.basePagePO.RESOURCETYPE
      );
      await io.homePage.click(
        selectors.basePagePO.INTEGRATIONVALUE
      );
      await test.step("*** Applying the Resource type filter ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.SELECTINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C1594_DND1"
      );
      await test.step("*** Applying Integartion name field ***",()=>{});
      await io.homePage.click(selectors.basePagePO.BYUSER);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.basePagePO.INTEGRATIONNAME,
        "Automation account"
      );
      await test.step("*** Applying the User filter ***",()=>{});
      await io.homePage.click(selectors.basePagePO.RESOURCE);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.basePagePO.INTEGRATIONNAME,
        "UI"
      );
      await test.step("*** Applying the Source filter ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.UPDATE
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.basePagePO.INTEGRATIONNAME,
        "Update"
      );
      await test.step("*** Applying the Action filter ***",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.basePagePO.INTEGARIONFIELD,
        4
      );
await test.step(
        "*** Clicking on expected data when filters are applied ***"
, async ()=>{});
await test.step(
        "*** Result is  shown as per the filter applied ***"
, async ()=>{});
    } else if (process.env["ENVIRONMENT"] == "qaprod") {
      expect(url).toBe("https://qaprod.staging.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.selectTabInProfileMenu("Profile")
      await test.step("*** Navigate to My Profile ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        selectors.myAccountPagePO.AUDIT_LOG
      );
      await test.step("*** Navigate to Auditlog tab ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
       selectors.basePagePO.RESOURCETYPE
      );
      await io.homePage.click(
        selectors.basePagePO.INTEGRATIONVALUE
      );
      await test.step("*** Applying the Resource type filter ***",()=>{});
      await io.homePage.click(
       selectors.basePagePO.SELECTINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "Clone - TC_C34114"
      );
      await test.step("*** Applying Integartion name field ***",()=>{});
      await io.homePage.click(selectors.basePagePO.BYUSER);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.basePagePO.INTEGRATIONNAME,
        "Automation account"
      );
      await test.step("*** Applying the User filter ***",()=>{});
      await io.homePage.click("[id='mui-component-select-source']");
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.basePagePO.INTEGRATIONNAME,
        "UI"
      );
      await test.step("*** Applying the Source filter ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.UPDATE
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.basePagePO.INTEGRATIONNAME,
        "Update"
      );
      await test.step("*** Applying the Action filter ***",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.basePagePO.INTEGARIONFIELD,
        4
      );
await test.step(
        "*** Clicking on expected data when filters are applied ***"
, async ()=>{});
await test.step(
        "*** Result is  shown as per the filter applied ***"
, async ()=>{});
    } else if (process.env["ENVIRONMENT"] == "staging") {
      expect(url).toBe("https://staging.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.selectTabInProfileMenu("Profile")
      await test.step("*** Navigate to My Profile ***",()=>{});
      await io.homePage.loadingTime();
      await io.homePage.isPageReady();
      await io.homePage.click(
        selectors.myAccountPagePO.AUDIT_LOG
      );
      await test.step("*** Navigate to Auditlog tab ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.RESOURCETYPE
      );
      await io.homePage.click(
        selectors.basePagePO.INTEGRATIONVALUE
      );
      await test.step("*** Applying the Resource type filter ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.SELECTINTEGRATION
      );
      await io.homePage.selectDropDownWithSplChar(
        "TC_C28152_DND"
      );
      await test.step("*** Applying Integartion name field ***",()=>{});
      await io.homePage.click(selectors.basePagePO.BYUSER);
      await io.homePage.selectDropDownWithSplChar(
        "Automation Account"
      );
      await test.step("*** Applying the User filter ***",()=>{});
      await io.homePage.click(selectors.basePagePO.RESOURCE);
      await io.homePage.selectDropDownWithSplChar(
        "UI"
      );
      await test.step("*** Applying the Action filter ***",()=>{});
      await io.homePage.click(
         selectors.basePagePO.UPDATE
      );
      await io.homePage.selectDropDownWithSplChar(
        "Update"
      );
      await test.step("*** Applying the Source filter ***",()=>{});
      await io.homePage.clickButtonByIndex(
        selectors.basePagePO.INTEGARIONFIELD,
        4
      );
await test.step(
        "*** Clicking on expected data when filters are applied ***"
, async ()=>{});
await test.step(
        "*** Result is  shown as per the filter applied ***"
, async ()=>{});
    } else if (process.env["ENVIRONMENT"] == "platformone") {
      expect(url).toBe("https://platform1.dev.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.selectTabInProfileMenu("Profile")
      await test.step("*** Navigate to My Profile ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        selectors.myAccountPagePO.AUDIT_LOG
      );
      await test.step("*** Navigate to Auditlog tab ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.RESOURCETYPE
      );
      await io.homePage.click(
        selectors.basePagePO.INTEGRATIONVALUE
      );
      await test.step("*** Applying the Resource type filter ***",()=>{});
      await io.homePage.click(
        selectors.basePagePO.SELECTINTEGRATION
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C1594_DND1"
      );
      await test.step("*** Applying Integartion name field ***",()=>{});
      await io.homePage.click(selectors.basePagePO.BYUSER);
      await io.homePage.clickButtonBasedOnLabelName(
      "li"+ selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "Automation Account"
      );
      await test.step("*** Applying the User filter ***",()=>{});
      await io.homePage.click(selectors.basePagePO.RESOURCE);
      await io.homePage.clickButtonBasedOnLabelName(
        "li"+ selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "UI"
      );
      await test.step("*** Applying the Action filter ***",()=>{});
      await io.homePage.click(
         selectors.basePagePO.UPDATE
      );
      await io.homePage.clickButtonBasedOnLabelName(
        "li"+ selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "Update"
      );
      await test.step("*** Applying the Source filter ***",()=>{});
      await io.homePage.clickButtonByIndex(
        "//a[contains(text(),'TC_C1594_DND1')]",
        1
      );
await test.step(
        "*** Clicking on expected data when filters are applied ***"
, async ()=>{});
await test.step(
        "*** Result is  shown as per the filter applied ***"
, async ()=>{});
    }
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
