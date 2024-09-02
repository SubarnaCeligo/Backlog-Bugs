import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C63061 Verify fields are autopopulating once user switch from Simple to HTTP View in import/export/lookup`, () => {
  test(`@Env-QA @Env-STAGING @Zephyr-IO-T21822 C63061 Verify fields are autopopulating once user switch from Simple to HTTP View in import/export/lookup`, async ({
    page,
    io
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);

    const name = await page
      .locator(selectors.basePagePO.NAME)
      .evaluate((el: HTMLInputElement) => el.value);
    const connection = await page
      .locator(`${selectors.basePagePO.CONNECTION} input`)
      .evaluate((el: HTMLInputElement) => el.value);

    await io.assert.expectNotToBeValue("", name, "Name value is empty");
    await io.assert.expectNotToBeValue(
      "",
      connection,
      "Connection value is empty"
    );
  });
});
