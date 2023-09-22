import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63061 Verify fields are autopopulating once user switch from Simple to HTTP View in import/export/lookup`, () => {
  test(`C63061 Verify fields are autopopulating once user switch from Simple to HTTP View in import/export/lookup`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.flowBuilder.clickByText("Narvar_DND");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);

    const name = await page
      .locator(selectors.basePagePO.NAME)
      .evaluate((el: HTMLInputElement) => el.value);
    const connection = await page
      .locator(`${selectors.basePagePO.CONNECTION} input`)
      .evaluate((el: HTMLInputElement) => el.value);

    await io.assert.expectToBeValue(
      name,
      "Narvar Import",
      "Name value is not 'Narvar Import'"
    );
    await io.assert.expectToBeValue(
      connection,
      "Narvar",
      "Connection value is not Narvar"
    );
  });
});
