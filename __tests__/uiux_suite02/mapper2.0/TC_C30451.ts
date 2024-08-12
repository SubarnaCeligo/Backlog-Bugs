import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Mapper2.0/IOT130.json";

test.describe(`TC_C30451 - Missing fields on Lookup Criteria for Subscription record`, () => {
  test(`@Env-All @Zephyr-IO-T2213 TC_C30451 - Missing fields on Lookup Criteria for Subscription record`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.connectionPage.addStep("Flow created");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.addStep("Clicked on Import");
    await io.flowBuilder.click(selectors.connectionsPagePO.DELETE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.addStep("Clicked on Delete");
    await io.importsPage.click(selectors.basePagePO.NETSUITE_INTERNAL_LOOKUP);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.addStep("Clicked on Netsuite Internal Lookup");
    await io.flowBuilder.click(selectors.flowBranchingPO.GROUP_RULE);
    await io.flowBuilder.loadingTime();
    await io.connectionPage.addStep("Clicked on dropdown for all the subscription record types");

    const options = await page.$$(`${selectors.flowBuilderPagePO.FILTER_CONTAINER} option`);
    const length = options?.length || 0;
    expect(length).not.toBe(0);

    await io.connectionPage.addStep("Verified subscription record types dropwdown has fields");

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.FILTER_CONTAINER,"Advance Renewal Period");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.FILTER_CONTAINER,"Advance Renewal Period Unit");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.FILTER_CONTAINER,"Customer");
    await io.connectionPage.addStep("Verified all the fields of the subscription record type should be shown.");
  });
});