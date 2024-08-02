import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T17133 from "@testData/Mapper2.0/T17133.json";

test.describe("C59462 Verify Whenever the input filter is updated, we clear the cached data. Hence if user opens any AFE of that lookup/import say outputFilter for lookup, it fetches again based on the updated input filter.", () => {
  test("@Zephyr-IO-T17133 @Env-All @Priority-P2 C59462 Verify Whenever the input filter is updated, we clear the cached data. Hence if user opens any AFE of that lookup/import say outputFilter for lookup, it fetches again based on the updated input filter.", async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(T17133, "FLOWS");

    await io.flowBuilder.click(selectors.importPagePO.INPUT_FILTER_ICON);

    await io.homePage.loadingTime();

    await io.flowBuilder.click(
      selectors.importPagePO.INPUT_FILTER_PREVIEW_RESULT
    );

    await io.homePage.loadingTime();

    expect(page.getByText("TRUE:")).toBeVisible();

    await io.flowBuilder.click(".rule-value-container > input");
    await page.keyboard.type("transactionss");

    await io.homePage.loadingTime();

    await io.flowBuilder.click(
      selectors.importPagePO.INPUT_FILTER_PREVIEW_RESULT
    );

    await io.homePage.loadingTime();

    expect(page.getByText("FALSE:")).toBeVisible();

    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();

    await page.locator('[data-test="Transfer"]').nth(1).click();

    await io.homePage.loadingTime();

    await io.flowBuilder.clickByIndex('[data-test="ftp.directoryPath"]', 1);

    await io.homePage.loadingTime();

    await io.flowBuilder.click('[data-test="closeRightDrawer"]');

    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

    await io.homePage.loadingTime();

    await io.flowBuilder.click(selectors.importPagePO.INPUT_FILTER_ICON);

    await io.flowBuilder.click(".rule-value-container > input");
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Meta+A");
    await page.keyboard.press("Backspace");
    await page.keyboard.type("transaction");

    await io.homePage.loadingTime();

    await io.flowBuilder.click(
      selectors.importPagePO.INPUT_FILTER_PREVIEW_RESULT
    );

    await io.homePage.loadingTime();

    expect(page.getByText("TRUE:")).toBeVisible();

    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();

    await page.locator('[data-test="Transfer"]').nth(1).click();

    await io.homePage.loadingTime();

    await io.flowBuilder.clickByIndex('[data-test="ftp.directoryPath"]', 1);

    await io.homePage.loadingTime();
  });
});
