import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/T22389.json";

test.describe(`T22389 - Validate adding of new rows should be done only if all the source tabs has similar structures UI_Backlog`, () => {
  test(`@Env-All @Zephyr-IO-T22389 - Validate adding of new rows should be done only if all the source tabs has similar structures UI_Backlog`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.connectionPage.addStep("Flow created");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    let destinationFields = page.locator(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS
    );

    await destinationFields.nth(1).click();
    (await (await destinationFields.nth(1).elementHandle()).$("textarea")).fill('child2');
    await io.connectionPage.addStep("Updated destination field value to child2");

    await io.flowBuilder.clickByText("$.mother");
    await io.connectionPage.addStep("Clicked on $.mother");

    destinationFields = page.locator(
      selectors.flowBuilderPagePO.MAPPER2_DESTINATION_FIELD_TEXT
    );

    const child1 = destinationFields.nth(1);
    const child2 = destinationFields.nth(2);

    expect(child1).toHaveAttribute('value', 'child1');
    expect(child2).toHaveAttribute('value', 'child2');
    await io.connectionPage.addStep("Verified adding of new rows for destination fields");
  });
});