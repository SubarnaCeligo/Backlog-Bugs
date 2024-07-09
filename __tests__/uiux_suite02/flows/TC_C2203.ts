import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Flows/C2203.json";

test.describe(`C2203 Verify existing stacks are shown for flow builder exports as expected.`, () => {
  test(`@Env-All C2203 Verify existing stacks are shown for flow builder exports as expected.`, async ({
    io,
    page
  }) => {
    try {
      await io.homePage.navigateTo(process.env.IO_Integration_URL);
      const testCase = page.getByText("C2203").first();
      await testCase.waitFor({ state: "visible", timeout: 5000 });
      await testCase.click();
      await io.homePage.addStep("Clicked on 'C2203' test case");
    } catch {
      await io.createResourceFromAPI(testData, "FLOWS");
      await io.homePage.addStep("Created new flow");
    }
    await page.getByLabel("Define options").first().click();
    await io.flowBuilder.addStep("Clicked on plus icon in export");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.HOOK_TYPE_STACK_OPTION
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.STACKS_DROPDOWN);
    await io.flowBuilder.delay(1000);
    const stackList = await page.$$("[role=menuitem]");
    const stacks = await io.api.getCall(`v1/stacks`);
    expect(stackList.length - 1).toEqual(stacks.length);
    await io.flowBuilder.addStep("Verified existing stacks are shown");
  });
});
