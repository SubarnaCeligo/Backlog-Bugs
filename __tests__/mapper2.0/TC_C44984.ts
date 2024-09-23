import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C44984.json";

test.describe(`TC_C44984 Verify by adding 'empty rows' or a mapping 'without destination record field' in Mapper 2.0 and 1.0`, () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T2442   Verify by adding 'empty rows' or a mapping 'without destination record field' in Mapper 2.0 and 1.0", async ({
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

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();

    let errortext = (await io.homePage.getText("#error > div.ace_scroller > div"))
      .toString()
      .replace(/[·]/g, " ");

    let expectedError =
      "Mapper 2.0: One or more destination field values not entered.¶";
    expect(errortext).toEqual(expectedError);

    const deleteButtons = await page.$$(selectors.mappings.MAPPER2DOT0PO.DELETEBUTTONS);
    const addButtons = await page.$$(selectors.mappings.MAPPER2DOT0PO.ADDBUTTONS);
    for (let i = deleteButtons.length-1; i >= 0; i--) {
      await addButtons[i].hover();
      await deleteButtons[i].hover();
      await deleteButtons[i].click();
    }

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER1DOT0BUTTON);

    await io.flowBuilder.loadingTime();
    const srcExtract = (await page.$$(selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS ))[0];
    await srcExtract.focus();
    await srcExtract.click();
    await page.keyboard.type("given_name");
    await page.keyboard.type("Tab");
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();
    errortext = (await io.homePage.getText("#error > div.ace_scroller > div"))
      .toString()
      .replace(/[·]/g, " ");
    expect(errortext).toEqual(expectedError.replace("2", "1"));
    await test.step("** Verified For Missing Field Error Is Thrown For Mapper 2.0 And Mapper 1.0 **", async () => {});
  });
});
