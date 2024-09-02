import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Auditlog Test Cases", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T15107 TC_C53438 ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Page ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 4);
    await test.step("*** Clicked on Results per page dropdown ***", async ()=>{});
    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(selectors.flowBuilderPagePO.SUBLIST_A);
    test.step("*** validating the dropdown data ***", async ()=>{});
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T15108 TC_C53440", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Page ***", async ()=>{});
    
    await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step("*** Validating befault 50 rows are disoplayed ***", async ()=>{});
    var ele = await page.$$("//tbody/tr");
    var Value = await ele.length;
    await io.assert.expectToBeValue(String(Value), String(50), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 4);
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 100 values ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGEHUNDRED);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    var ele1 = await page.$$("//tbody/tr");
    Value = await ele1.length;
    await io.assert.expectToBeValue(String(Value), String(100), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 4);
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGEFIVEHUNDRED);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    var ele2 = await page.$$("//tbody/tr");
    Value = await ele2.length;
    await io.assert.expectToBeValue(String(Value), String(500), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 4);
    test.step("*** Clicked on drop down ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGETHOUSAND);
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    var ele3 = await page.$$("//tbody/tr");
    Value = await ele3.length;
    await io.assert.expectToBeValue(String(Value), String(1000), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T15110 TC_C53444", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );
    test.step("*** Clicked on Profile Page ***", async ()=>{});
    
    await io.homePage.click(
      selectors.myAccountPagePO.AUDIT_LOG
    );
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step("*** Validating befault 50 rows are disoplayed ***", async ()=>{});
    var data = await io.homePage.isVisible(selectors.basePagePO.VIEWMORE);
    expect(data).toBeFalsy();
    await test.step("*** Validated viewmore option doesn't exist ***", async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T15109 TC_C53442", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.homePagePO.PROFILE_MENU
    );
    test.step("*** Clicked on Profile Page ***", async ()=>{});
    
    await io.homePage.click(
      selectors.myAccountPagePO.AUDIT_LOG
    );
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
    await io.homePage.loadingTime();
    await test.step("*** Validating default 50 rows are displayed ***", async ()=>{});
    let text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA);
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
    await test.step("*** Validated text for number of records ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
    await io.homePage.loadingTime();
    test.step("*** clicked on next page ***", async ()=>{});
    
    text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA);
    await io.assert.expectToContainValue("51 - 100 of ",String(text), "");
    test.step("*** Validated text for number of records in nextpage ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
