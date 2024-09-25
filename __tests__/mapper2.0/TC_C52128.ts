import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/Mapper2.0/TC_C52128.json";

test.describe("TC_C52128 Verify user has an option to select the source field data type when user types the source record field and the default data type should be set to String", () => {
  let flowID;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowID);
  });

  test("@Env-All @Zephyr-IO-T22491 Verify user has an option to select the source field data type when user types the source record field and the default data type should be set to String", async ({ io, page }) => {
    flowID = await io.createResourceFromAPI(FTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const isDefaultStringVisible = page
    .locator("span")
    .filter({ hasText: /^string$/ }).first()
    .isVisible();
    expect(isDefaultStringVisible).toBeTruthy();

    const optionSelector = (
      await page.$$(`[aria-label="Data type: string - Click to change"]`)
    )[0];
    await optionSelector.click();

    const string = page
      .locator("li")
      .filter({ hasText: /^string$/ })
      .isVisible();
    const number = page
      .locator("li")
      .filter({ hasText: /^number$/ })
      .isVisible();
    const boolean = page
      .locator("li")
      .filter({ hasText: /^boolean$/ })
      .isVisible();
    const object = page
      .locator("li")
      .filter({ hasText: /^object$/ })
      .isVisible();
    const stringArray = page
      .locator("li")
      .filter({ hasText: /^\[string\]$/ })
      .isVisible();
    const numberArray = page
      .locator("li")
      .filter({ hasText: /^\[number\]$/ })
      .isVisible();
    const booleanArray = page
      .locator("li")
      .filter({ hasText: /^\[boolean\]$/ })
      .isVisible();
    const objectArray = page
      .locator("li")
      .filter({ hasText: /^\[object\]$/ })
      .isVisible();
    expect(string).toBeTruthy();
    expect(number).toBeTruthy();
    expect(boolean).toBeTruthy();
    expect(object).toBeTruthy();
    expect(stringArray).toBeTruthy();
    expect(numberArray).toBeTruthy();
    expect(booleanArray).toBeTruthy();
    expect(objectArray).toBeTruthy();
  });
});
