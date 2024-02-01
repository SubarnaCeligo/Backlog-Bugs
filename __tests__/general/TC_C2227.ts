
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2227", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C2227", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    const url = await io.homePage.getCurrentUrl();
    if (process.env["ENVIRONMENT"].toLowerCase() == "qa") {
      expect(url).toBe("https://qa.staging.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.click(
        selectors.homePagePO.HOME_PROFILE_MENU
      );
      await test.step("*** Navigate to My Account ***",()=>{});
      // await io.homePage.click(
      //   "[data-test='myAccountOrMyProfile']"
      // );
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
        "[id='mui-component-select-resourceType']"
      );
      await io.homePage.click(
        "[data-value='integration']"
      );
      await test.step("*** Applying the Resource type filter ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-_resourceId']"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C1594_DND1"
      );
      await test.step("*** Applying Integartion name field ***",()=>{});
      await io.homePage.click("[id='mui-component-select-byUser']");
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "Automation account"
      );
      await test.step("*** Applying the User filter ***",()=>{});
      await io.homePage.click("[id='mui-component-select-source']");
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "UI"
      );
      await test.step("*** Applying the Source filter ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-event']"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "Update"
      );
      await test.step("*** Applying the Action filter ***",()=>{});
      await io.homePage.clickButtonByIndex(
        "[class='MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft']",
        4
      );
await test.step(
        "*** Clicking on expected data when filters are applied ***"
, async ()=>{});
await test.step(
        "*** Result is  shown as per the filter applied ***"
, async ()=>{});
    } else if (process.env["ENVIRONMENT"].toLowerCase() == "qaprod") {
      expect(url).toBe("https://qaprod.staging.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.click(
        selectors.basePagePO.ACCOUNT_BUTTON
      );
      await test.step("*** Navigate to My Account ***",()=>{});
      await io.homePage.click(
        "[data-test='myAccountOrMyProfile']"
      );
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
        "[id='mui-component-select-resourceType']"
      );
      await io.homePage.click(
        "[data-value='integration']"
      );
      await test.step("*** Applying the Resource type filter ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-_resourceId']"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "Clone - TC_C34114"
      );
      await test.step("*** Applying Integartion name field ***",()=>{});
      await io.homePage.click("[id='mui-component-select-byUser']");
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "Automation account"
      );
      await test.step("*** Applying the User filter ***",()=>{});
      await io.homePage.click("[id='mui-component-select-source']");
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "UI"
      );
      await test.step("*** Applying the Source filter ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-event']"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "Update"
      );
      await test.step("*** Applying the Action filter ***",()=>{});
      await io.homePage.clickButtonByIndex(
        "[class='MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft']",
        4
      );
await test.step(
        "*** Clicking on expected data when filters are applied ***"
, async ()=>{});
await test.step(
        "*** Result is  shown as per the filter applied ***"
, async ()=>{});
    } else if (process.env["ENVIRONMENT"].toLowerCase() == "staging") {
      expect(url).toBe("https://staging.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.click(
        selectors.basePagePO.ACCOUNT_BUTTON
      );
      await test.step("*** Navigate to My Account ***",()=>{});
      await io.homePage.click(
        "[data-test='myAccountOrMyProfile']"
      );
      await test.step("*** Navigate to My Profile ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        selectors.myAccountPagePO.AUDIT_LOG
      );
      await test.step("*** Navigate to Auditlog tab ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-resourceType']"
      );
      await io.homePage.click(
        "[data-value='integration']"
      );
      await test.step("*** Applying the Resource type filter ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-_resourceId']"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C1594_DND"
      );
      await test.step("*** Applying Integartion name field ***",()=>{});
      await io.homePage.click("[id='mui-component-select-byUser']");
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "Automation accountuser"
      );
      await test.step("*** Applying the User filter ***",()=>{});
      await io.homePage.click("[id='mui-component-select-source']");
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "UI"
      );
      await test.step("*** Applying the Action filter ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-event']"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        "[class='MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters MuiListItem-gutters MuiListItem-button']",
        "Update"
      );
      await test.step("*** Applying the Source filter ***",()=>{});
      await io.homePage.clickButtonByIndex(
        "[class='MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft']",
        4
      );
await test.step(
        "*** Clicking on expected data when filters are applied ***"
, async ()=>{});
await test.step(
        "*** Result is  shown as per the filter applied ***"
, async ()=>{});
    } else if (process.env["ENVIRONMENT"].toLowerCase() == "platformone") {
      expect(url).toBe("https://platform1.dev.integrator.io/home");
      expect(url).toBeTruthy();
      await io.homePage.click(
        selectors.basePagePO.ACCOUNT_BUTTON
      );
      await test.step("*** Navigate to My Account ***",()=>{});
      await io.homePage.click(
        "[data-test='myAccountOrMyProfile']"
      );
      await test.step("*** Navigate to My Profile ***",()=>{});
      await io.homePage.isPageLoaded();
      await io.homePage.isPageReady();
      await io.homePage.click(
        selectors.myAccountPagePO.AUDIT_LOG
      );
      await test.step("*** Navigate to Auditlog tab ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-resourceType']"
      );
      await io.homePage.click(
        "[data-value='integration']"
      );
      await test.step("*** Applying the Resource type filter ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-_resourceId']"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS,
        "TC_C1594_DND1"
      );
      await test.step("*** Applying Integartion name field ***",()=>{});
      await io.homePage.click("[id='mui-component-select-byUser']");
      await io.homePage.clickButtonBasedOnLabelName(
        "//li[@role='option']",
        "Automation Account"
      );
      await test.step("*** Applying the User filter ***",()=>{});
      await io.homePage.click("[id='mui-component-select-source']");
      await io.homePage.clickButtonBasedOnLabelName(
        "//li[@role='option']",
        "UI"
      );
      await test.step("*** Applying the Action filter ***",()=>{});
      await io.homePage.click(
        "[id='mui-component-select-event']"
      );
      await io.homePage.clickButtonBasedOnLabelName(
        "//li[@role='option']",
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
