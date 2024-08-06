import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T34260 from "@testData/Mapper2.0/T34260.json";

test.describe("T34260 Verify for DB adaptors ,mapper 2.0 is unable to detect rows when user has array based input data", () => {
  test("@Env-All @Zephyr-IO-T34260 @Priority-P2 T34260 Verify for DB adaptors ,mapper 2.0 is unable to detect rows when user has array based input data", async ({
    io,
    page
  }) => {
    let flowId = await io.createResourceFromAPI(T34260, "FLOWS");

    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(
      selectors.mappings.MAPPER2DOT0PO.CHANGEOUTPUTFORMAT
    );
    await io.flowBuilder.loadingTime();

    const text = await io.flowBuilder.getText(
      selectors.mappings.MAPPER2DOT0PO.OUTPUTFORMATDROPDOWN
    );

    const TextValue = text[1];

    await io.assert.expectToBeValue(
      "Create destination rows [ ] from source rows [ ]",
      TextValue,
      "incorrect value Create destination rows[] from source rows []"
    );
  });
});
