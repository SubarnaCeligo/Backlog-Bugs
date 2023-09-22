import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61349 Verify url displayed upon hovering is same as the page is redirected to upon clicking`, () => {
  test(`C61349 Verify url displayed upon hovering is same as the page is redirected to upon clicking`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.flowBuilder.clickByText("Narvar_DND");
    const url = new URL(page.url());
    const path = url.pathname;
    await page
      .locator("div")
      .filter({ hasText: /^Narvar_DNDTEST MODEBeta$/ })
      .locator(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON)
      .click();
    await io.flowBuilder.clickByText("Clone flow");
    const breadcrumbPath = await page
      .locator(selectors.basePagePO.BREADCRUMB_LIST)
      .filter({ hasText: "Narvar_DND" })
      .locator("a")
      .getAttribute("href");
    await io.assert.expectToBeValue(
      breadcrumbPath,
      path,
      "Breadcrumb url is not as expected"
    );
  });
});
