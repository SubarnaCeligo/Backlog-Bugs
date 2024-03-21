import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/IOT130.json";

test.describe(`IOT1306 - To verify metadata is getting populated when record type is selected as Subscription change order in Netsuite Import flow UI_Backlog`, () => {
  test(`IOT1306 - To verify metadata is getting populated when record type is selected as Subscription change order in Netsuite Import flow UI_Backlog`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.click(selectors.mappings.UPDATE);
    await io.importsPage.click(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP);
    await io.flowBuilder.click(selectors.flowBranchingPO.GROUP_RULE);

    const options = await page.$$(`${selectors.flowBuilderPagePO.FILTER_CONTAINER} option`);
    const length = await options?.length || 0;
    await expect(length).not.toBe(0);

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.FILTER_CONTAINER,"Billing Account")
  });
});