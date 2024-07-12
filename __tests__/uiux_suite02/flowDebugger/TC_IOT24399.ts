import { test ,expect} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45341 from "@testData/Flows/C45341.json";

test.describe("TC_IOT24399 Verify ’Populate with canonical stub' link is displaying in blue color after clicking", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T24399 C103668 Verify ’Populate with canonical stub' link is displaying in blue color after clicking", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C45341, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MOCK_OUTPUT);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);

    const element = await page.locator(selectors.flowBuilderPagePO.POPULATE_WITH_CANONICAL_STUB);

    const color = await element.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });

      expect(color).toBe('rgb(29, 118, 199)');

  });
});
