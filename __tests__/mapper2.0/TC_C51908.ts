import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C51908.json";
  
test.describe("TC_C51908", () => {
  test("@Env-All @Zephyr-IO-T22526 TC_C51908", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    test.step("*** Click on the created export***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles("testData/assets/" + FTP.pageGenerators[0].qa__export.qa__path);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.importPagePO.CLICKPREVIEW
    );
    test.step("*** Save and close the export***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Click on the import mappings***", async ()=>{});

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on settings icon ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      1
    );
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLICKFORFIELDMAPPINGTYPE);

    await test.step("*** Clicking on field mapping type as handlebar ***", async ()=>{});
    await page.locator(selectors.mappings.MAPPER2DOT0PO.SELECTFORFIELDMAPPINGTYPE).nth(4).click();
    test.step("*** Clicking on handlebar button ***", async ()=>{});
    // var handlebar = selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON
    await io.homePage.clickByIndex(selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON, 2);
    await io.homePage.loadingTime();

    await test.step("*** Entering the handlebar expression in the rule ***", async ()=>{});
    await page.locator(
      selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION + " textarea"
    ).fill("{{record.fName}}");
    test.step("*** Clicking on preview button ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.PREVIEW).nth(1).click();
    await io.homePage.loadingTime();

    await test.step("*** Getting the result from the handlebar preview panel ***", async ()=>{});
    var result = await page.$$(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    var resultText = await result[1].textContent();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.assert.expectToContainValue("scott", String(resultText), "");
    await test.step("*** Validated the result when we pass valid handlebar expression ***", async ()=>{});

    await test.step("*** Entering the invalid handlebar expression in the rule ***", async ()=>{});
    await page.locator(
      selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION + " textarea"
    ).fill("{{record.");
    await page.locator(selectors.flowBuilderPagePO.PREVIEW).nth(1).click();
    await io.homePage.loadingTime();

    await test.step("*** Validate the error when we pass invalid handlebar expression ***", async ()=>{});
    var errorresult = await page.locator(
      selectors.flowBuilderPagePO.CUSTOM_ERROR
    ).first();
    var errorresultText = await errorresult.textContent();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.assert.expectToContainValue('Message:·Parse·error·on·line·1:', errorresultText, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
