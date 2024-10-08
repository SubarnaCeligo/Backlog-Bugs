import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_110688_C110687_1", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });
  test("@Env-All @Zephyr-IO-T14155 110687_1", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on create export ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SOURCE
    );
    await io.homePage.loadingTime();

    test.step("*** selecting Salesforce ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SF);
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    await test.step("*** Choosing type of export from dropdown ***", async ()=>{});
    
    await test.step("*** Choosing the desired connection ***", async ()=>{});
    //Updated steps to include clicking on create from scratch and selecting the connection
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    test.step("*** Clicking on the dropdown ***", async ()=>{});
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'SALESFORCE CONNECT');
    await io.exportsPage.clickByTextByIndex('SALESFORCE CONNECTION', 0, {exact: false});

    await io.homePage.click(selectors.basePagePO.CONNECTION);

    //Moved steps here as clearing connection dropdown needs to be cleared here
    await io.homePage.loadingTime();
    let platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await page.keyboard.press("Meta+A");
      await page.keyboard.press("Delete");
    } else {
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Delete");
    }
    await io.homePage.loadingTime();

    var list = await page.$$(selectors.flowBuilderPagePO.SCRIPTS_LIST);
    var list1 = list.length;
    test.step("*** verifying connection list length ***", async ()=>{});
    await expect(list1).toBeGreaterThanOrEqual(1);
  });

  test("@Env-All @Zephyr-IO-T14156 110688_1", async ({io,page}, testInfo) => {
    test.step("*** Clicking on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on create import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();

    test.step("*** selecting Salesforce ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SF);
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await test.step("*** Choosing type of export from dropdown ***", async ()=>{});

    await test.step("*** Choosing the desired connection ***", async ()=>{});

    //Updated steps to include clicking on create from scratch and selecting the connection
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'SALESFORCE CONNECT');
    await io.exportsPage.clickByTextByIndex('SALESFORCE CONNECTION', 0, {exact: false});

    test.step("*** Clicking on the dropdown ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    //Moved steps here as clearing connection dropdown needs to be cleared here
    await io.homePage.loadingTime();
    let platform = process.platform;
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await page.keyboard.press("Meta+A");
      await page.keyboard.press("Delete");
    } else {
      await page.keyboard.press("Control+A");
      await page.keyboard.press("Delete");
    }
    await io.homePage.loadingTime();

    var list = await page.$$(selectors.flowBuilderPagePO.SCRIPTS_LIST);
    var list1 = list.length;
    test.step("*** verifying connection list length ***", async ()=>{});
    //Updated assertion 
    await expect(list1).toBeGreaterThanOrEqual(1);
  });
});
