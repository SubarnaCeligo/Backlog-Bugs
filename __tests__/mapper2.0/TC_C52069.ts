import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52069.json";

test.describe("TC_C52069 Verify apply and cancel button in filter view", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T22534 Verify apply and cancel button in filter view", async ({ io, page }) => {

    flowId = await io.createResourceFromAPI(FTP, "FLOWS");
    await io.flowBuilder.loadingTime();

    test.step("*** Clicking on import mappings ***", async () => {});
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on filter ***", async () => {});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.FILTER_OPTION);

    await io.assert.verifyElementDisplayedByText(
      "Mapped fields",
      "Mapped fields not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "Required fields",
      "Required fields not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "All fields",
      "All fields not displayed"
    );
    const isApplyButtonVisible = await page
      .getByRole("button", { name: "Apply" })
      .isVisible();
    await expect(isApplyButtonVisible).toBeTruthy();
    await page.getByRole("button", { name: "Cancel" }).click();
    const text = await io.homePage.isVisible(`text= "Mapped fields"`);
    await expect(text).toBe(false);

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
