import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C2203 Verify existing stacks are shown for flow builder exports as expected.`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
  });

  test(`C2203 Verify existing stacks are shown for flow builder exports as expected.`, async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Standalone flows");
    await io.flowBuilder.clickByText("test http flow");
    await page.getByLabel("Define options").first().click();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.HOOK_TYPE_SCRIPT_OPTION
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.STACKS_DROPDOWN);
    const stackList = await page.$$("[role=menuitem]");
    const stacks = await io.api.getCall(`v1/stacks`);
    expect(stackList.length - 1).toEqual(stacks.length);
  });
});
