import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C61349 Verify url displayed upon hovering is same as the page is redirected to upon clicking`, () => {
  test(`@Env-All @Zephyr-IO-T5361 C61349 Verify url displayed upon hovering is same as the page is redirected to upon clicking`, async ({
    page,
    io
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    const url = new URL(page.url());
    const path = url.pathname;
    await page
      .locator(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON)
      .first()
      .click();
    await io.flowBuilder.clickByText("Clone flow");
    const breadcrumbPath = await page
      .locator(selectors.basePagePO.BREADCRUMB_LIST)
      .filter({ hasText: "Narvar_Flow" })
      .locator("a")
      .getAttribute("href");
    await io.assert.expectToBeValue(
      breadcrumbPath,
      path,
      "Breadcrumb url is not as expected"
    );
  });
});
