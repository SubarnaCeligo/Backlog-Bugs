import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/C44396.json";

test.describe(`C44396 Verify the type of field mapping should be displayed for the row which are configured with lookup , hardcode , handlebars`, () => {
  test(`@Env-All @Zephyr-IO-T2414 C44396 Verify the type of field mapping should be displayed for the row which are configured with lookup , hardcode , handlebars`, async ({
    io,
    page
  }) => {
    try {
      await io.homePage.navigateTo(process.env.IO_Integration_URL);
      const testCase = page.getByText("C44396").first();
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
    } catch {
      await io.createResourceFromAPI(testData, "FLOWS");
    }
    await page.getByLabel("Define options").nth(1).click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const labels = [
      "Hard-coded",
      "Handlebars expression",
      "Dynamic lookup",
      "Static lookup"
    ];
    for (let i = 0; i < labels.length; i++) {
      const destinationFields = page.locator(
        selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
      );
      const sourceFields = page.locator(
        selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS
      );
      const addButtons = page.locator(
        selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS
      );
      const settingsButtons = page.locator(
        selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
      );
      await sourceFields.nth(i).waitFor({ state: "visible" });
      switch (i) {
        case 0: {
          await sourceFields.nth(i).click();
          let $sourceField = await sourceFields.nth(i).elementHandle();
          let $sourceTextarea = await $sourceField.$("textarea");
          await $sourceTextarea.fill(`"hello"`);
          await addButtons.nth(i).click();
          break;
        }
        case 1:
          await sourceFields.nth(i).click();
          let $sourceField = await sourceFields.nth(i).elementHandle();
          let $sourceTextarea = await $sourceField.$("textarea");
          await $sourceTextarea.fill("{{hello}}");
          await addButtons.nth(i).click();
          break;
        case 2: {
          await destinationFields.nth(i).click();
          let $destinationField = await destinationFields.nth(i).elementHandle();
          let $destinationTextarea = await $destinationField.$("textarea");
          await $destinationTextarea.fill("hello");
          await sourceFields.nth(i).click();
          await settingsButtons.nth(i).click();
          await page.getByText("Standard").click();
          await page.getByText("Lookup", { exact: true }).click();
          await page.getByText("Dynamic", { exact: true }).click();
          await page.getByText("Please select", { exact: true }).click();
          await page.getByText("GET", { exact: true }).click();
          await page.getByPlaceholder("Resource identifier path").fill("hello");
          await page
            .getByPlaceholder("Alphanumeric characters only")
            .fill("hello");
          await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).nth(1).click();
          break;
        }
        case 3:
          await destinationFields.nth(i).click();
          let $destinationField = await destinationFields.nth(i).elementHandle();
          let $destinationTextarea = await $destinationField.$("textarea");
          await $destinationTextarea.fill("hello");
          await sourceFields.nth(i).click();
          await settingsButtons.nth(i).click();
          await page.getByText("Standard").click();
          await page.getByText("Lookup", { exact: true }).click();
          await page.getByText("Static", { exact: true }).click();
          await page
            .locator(
              selectors.mappings.MAPPER2DOT0PO.LOOKUP_STATIC_FIELDVALUE_TEXTAREAS
            )
            .first()
            .fill("test");
          await page
            .locator(
              selectors.mappings.MAPPER2DOT0PO.LOOKUP_STATIC_FIELDVALUE_TEXTAREAS
            )
            .nth(2)
            .fill("123");
          await page
            .getByPlaceholder("Alphanumeric characters only")
            .first()
            .fill("test");
          await page.locator(selectors.basePagePO.SAVE_AND_CLOSE).nth(1).click();
          break;
      }
      await expect(page.getByLabel(labels[i], { exact: true })).toBeVisible({
        timeout: 10000
      });
      await addButtons.nth(i).click();
    }
  });
});