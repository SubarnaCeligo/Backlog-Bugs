import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27423 Verify the endpoint under subscription page when it dont exceed the limit.", () => {
  test("C27423 Verify the endpoint under subscription page when it dont exceed the limit.", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();
    const progressBars = await page
      .locator(selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR)
      .all();
    progressBars.forEach(async row => {
      const items = await row.locator("span").all();
      items.forEach(async item => {
        const color = await item.evaluate(
          el => getComputedStyle(el).backgroundColor
        );
        if (color) {
          await io.assert.expectToBeValue(
            color,
            "rgb(29, 118, 199)",
            "The status is not correctly colored"
          );
        }
      });
    });
  });
});
