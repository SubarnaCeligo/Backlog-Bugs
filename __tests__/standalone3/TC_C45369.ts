import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C45369", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    //confirm  delete 
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.loadingTime();

     // Delete the export
     await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
     await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "TC_C45369_FTP_export");
     // Wait for search to complete
     await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
     await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
     await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
     // confirm  delete 
     await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
     await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5333 @Env-All TC_C45369", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.FTP_CONNECTION);
    test.step("*** Selected FTP as the adaptor ***", async ()=>{});    

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "FTP CONNECTION");
    test.step("***Choosing the desired FTP connection ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C45369_FTP_export");
    await io.homePage.click(selectors.flowBuilderPagePO.PARSEFILENO);

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FTPDIRECTORYPATH, "io.auto.qa/IO_UI_Automation");
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** clearing batch size value", async ()=>{});
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.FTPBATCHSIZE);
    test.step("*** Entering value for Batch Size 20***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FTPBATCHSIZE, "20");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving the changes ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** clearing batch size value", async ()=>{});
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.FTPBATCHSIZE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Entering value for Batch Size 10 ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FTPBATCHSIZE, "10");

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** clicked on save button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicked on batch size ***", async ()=>{});

    var batchsize = await page.locator(selectors.flowBuilderPagePO.BATCHSIZE).inputValue();
    await io.assert.expectToContainValue("10",batchsize, "");
    test.step("*** Verified  the updated value should show correctly ***", async ()=>{});

    test.step("*** Clicking on close ****", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
