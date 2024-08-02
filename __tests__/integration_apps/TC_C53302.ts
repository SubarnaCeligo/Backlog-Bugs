import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53302 Verify the mappings in IA when the import step has mappings created in 2.0 ", () => {
  test("@Zephyr-IO-T12544 @Env-All C53302 Verify the mappings in IA when the import step has mappings created in 2.0 ", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Mapper2.0 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByTextByIndex("Mapper2 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();
    const mqpper2field = await io.flowBuilder.isVisible('text="Refresh fields"');
    await io.assert.expectToBeValue(
      mqpper2field.toString(),
      "true",
      "Refresh fields not present in IA"
    );
    const mqpper2button = await io.flowBuilder.isVisible('text="Mapper1.0"');
    await io.assert.expectToBeValue(
      mqpper2button.toString(),
      "false",
      "Mapper1.0 present present in IA"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.mappings.MAPPER2DOT0PO.MAPPER2GUIDE,
      "Mapeer2.0 is visible"
    );
  });
});
