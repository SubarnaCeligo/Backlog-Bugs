import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/IOT130.json";

test.describe(`IOT1306 - To verify metadata is getting populated when record type is selected as Subscription change order in Netsuite Import flow UI_Backlog`, () => {
  test(`@Env-All @Zephyr-IO-T1306 IOT1306 - To verify metadata is getting populated when record type is selected as Subscription change order in Netsuite Import flow UI_Backlog`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.connectionPage.addStep("Flow created");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.connectionPage.addStep("Clicked on Import");
    await io.flowBuilder.click(selectors.mappings.UPDATE);
    await io.connectionPage.addStep("Clicked on Update");
    await io.importsPage.click(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP);
    await io.connectionPage.addStep("Clicked on Netsuite Internal Lookup");
    await io.flowBuilder.click(selectors.flowBranchingPO.GROUP_RULE);

    const options = await page.$$(`${selectors.flowBuilderPagePO.FILTER_CONTAINER} option`);
    const length = await options?.length || 0;
    await expect(length).not.toBe(0);

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.FILTER_CONTAINER,"Billing Account")
    await io.connectionPage.addStep("Verified metadata is getting populated when record type is selected as Subscription");
  });
});