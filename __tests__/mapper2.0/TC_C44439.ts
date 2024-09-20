import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C44424_HTTP_To_HTTP.json";

test.describe("TC_C44439 Verify that when user deletes the saved mapper 2.0 mappings, the info banner should disappear", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T2434  Verify that when user deletes the saved mapper 2.0 mappings, the info banner should disappear", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(TC, "FLOWS");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.flowBuilder.loadingTime();

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    await io.flowBuilder.loadingTime();
    let alertText =
      "Your 1.0 mappings are for reference only and will be ignored. Delete all 2.0 mappings to use 1.0 mappings instead.";

    await io.assert.verifyElementDisplayedByText(
      alertText,
      "alert text not dispayed"
    );
    test.step("Alert Banner Shown First When It's Mapper2", async () => {});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
    await io.flowBuilder.loadingTime();
    const deleteButtons = await page.$$(
      selectors.mappings.MAPPER2DOT0PO.DELETEBUTTONS
    );
    const addButtons = await page.$$(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);

    await addButtons[0].hover();
    await deleteButtons[0].hover();
    await deleteButtons[0].click();

    await io.flowBuilder.loadingTime();

    var deleteconfirm = await page.locator(selectors.basePagePO.DELETE_BUTTON);
    await deleteconfirm.click();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("Deleted 2.0 Mappings", async () => {});

    await io.flowBuilder.loadingTime();

    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR
    );
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      1
    );

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);
    await io.flowBuilder.loadingTime();

    const alertTextData = await page.locator(`text=${alertText}`).isVisible();
    expect(alertTextData).toBe(false);

    await test.step("** Verified When User Deleted 2.0 Mappings And Moved To Mapper 1.0 , Info Banner Is Not Shown**", async () => {});
  });
});
