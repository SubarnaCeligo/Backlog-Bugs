import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C35351_Shopify_to_FTP_Validate_BatchSize.json";

test.describe("Validating Batch Size field in FTP", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    io.api.deleteFlowViaAPI(flowId)

    // Delete the  export
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'AutomationStandalone_');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

    // Delete the import
    await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'AutomationStandalone_');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

  });

  test("@Zephyr-IO-T11714 @Env-All TC_C35351_Shopify_To_FTP_Verify_Batch_Size", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");

    test.step("*** Clicking FTP Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime()

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    await io.homePage.loadingTime()
    test.step("*** Entering value for Batch Size 1001 ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BATCHSIZE, "1001");

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** clicked on save button ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    var ele = await page.locator(selectors.flowBuilderPagePO.BATCHSIZE);
    const batchSizeValidation1 = await ele.getAttribute("value");

    await io.assert.expectToBeValue(String(batchSizeValidation1), "1001", "");
    test.step("*** Batch Size value is not changed remains 1001 ***", async ()=>{});

    test.step("*** Clicking on close ****", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime()

    test.step("*** Clicking FTP Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    await io.homePage.loadingTime()
    test.step("*** clearing batch size value", async ()=>{});
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.BATCHSIZE);
    
    test.step("*** Entering value for Batch Size 0 ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BATCHSIZE, "0");

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** clicked on save button ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    const batchSizeValidation2 = await ele.getAttribute("value");
    await expect(batchSizeValidation2).toEqual("");
    test.step("*** Batch Size value is empty ***", async ()=>{});

    test.step("*** Clicking on close ****", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime()

    test.step("*** Clicking FTP Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** clearing batch size value", async ()=>{});
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.BATCHSIZE);

    test.step("*** Entering value for Batch Size 1 ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BATCHSIZE, "1");

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** clicked on save button ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    const batchSizeValidation3 = await ele.getAttribute("value");
    await io.assert.expectToBeValue(String(batchSizeValidation3), "1", "");
    test.step("*** Batch Size value remains 1 ***", async ()=>{});

    test.step("*** Clicking on close ****", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime()

    test.step("*** Clicking FTP Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** clearing batch size value ***", async ()=>{});
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.BATCHSIZE);

    test.step("*** Entering value for Batch Size 1000 ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BATCHSIZE, "1000");

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** clicked on save button ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    const batchSizeValidation4 = await ele.getAttribute("value");
    await io.assert.expectToBeValue(String(batchSizeValidation4), "1000", "");
    test.step("*** Batch Size value remains 1000 ***", async ()=>{});

    test.step("*** Clicking on close ****", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime()

    test.step("*** Clicking FTP Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);

    test.step("*** Clicking FTP advanced ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** clearing batch size value", async ()=>{});
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.BATCHSIZE);

    test.step("*** Entering value for Batch Size -1 ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BATCHSIZE, "-1");

    const errmsg = await(await page.locator("//div[contains(text(), 'Only numbers allowed')]")).textContent();
    await io.assert.expectToBeValue(String(errmsg), "Only numbers allowed", "");
    test.step("*** Only numbers allowed error message is displayed ***", async ()=>{});
  });
});
