import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T9428 Verify the default view in the import mappings for IA's ", () => {
  test("@Zephyr-IO-T9428 @Env-All T9428 Verify the default view in the import mappings for IA's ", async ({
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
    const element = page.locator(selectors.flowBuilderPagePO.MAPPER1TOGGLEBUTTON);
    await expect(element).toBeHidden();

    await io.flowBuilder.addStep("*** Verify the default view in the import mappings 2.0 in IA's ***");
    let mapper2Fields = await io.flowBuilder.isVisible('text="Refresh fields"');
    await io.assert.expectToBeValue(
      mapper2Fields.toString(),
      "true",
      "Refresh fields are not present in IA"
    );
    let mapper2Button = await io.flowBuilder.isVisible('text="Mapper1.0"');
    await io.assert.expectToBeValue(
      mapper2Button.toString(),
      "false",
      "Mapper1.0 is present in IA"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.mappings.MAPPER2DOT0PO.MAPPER2GUIDE,
      "Mapper1.0 is present in IA"
    );

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER, 1);

    page.goBack();

    await io.flowBuilder.addStep("*** Verify the default view in the import mappings 1.0 in IA's ***");

    await io.homePage.clickByTextByIndex("Mapper1 IA", 0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    const element2 = page.locator(selectors.flowBuilderPagePO.MAPPER1TOGGLEBUTTON);
    await expect(element2).toBeHidden();

    mapper2Fields = await io.flowBuilder.isVisible('text="Refresh fields"');
    await io.assert.expectToBeValue(
      mapper2Fields.toString(),
      "false",
      "Mapper 2.0 is present in IA"
    );
    mapper2Button = await io.flowBuilder.isVisible('text="Mapper2.0"');
    await io.assert.expectToBeValue(
      mapper2Button.toString(),
      "false",
      "Mapper 2.0 is present in IA"
    );
  });
});
