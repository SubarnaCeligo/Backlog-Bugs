
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C44535 from "@testData/Mapper2.0/TC_C44535.json";
import { allure } from "allure-playwright";
test.describe(" TC_C44535 Verify user is able to preview the correct data in Output window test.afterEach providing AFE expression as per the function used", () => {
  
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T2381 TC_C44535", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C44535, 'FLOWS');

    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Save the flow ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on mapper2dot0 button ***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON
    );
    test.step("*** Clicking on destination field***", async ()=>{});
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );

    await test.step("*** Entered the text in the destination field***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS,
      "id"
    );

    test.step("*** Clicking on source field***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);

    test.step("*** Clicking on settings button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on datatype list ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLICKFORDATATYPE);

    test.step("*** Clicking on number data type ***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.SELECTFORDATATYPE,
      2
    );

    test.step("*** Clicking on field mapping list***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLICKFORFIELDMAPPINGTYPE)

    await test.step("*** Clicking on field mapping type as handlebar ***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.SELECTFORFIELDMAPPINGTYPE,
      4
    );

    test.step("*** Clicking on handlebar button ***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.HANDLEBAREXPRESSIONBUTTON,
      2
    );

    test.step("*** Clicking on rule ***", async ()=>{});
    var sourcefield = await page.locator(
      selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION
    );
    var sourcefieldtext = await sourcefield.textContent();
    await sourcefield.dblclick();
    await io.homePage.clearTextValue(sourcefieldtext);

    await test.step("*** Entering the handlebar expression in the rule ***", async ()=>{});
    var handlebar1 = await page.locator(
      selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION + " textarea"
    );
    await handlebar1.fill("{{toFixed 123.456789 0}}");
    await io.homePage.loadingTime();
    test.step("*** Clicking on preview button ***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.PREVIEW,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await test.step("*** Getting the result from the handlebar preview panel ***", async ()=>{});
    var result = await page.$$(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    var resultText = await result[1].textContent();

    await io.homePage.loadingTime();
    await io.assert.expectToContainValue("123", String(resultText), "");
  });
});
