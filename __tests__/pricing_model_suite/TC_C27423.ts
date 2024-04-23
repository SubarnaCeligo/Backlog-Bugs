import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27423 Verify the endpoint under subscription page when it dont exceed the limit.", () => {
  test("C27423 @Zephyr-IO-T27423 @Env-All @Priority-P2 Verify the endpoint under subscription page when it dont exceed the limit.", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
    await page.waitForLoadState();

    const bgColorList = await io.homePage.getBackgroundColors(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR
    );
    await io.assert.expectArrayToBeInArray(
      bgColorList,
      [
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)",
        "rgb(29, 118, 199)"
      ],
      "The status is not correctly colored"
    );
  });
});
