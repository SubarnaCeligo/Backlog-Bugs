import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51797.json";
import { ElementHandle } from "playwright/test";

test.describe("TC_C51797", () => {
  test("@Env-All @zephyr-IO-T22444 TC_C51797 | Verify If the below Source Data data types are mapped to the '[object]' destination data type then below validations should be shown", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on created import ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      await selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();

    let filepath = TC.pageGenerators[0].qa__export.qa__path;
    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets${filepath}`);
    await io.homePage.loadingTime();

    test.step("*** Save and close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on destination field***", async ()=>{});
    let mapperDestinationField = await page.locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER);
    await mapperDestinationField.focus();
    await mapperDestinationField.dblclick();
    await page.keyboard.type("data");
    await test.step("*** Entered the text in the destination field***", async ()=>{});

    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button"
    );
    let option = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      "[object]"
    )) as any;
    await option.click();

    await io.homePage.click(selectors.basePagePO.COLLAPSE_ALL);

    test.step("*** Clicking on source field***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input");
    const sourceOption = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " span",
      "$"
    ));
    await (sourceOption as ElementHandle<any>).click();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS,
      0
    );

    test.step("*** Clicking on second destination field***", async ()=>{});
    const destForNumArray = (await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    ))[1];

    await destForNumArray.focus();
    await destForNumArray.dblclick();
    await page.keyboard.type("new_variant");

    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button", 1);
    let option1 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      "[object]"
    )) as any;
    await option1.click();
    await io.homePage.click(selectors.basePagePO.COLLAPSE_ALL);

    const srcNumArray = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS))[1];
    await srcNumArray.click();
    const sourceOption1 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " span",
      "new_variant"
    ));
    await (sourceOption1 as ElementHandle<any>).click();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS,
      1
    );

    const destForBoolArray = (await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    ))[2];
    await destForBoolArray.focus();
    await destForBoolArray.dblclick();
    await page.keyboard.type("taxable");

    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button", 2);
    let option2 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      "[object]"
    )) as any;
    await option2.click();
    await io.homePage.click(selectors.basePagePO.COLLAPSE_ALL);

    const srcBoolArray = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS))[2];
    await srcBoolArray.click();
    const sourceOption2 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " span",
      "taxable"
    )) as ElementHandle<any>;
    await sourceOption2.scrollIntoViewIfNeeded();
    await sourceOption2.click();

    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS,
      2
    );

    const destForStringArray = (await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    ))[3];
    await destForStringArray.focus();
    await destForStringArray.dblclick();
    await page.keyboard.type("values");

    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button", 3);
    let option3 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      "[object]"
    )) as any;
    await option3.click();
    await io.homePage.click(selectors.basePagePO.COLLAPSE_ALL);

    const srcStringArray = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS))[3];
    await srcStringArray.click();
    const sourceOption3 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " span",
      "values"
    )) as ElementHandle<any>;
    await sourceOption3.scrollIntoViewIfNeeded();
    await sourceOption3.click();

    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS,
      3
    );

    const destForobjectArray = (await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    ))[4];
    await destForobjectArray.focus();
    await destForobjectArray.dblclick();
    await page.keyboard.type("images");

    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button", 4);
    let option4 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      "[object]"
    )) as any;
    await option4.click();
    await io.homePage.click(selectors.basePagePO.COLLAPSE_ALL);

    const srcObjectArray = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS))[4];
    await srcObjectArray.click();
    const sourceOption4 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " span",
      "images"
    )) as ElementHandle<any>;
    await sourceOption4.scrollIntoViewIfNeeded();
    await sourceOption4.click();

    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS,
      4
    );

    const destForBooleanArray = (await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    ))[5];
    await destForBooleanArray.focus();
    await destForBooleanArray.dblclick();
    await page.keyboard.type("requires_shipping");

    await io.homePage.clickButtonByIndex(selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " button", 5);
    let option5 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      "[object]"
    )) as any;
    await option5.click();
    await io.homePage.click(selectors.basePagePO.COLLAPSE_ALL);

    const srcBooleanArray = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS))[5];
    await srcBooleanArray.click();
    const sourceOption5 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.CHILDTREELIST + " span",
      "requires_shipping"
    )) as ElementHandle<any>;
    await sourceOption5.scrollIntoViewIfNeeded();
    await sourceOption5.click();

    var dataType6 = selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " button";
    await io.homePage.clickButtonByIndex(dataType6, 5);
    let option6 = (await io.homePage.getElementOrIndex(
      selectors.mappings.MAPPER2DOT0PO.DATATYPES,
      "[boolean]"
    )) as any;
    await option6.click();

    await io.homePage.click(
      selectors.flowBuilderPagePO.AUTO_PREVIEW
    );
    await io.homePage.loadingTime();

    var res = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.PREVIEWERR + " .ace_scroller"
    );

    await io.assert.expectToContainValue("Mapper 2.0: new_variant: You can't map [number] (source) to [object] (destination)", res, "");
    await test.step("*** Mapper 2.0: new_variant: You can't map [number] (source) to [object] (destination) ***", async ()=>{});

    await io.assert.expectToContainValue("Mapper 2.0: taxable: You can't map boolean (source) to [object] (destination)", res, "");
    await test.step("*** Mapper 2.0: taxable: You can't map boolean (source) to [object] (destination) ***", async ()=>{});

    await io.assert.expectToContainValue("Mapper 2.0: values: You can't map [string] (source) to [object] (destination)", res, "");
    await test.step("*** Mapper 2.0: values: You can't map [string] (source) to [object] (destination) ***", async ()=>{});

    await io.assert.expectToContainValue("Mapper 2.0: requires_shipping: You can't map [boolean] (source) to [object] (destination)", res, "");
    await test.step("*** Mapper 2.0: requires_shipping: You can't map [boolean] (source) to [object] (destination) ***", async ()=>{});
  });
});
