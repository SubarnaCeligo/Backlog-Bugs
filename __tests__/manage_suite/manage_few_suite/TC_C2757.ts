import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_few.json";

test.describe(`C2757 Verify the production shared tiles are not shown in the sandbox account`, () => {
  test(`@Env-All @Zephyr-IO-T6939 C2757 Verify the production shared tiles are not shown in the sandbox account`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON)
    await page.getByText("Loading...").waitFor({ state: "hidden", timeout:360000 });
    await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C68492_Flow_DND');
    await io.homePage.loadingTime();
    const bool = await io.homePage.isVisible("text='TC_C68492_Flow_DND'")
    await io.assert.expectToBeFalse(bool, "Flows are present in Sandbox")
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime();
  });
});
