import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Auditlog resource Test Cases", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
     
  });
 
  test("@Env-All @Zephyr-IO-T15111 @Zephyr-IO-T15112 @Zephyr-IO-T15113 @Zephyr-IO-T15114 TC_C53448_C53449_C53450_C53452", async ({io,page}, testInfo) => {
    //integration>auditlogs
    await io.homePage.loadingTime();
     
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
     ``
    await io.homePage.click(
      selectors.myAccountPagePO.AUDIT_LOG
    );
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
    await test.step("*** Validating default 50 rows are displayed ***", async ()=>{});
    var text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA);
    console.log('text1 ', text);
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
    await test.step(
      "*** Validated text for number of records ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
    test.step("*** clicked on next page ***", async ()=>{});
    var text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA)
    console.log('text2 ', text);
    await io.assert.expectToContainValue("51 - 100 of ",String(text), "");
    await test.step("*** Validated text for number of records in nextpage ***", async ()=>{});
    
    var numberofAuditlogs = await page.$$(selectors.basePagePO.TABLE_ROWS);
    var Value = await numberofAuditlogs.length;
    
    await io.assert.expectToBeValue(String(Value), String(50), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});

    await io.homePage.clickButtonBasedOnLabelName("[role='button']","50");
    test.step("*** Clicked on drop down ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.PAGEHUNDRED);
    await io.homePage.loadingTime();
    test.step("*** Clicking on 100 values ***", async ()=>{});

    var numberofAuditlogs2 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(100), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});

    await io.homePage.clickButtonBasedOnLabelName(selectors.basePagePO.PAGE_ROLE_BUTTON,"100");
    test.step("*** Clicked on drop down ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.PAGEFIVEHUNDRED);
    await io.homePage.loadingTime();
    test.step("*** Clicking on 500 values ***", async ()=>{});
     
    var numberofAuditlogs3 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs3.length;

    await io.assert.expectToBeValue(String(Value), String(500), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    
    await io.homePage.clickButtonBasedOnLabelName(selectors.basePagePO.PAGE_ROLE_BUTTON,"500");
    test.step("*** Clicked on drop down ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.PAGETHOUSAND);
    await io.homePage.loadingTime();
    test.step("*** Clicking on 1000 values ***", async ()=>{});
     
    var numberofAuditlogs4 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1000), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});

    await io.homePage.clickButtonBasedOnLabelName(selectors.basePagePO.PAGE_ROLE_BUTTON,"1000");
    test.step("*** Clicked on drop down ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.PAGEFIVEHUNDRED);
    await test.step("*** Clicked on Results per page dropdown ***", async ()=>{});

    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(selectors.flowBuilderPagePO.SUBLIST_A);
    test.step("*** validating the dropdown data ***", async ()=>{});

    await io.assert.expectArrayToBeInArray(Data,Result, "");

    await io.homePage.clickButtonBasedOnLabelName(selectors.basePagePO.PAGE_ROLE_BUTTON,"500");
    test.step("*** Clicked on drop down ***", async ()=>{});

    var data = await io.homePage.isVisible(selectors.basePagePO.VIEWMORE);
    expect(data).toBeFalsy();
    await test.step("*** Validated viewmore option doesn't exist ***", async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Zephyr-IO-T15115 @Zephyr-IO-T15117 @Zephyr-IO-T15119 @Zephyr-IO-T15121 TC_C53454_C55411_C55414_C55416", async ({io,page}, testInfo) => {
    //integration>flows>actions>auditlogs
    await io.homePage.loadingTime();

    await io.goToFlowsPage();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON,"Auditlogs_flow_DND");
    await io.homePage.loadingTime();
    await test.step("***Searching the created flow in flows page***", async ()=>{});

    await io.homePage.click(`${selectors.basePagePO.TABLE_ROWS}:first-child ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Actions menu ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
    
    await (await page.locator(selectors.importPagePO.PAGE_DATA)).isVisible();
    var text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA)
    await test.step("*** Validating default 50 rows are displayed ***", async ()=>{});
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
    await test.step("*** Validated text for number of records ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
    await io.homePage.loadingTime();
    test.step("*** clicked on next page ***", async ()=>{});

    text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA)
    await io.assert.expectToContainValue("51 - 100 of ",String(text), "");
    await test.step("*** Validated text for number of records in nextpage ***", async ()=>{});
    
    var numberofAuditlogs = await page.$$(selectors.basePagePO.TABLE_ROWS);
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(51), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS,4);
    test.step("*** Clicked on drop down ***", async ()=>{});

    test.step("*** Clicking on 100 values ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGEHUNDRED);
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs2 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(101), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS,4);
    
    test.step("*** Clicked on drop down ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGEFIVEHUNDRED);
    await io.homePage.loadingTime();
    test.step("*** Clicking on 500 values ***", async ()=>{});
     
    var numberofAuditlogs3 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(501), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS,4);
    test.step("*** Clicked on drop down ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGETHOUSAND);
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.loadingTime();
     
    var numberofAuditlogs4 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1001), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 4);
    await test.step("*** Clicked on Results per page dropdown ***", async ()=>{});

    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(selectors.flowBuilderPagePO.SUBLIST_A);
    test.step("*** validating the dropdown data ***", async ()=>{});
    
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(selectors.basePagePO.VIEWMORE);
    expect(data).toBeFalsy();
    await test.step("*** Validated viewmore option doesn't exist ***", async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
 
  test("@Env-All @Zephyr-IO-T15132 @Zephyr-IO-T15133 @Zephyr-IO-T15134 @Zephyr-IO-T15135 TC_C55581_C55582_C55583_C55584", async ({io,page}, testInfo) => {
    //integration>flow>flowbuilder>auditlogs
    await io.homePage.loadingTime();
     
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
     
    var ID = await io.api.getFlowId("TC_Auditlogs_flow_DND");
    await io.flowBuilder.navigateToTheFlow(ID);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
     
    await io.homePage.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
 
    await test.step("*** Validating befault 50 rows are disoplayed ***", async ()=>{});
    var text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA);
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
    await test.step("*** Validated text for number of records ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
    var text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA);
    test.step("*** clicked on next page ***", async ()=>{});

    await io.assert.expectToContainValue("51 - 100 of ",String(text), "");
    await io.homePage.loadingTime();
    await test.step("*** Validated text for number of records in nextpage ***", async ()=>{});

    var numberofAuditlogs = await page.$$(selectors.basePagePO.TABLE_ROWS);
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(50), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});
    
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 4);
    test.step("*** Clicked on drop down ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGEHUNDRED);
    await io.homePage.loadingTime();
    test.step("*** Clicking on 100 values ***", async ()=>{});
     
    var numberofAuditlogs2 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(100), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS,4);
    test.step("*** Clicked on drop down ***", async ()=>{});
    
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGEFIVEHUNDRED);
    await io.homePage.loadingTime();
     
    var numberofAuditlogs3 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(500), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS,4);
    test.step("*** Clicked on drop down ***", async ()=>{});
    
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGETHOUSAND);
    await io.homePage.loadingTime();
     
    var numberofAuditlogs4 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1000), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS,4);
    await test.step("*** Clicked on Results per page dropdown ***", async ()=>{});

    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(selectors.flowBuilderPagePO.SUBLIST_A);
    test.step("*** validating the dropdown data ***", async ()=>{});
    
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(selectors.basePagePO.VIEWMORE);
    expect(data).toBeFalsy();
    await test.step("*** Validated viewmore option doesn't exist ***", async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T15123 @Zephyr-IO-T15124 @Zephyr-IO-T15125 @Zephyr-IO-T15126 TC_C55430_C55431_C55434_C55435_01", async ({io,page}, testInfo) => {
    //Resources>connections>actions>auditlogs
    await io.homePage.loadingTime();
     
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await (await page.locator(selectors.flowBuilderPagePO.SEARCHBUTTON)).isVisible();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_AuditLog_Http_DND");
    await io.homePage.loadingTime();
     
    test.step("***Searching the created connection ***", async ()=>{});

    await io.homePage.click(`${selectors.basePagePO.TABLE_ROWS}:first-child ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Actions menu ***", async ()=>{});
     
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
     
    
    var text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA);
    await test.step("*** Validating befault 50 rows are disoplayed ***", async ()=>{});
    
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
    await test.step("*** Validated text for number of records ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.IDNEXTPAGE);
    await io.homePage.loadingTime();
    test.step("*** clicked on next page ***", async ()=>{});

    text = await io.homePage.getText(selectors.importPagePO.PAGE_DATA)
    await io.assert.expectToContainValue("51 - 100 of ",String(text), "");
    await test.step("*** Validated text for number of records in nextpage ***", async ()=>{});
  
    var numberofAuditlogs = await page.$$(selectors.basePagePO.TABLE_ROWS);
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(51), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS,3);
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 100 values ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.PAGEHUNDRED);
    await io.homePage.loadingTime();
     
    var numberofAuditlogs2 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(101), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});
    
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS,3);
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGEFIVEHUNDRED);
    await io.homePage.loadingTime();
     
    var numberofAuditlogs3 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(501), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 3);
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.PAGETHOUSAND);
    await io.homePage.loadingTime();
     
    var numberofAuditlogs4 = await page.$$(selectors.basePagePO.TABLE_ROWS);
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1001), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 3);
    await test.step("*** Clicked on Results per page dropdown ***", async ()=>{});
    
    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(selectors.flowBuilderPagePO.SUBLIST_A);
    test.step("*** validating the dropdown data ***", async ()=>{});
    
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(selectors.basePagePO.VIEWMORE);
    expect(data).toBeFalsy();
    await test.step("*** Validated viewmore option doesn't exist ***", async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C55430_C55431_C55434_C55435_02", async ({io,page}, testInfo) => {
    //Resources>imports>actions>auditlogs
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH_RECYCLEBIN,
      "Import_DND_auditlogs"
    );
    await io.homePage.loadingTime();
     
    test.step("***Searching the created import ***", async ()=>{});

    await io.homePage.click(
      "//tbody[@class='MuiTableBody-root']//button[@data-test='openActionsMenu']"
    );
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
await test.step(
      "*** Validating befault 50 rows are disoplayed ***"
, async ()=>{});
    var text = await io.homePage.getText(
      "//button[@data-testid='nextPage']/../span"
    );
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
await test.step(
      "*** Validated text for number of records ***"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.IDNEXTPAGE
    );
    test.step("*** clicked on next page ***", async ()=>{});
    text = "//button[@data-testid='nextPage']/../span"
    await io.assert.expectToContainValue("51 - 100 of ",text, "");
await test.step(
      "*** Validated text for number of records in nextpage ***"
, async ()=>{});
    await (
      await page.$$(selectors.integrationPagePO.SELECTFILTERS)[4]
    ).isVisible();
    var numberofAuditlogs = await page.$$(
      "//tbody/tr"
    );
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(51), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      4
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 100 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs2 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(101), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      4
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEFIVEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs3 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(501), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      4
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGETHOUSAND
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs4 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1001), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      4
    );
await test.step(
      "*** Clicked on Results per page dropdown ***"
, async ()=>{});
    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(
      selectors.flowBuilderPagePO.SUBLIST_A
    );
    test.step("*** validating the dropdown data ***", async ()=>{});
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(
      selectors.basePagePO.VIEWMORE
    );
    expect(data).toBeFalsy();
await test.step(
      "*** Validated viewmore option doesn't exist ***"
, async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C55430_C55431_C55434_C55435_03", async ({io,page}, testInfo) => {
    //Resources>exports>actions>auditlogs
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH_RECYCLEBIN,
      "export_DND_auditlogs"
    );
    await io.homePage.loadingTime();
     
    test.step("***Searching the created import ***", async ()=>{});

    await io.homePage.click(
      "//tbody[@class='MuiTableBody-root']//button[@data-test='openActionsMenu']"
    );
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
await test.step(
      "*** Validating befault 50 rows are disoplayed ***"
, async ()=>{});
    var text = await io.homePage.getText(
      "//button[@data-testid='nextPage']/../span"
    );
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
await test.step(
      "*** Validated text for number of records ***"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.IDNEXTPAGE
    );
    test.step("*** clicked on next page ***", async ()=>{});
    text = await io.homePage.getText("//button[@data-testid='nextPage']/../span")
    await io.assert.expectToContainValue("51 - 100 of ",String(text), "");
await test.step(
      "*** Validated text for number of records in nextpage ***"
, async ()=>{});
    await (
      await page.$$(selectors.integrationPagePO.SELECTFILTERS)[4]
    ).isVisible();
    var numberofAuditlogs = await page.$$(
      "//tbody/tr"
    );
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(51), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      4
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 100 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs2 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(101), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      4
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEFIVEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs3 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(501), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      4
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGETHOUSAND
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs4 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1001), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      4
    );
await test.step(
      "*** Clicked on Results per page dropdown ***"
, async ()=>{});
    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(
      selectors.flowBuilderPagePO.SUBLIST_A
    );
    test.step("*** validating the dropdown data ***", async ()=>{});
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(
      selectors.basePagePO.VIEWMORE
    );
    expect(data).toBeFalsy();
await test.step(
      "*** Validated viewmore option doesn't exist ***"
, async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C55430_C55431_C55434_C55435_04", async ({io,page}, testInfo) => {
    //Resources>scripts>actions>auditlogs
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Scripts");
    test.step("Clicked on Script button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH_RECYCLEBIN,
      "Script_DND_auditlogs"
    );
    await io.homePage.loadingTime();
     
    test.step("***Searching the created import ***", async ()=>{});

    await io.homePage.click(
      "//tbody[@class='MuiTableBody-root']//button[@data-test='openActionsMenu']"
    );
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
await test.step(
      "*** Validating befault 50 rows are disoplayed ***"
, async ()=>{});
    var text = await io.homePage.getText(
      "//button[@data-testid='nextPage']/../span"
    );
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
await test.step(
      "*** Validated text for number of records ***"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.IDNEXTPAGE
    );
    test.step("*** clicked on next page ***", async ()=>{});
    text = "//button[@data-testid='nextPage']/../span"
    await io.assert.expectToContainValue("51 - 100 of ",text, "");
await test.step(
      "*** Validated text for number of records in nextpage ***"
, async ()=>{});
    await (
      await page.$$(selectors.integrationPagePO.SELECTFILTERS)[3]
    ).isVisible();
    var numberofAuditlogs = await page.$$(
      "//tbody/tr"
    );
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(51), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 100 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs2 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(101), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEFIVEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs3 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(501), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGETHOUSAND
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs4 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1001), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
await test.step(
      "*** Clicked on Results per page dropdown ***"
, async ()=>{});
    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(
      selectors.flowBuilderPagePO.SUBLIST_A
    );
    test.step("*** validating the dropdown data ***", async ()=>{});
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(
      selectors.basePagePO.VIEWMORE
    );
    expect(data).toBeFalsy();
await test.step(
      "*** Validated viewmore option doesn't exist ***"
, async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C55430_C55431_C55434_C55435_05", async ({io,page}, testInfo) => {
    //Resources>agents>actions>auditlogs
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Agents");
    test.step("Clicked on Agents button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH_RECYCLEBIN,
      "agent_DND_auditlogs"
    );
    await io.homePage.loadingTime();
     
    test.step("***Searching the created import ***", async ()=>{});

    await io.homePage.click(
      "//tbody[@class='MuiTableBody-root']//button[@data-test='openActionsMenu']"
    );
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
await test.step(
      "*** Validating befault 50 rows are disoplayed ***"
, async ()=>{});
    var text = await io.homePage.getText(
      "//button[@data-testid='nextPage']/../span"
    );
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
await test.step(
      "*** Validated text for number of records ***"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.IDNEXTPAGE
    );
    test.step("*** clicked on next page ***", async ()=>{});
    text = await io.homePage.getText("//button[@data-testid='nextPage']/../span")
    await io.assert.expectToContainValue("51 - 100 of ",String(text), "");
await test.step(
      "*** Validated text for number of records in nextpage ***"
, async ()=>{});
    await (
      await page.$$(selectors.integrationPagePO.SELECTFILTERS)[3]
    ).isVisible();
    var numberofAuditlogs = await page.$$(
      "//tbody/tr"
    );
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(51), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 100 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs2 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(101), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEFIVEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs3 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(501), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGETHOUSAND
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs4 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1001), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
await test.step(
      "*** Clicked on Results per page dropdown ***"
, async ()=>{});
    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(
      selectors.flowBuilderPagePO.SUBLIST_A
    );
    test.step("*** validating the dropdown data ***", async ()=>{});
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(
      selectors.basePagePO.VIEWMORE
    );
    expect(data).toBeFalsy();
await test.step(
      "*** Validated viewmore option doesn't exist ***"
, async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C55430_C55431_C55434_C55435_06", async ({io,page}, testInfo) => {
    //Resources>stack>actions>auditlogs
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Stacks");
    test.step("Clicked on stack button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH_RECYCLEBIN,
      "Stack_DND_auditlogs"
    );
    await io.homePage.loadingTime();
     
    test.step("***Searching the created import ***", async ()=>{});

    await io.homePage.click(
      "//tbody[@class='MuiTableBody-root']//button[@data-test='openActionsMenu']"
    );
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
await test.step(
      "*** Validating befault 50 rows are disoplayed ***"
, async ()=>{});
    var text = await io.homePage.getText(
      "//button[@data-testid='nextPage']/../span"
    );
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
await test.step(
      "*** Validated text for number of records ***"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.IDNEXTPAGE
    );
    test.step("*** clicked on next page ***", async ()=>{});
    text = "//button[@data-testid='nextPage']/../span"
    await io.assert.expectToContainValue("51 - 100 of ",text, "");
await test.step(
      "*** Validated text for number of records in nextpage ***"
, async ()=>{});
    await (
      await page.$$(selectors.integrationPagePO.SELECTFILTERS)[3]
    ).isVisible();
    var numberofAuditlogs = await page.$$(
      "//tbody/tr"
    );
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(51), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 100 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs2 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(101), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEFIVEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs3 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(501), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGETHOUSAND
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs4 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1001), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
await test.step(
      "*** Clicked on Results per page dropdown ***"
, async ()=>{});
    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(
      selectors.flowBuilderPagePO.SUBLIST_A
    );
    test.step("*** validating the dropdown data ***", async ()=>{});
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(
      selectors.basePagePO.VIEWMORE
    );
    expect(data).toBeFalsy();
await test.step(
      "*** Validated viewmore option doesn't exist ***"
, async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C55430_C55431_C55434_C55435_07", async ({io,page}, testInfo) => {
    //Resources>myapi>actions>auditlogs
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","My APIs");
    test.step(" Clicking on the create My APi ", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH_RECYCLEBIN,
      "Myapi_DND_auditlogs"
    );
    await io.homePage.loadingTime();
     
    test.step("***Searching the created import ***", async ()=>{});

    await io.homePage.click(
      "//tbody[@class='MuiTableBody-root']//button[@data-test='openActionsMenu']"
    );
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Actions menu ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
     
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
await test.step(
      "*** Validating befault 50 rows are disoplayed ***"
, async ()=>{});
    var text = await io.homePage.getText(
      "//button[@data-testid='nextPage']/../span"
    );
    await io.assert.expectToContainValue("1 - 50 of ",String(text), "");
await test.step(
      "*** Validated text for number of records ***"
, async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.IDNEXTPAGE
    );
    test.step("*** clicked on next page ***", async ()=>{});
    text = "//button[@data-testid='nextPage']/../span"
    await io.assert.expectToContainValue("51 - 100 of ",text, "");
await test.step(
      "*** Validated text for number of records in nextpage ***"
, async ()=>{});
    await (
      await page.$$(selectors.integrationPagePO.SELECTFILTERS)[3]
    ).isVisible();
    var numberofAuditlogs = await page.$$(
      "//tbody/tr"
    );
    var Value = await numberofAuditlogs.length;
    await io.assert.expectToBeValue(String(Value), String(51), "");
    test.step("*** Validated for 50 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 100 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs2 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs2.length;
    await io.assert.expectToBeValue(String(Value), String(101), "");
    test.step("*** Validated for 100 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 500 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGEFIVEHUNDRED
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs3 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs3.length;
    await io.assert.expectToBeValue(String(Value), String(501), "");
    test.step("*** Validated for 500 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
    test.step("*** Clicked on drop down ***", async ()=>{});
    test.step("*** Clicking on 1000 values ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.PAGETHOUSAND
    );
    await io.homePage.loadingTime();
     
    
    var numberofAuditlogs4 = await page.$$(
      "//tbody/tr"
    );
    Value = await numberofAuditlogs4.length;
    await io.assert.expectToBeValue(String(Value), String(1001), "");
    test.step("*** Validated for 1000 Rows ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.SELECTFILTERS,
      3
    );
await test.step(
      "*** Clicked on Results per page dropdown ***"
, async ()=>{});
    var Data = ["50", "100", "500", "1000"];
    var Result = await io.homePage.getText(
      selectors.flowBuilderPagePO.SUBLIST_A
    );
    test.step("*** validating the dropdown data ***", async ()=>{});
    await io.assert.expectArrayToBeInArray(Data,Result, "");
    var data = await io.homePage.isVisible(
      selectors.basePagePO.VIEWMORE
    );
    expect(data).toBeFalsy();
await test.step(
      "*** Validated viewmore option doesn't exist ***"
, async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

});
