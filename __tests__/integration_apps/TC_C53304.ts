import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53304 Verify the mappings in IA when the import step doesn't has mappings created in 2.0 ", () => {
  test("@Env-All @Zephyr-IO-T12543 C53304 Verify the mappings in IA when the import step doesn't has mappings created in 2.0 ", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Mapper2.0 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByTextByIndex("Mapper1 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);

    const mqpper2field = await io.flowBuilder.isVisible('text="Refresh fields"');
    await io.assert.expectToBeValue(
      mqpper2field.toString(),
      "false",
      "Refresh fields not present in IA"
    );
    const mqpper2button = await io.flowBuilder.isVisible('text="Mapper2.0"');
    await io.assert.expectToBeValue(
      mqpper2button.toString(),
      "false",
      "Mapper2.0 fields present in IA"
    );
  });
});
