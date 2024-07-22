import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/Exports/T11646.json";

test.describe("TC_T11646 Verify 'Sorting and grouping records' should be an optional section and this section should be collapsed by default.", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T11646 @Env-All @Epic-IO-86262 @Priority-P2 - Verify 'Sorting and grouping records' should be an optional section and this section should be collapsed by default.", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);

    // Checking for FTP export
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SORTANDGROUP);

    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.SORTANDGROUP,
      "aria-expanded",
      "false"
    );
    await io.flowBuilder.addStep("Verified for FTP Export, group and Sort records in collapsed");

    // click on close
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    // remove the First page generator
    await io.homePage.hover(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR, 0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.REMOVE_CONFIRM);

    // Checking for S3 export
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SORTANDGROUP);
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.SORTANDGROUP,
      "aria-expanded",
      "false"
    );
    await io.flowBuilder.addStep("Verified for S3 Export, group and Sort records in collapsed");

    // click on close
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE);

    // Checking for Googledrive export
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SORTANDGROUP);
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBuilderPagePO.SORTANDGROUP,
      "aria-expanded",
      "false"
    );
    await io.flowBuilder.addStep("Verified for Googledrive Export, group and Sort records in collapsed");
  });
});
