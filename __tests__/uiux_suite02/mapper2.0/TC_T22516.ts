import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C46907.json";

test.describe(`C52210 Verify the UI error pop up when there are multiple errors for invalid datatypes`, () => {
  test(`@Zephyr-IO-T22516 @Env-All C52210 Verify the UI error pop up when there are multiple errors for invalid datatypes`, async ({
    io,
    page
  }) => {
    const id = await io.createResourceFromAPI(testData, "FLOWS");
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );

    await page.keyboard.type("company");

    await io.flowBuilder.click(
        selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS_DATA_TYPE
    );

    const close1 = await page.$$(selectors.mappings.MAPPER2DOT0PO.DATATYPESLISTITEM);
    await close1[2].click();


    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    await page.keyboard.type("$[*].id");

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING);

    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.flowBuilder.addStep("Clicked on 'Preview'");

    await io.homePage.loadingTime();
    let text = (await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.CODE_PANEL)).toString();

    let result = false;
    if(text.includes(`Message:·company:·You·can't·map·stringarray·(source)·to·boolean·(destination)`)){
        result = true;
    }
    await expect(result).toBeTruthy();
  });
});
