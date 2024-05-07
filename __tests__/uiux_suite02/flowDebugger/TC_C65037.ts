import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C65037 Verify Run history tab in the console is grayed out while in test mode i.e. when a flow is switched off.", () => {
  test("@Env-All @Zephyr-IO-T24941 C65037 Verify Run history tab in the console is grayed out while in test mode i.e. when a flow is switched off.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION, "TC_C65037_Flow_DND")
    await io.flowBuilder.clickByText("TC_C65037_Flow_DND");
    await io.flowBuilder.loadingTime();
    await io.assert.checkElementState(
      selectors.flowBuilderPagePO.RUN_HISTORY,
      "isDisabled"
    );
  });
});
