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

    await page.waitForSelector('button > span:text("string")');
    await page.click('button > span:text("string")');
    const cl1 = await page.$$("li > div> span");
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

    await page.waitForSelector('button > span:text("string")');
    await page.click('button > span:text("string")');
    const cl2 = await page.$$("li > div> span");
    await cl2[cl2.length - 4].click();

    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.ADD_FIELD_MAPPING
    );

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
    await page.keyboard.type("$[*].ID"); 

    await io.homePage.loadingTime();

    await page.waitForSelector('button > span:text("string")');
    await page.click('button > span:text("string")');
    const cl3 = await page.$$("li > div> span");
    await cl3[cl3.length - 3].click();

    await page.pause();

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.flowBuilder.addStep("Clicked on 'Preview'");

    await io.homePage.loadingTime();
    let text = (
      await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.CODE_PANEL)
    ).toString();

    let result = false;
    if (
      text.includes(
        `Message:·company:·You·can't·map·stringarray·(source)·to·boolean·(destination)`
      )
    ) {
      result = true;
    }
    await expect(result).toBeTruthy();
  });
});
