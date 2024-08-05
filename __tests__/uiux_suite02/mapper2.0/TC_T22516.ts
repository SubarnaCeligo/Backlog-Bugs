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
    const DT1 = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.DATATYPESLISTITEM
    );
    await DT1[5].click();

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS);
    await page.keyboard.type("$[*].id");

    await page.waitForSelector(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE);
    await page.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE);
    const cl1 = await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE_OPTION);
    await cl1[cl1.length - 6].click();

    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING
    );

    await page
      .locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER)
      .nth(1)
      .fill("test");
    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS_DATA_TYPE
    );
    const DT2 = await page.$$(selectors.mappings.MAPPER2DOT0PO.DATATYPESLISTITEM);
    await DT2[5].click();

    await page
      .locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS)
      .nth(1)
      .click();
    await page.keyboard.type("$[*].recordType");

    await io.homePage.loadingTime();

    await page.waitForSelector(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE);
    await page.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE);
    const cl2 = await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE_OPTION);
    await cl2[cl2.length - 2].click();

    await page
    .locator(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING
    ).nth(1).click();

    await page
      .locator(selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER)
      .nth(2)
      .fill("name");
    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS_DATA_TYPE
    );
    const DT3 = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.DATATYPESLISTITEM
    );
    await DT3[5].click();

    await page
      .locator(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS)
      .nth(2)
      .click();
    await page.keyboard.type("$[*].Email"); 

    await page.waitForSelector(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE);
    await page.click(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE);
    const cl3 = await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELD_DATA_TYPE_OPTION);
    await cl3[cl3.length - 1].click();

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.flowBuilder.addStep("Clicked on 'Preview'");

    await io.homePage.loadingTime();
    let text = (
      await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.CODE_PANEL)
    ).toString();

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.flowBuilder.addStep("Clicked on 'Preview'");

    let result = false;
    if (
      text.includes(
        `Mapper 2.0: company: You can't map boolean (source) to [number] (destination)
         Mapper 2.0: test: You can't map [boolean] (source) to [number] (destination)
         Mapper 2.0: name: You can't map [object] (source) to [number] (destination)`
      )
    ) {
      result = true;
    }

    await expect(result).toBeTruthy();
  });
});
